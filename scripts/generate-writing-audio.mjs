import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import ts from "typescript";

const MODEL_ID = "shawnahmed/Kokoro-82M-v1.0-ONNX-timestamped";
const DTYPE = "q8";
const GENERATOR_VERSION = "kokoro-writing-v2-word-timings";
const VOICES = {
  female: {
    kokoroVoice: "af_heart",
    fileName: "female.mp3",
    timingsFileName: "female.timings.json",
  },
  male: {
    kokoroVoice: "am_michael",
    fileName: "male.mp3",
    timingsFileName: "male.timings.json",
  },
};
const OUTPUT_ROOT = path.resolve("public/audio/writing");
const MANIFEST_PATH = path.join(OUTPUT_ROOT, "manifest.json");

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function readWritingModule() {
  const source = fs.readFileSync(path.resolve("data/writing.ts"), "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const encoded = Buffer.from(output, "utf8").toString("base64");
  return import(`data:text/javascript;base64,${encoded}`);
}

function narrationText(segments) {
  return segments
    .flatMap((segment) => [segment.prefix ?? "", segment.text])
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitLongSegment(segment, maxChars) {
  if (segment.length <= maxChars) return [segment];

  const clauses = segment.split(/(?<=[,;:])\s+/);
  const chunks = [];
  let current = "";

  for (const clause of clauses) {
    if (!clause) continue;
    const candidate = current ? `${current} ${clause}` : clause;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) chunks.push(current);
    current = "";

    if (clause.length <= maxChars) {
      current = clause;
      continue;
    }

    const words = clause.split(/\s+/);
    let wordChunk = "";
    for (const word of words) {
      const wordCandidate = wordChunk ? `${wordChunk} ${word}` : word;
      if (wordCandidate.length <= maxChars) {
        wordChunk = wordCandidate;
      } else {
        if (wordChunk) chunks.push(wordChunk);
        wordChunk = word;
      }
    }
    if (wordChunk) current = wordChunk;
  }

  if (current) chunks.push(current);
  return chunks;
}

function speechChunks(text, maxChars = 360) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks = [];
  let current = "";

  for (const sentence of sentences) {
    if (!sentence.trim()) continue;
    for (const segment of splitLongSegment(sentence.trim(), maxChars)) {
      const candidate = current ? `${current} ${segment}` : segment;
      if (candidate.length <= maxChars) {
        current = candidate;
      } else {
        if (current) chunks.push(current);
        current = segment;
      }
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

function narrationParts(segments) {
  const parts = [];
  for (const segment of segments) {
    if (segment.prefix?.trim()) {
      parts.push({ text: segment.prefix.trim(), words: [] });
    }

    let wordOffset = 0;
    for (const chunk of speechChunks(segment.text)) {
      const words = chunk.match(/\S+/gu) ?? [];
      parts.push({
        text: chunk,
        words: words.map((word, index) => ({
          id: `${segment.id}:${wordOffset + index}`,
          word,
        })),
      });
      wordOffset += words.length;
    }
  }
  return parts;
}

function ensureFfmpeg() {
  for (const binary of ["ffmpeg", "ffprobe"]) {
    try {
      execFileSync(binary, ["-version"], { stdio: "ignore" });
    } catch {
      throw new Error(`${binary} is required to build Writing narration audio.`);
    }
  }
}

function readManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch {
    return {
      version: 2,
      model: MODEL_ID,
      dtype: DTYPE,
      generatorVersion: GENERATOR_VERSION,
      articles: {},
    };
  }
}

function audioDurationSeconds(file) {
  const output = execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      file,
    ],
    { encoding: "utf8" },
  ).trim();
  return Number.parseFloat(output);
}

async function loadKokoro() {
  try {
    const [{ KokoroTTS }, { env }] = await Promise.all([
      import("kokoro-js"),
      import("@huggingface/transformers"),
    ]);
    env.cacheDir = path.resolve(process.env.KOKORO_CACHE_DIR || ".cache/kokoro");
    const tts = await KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: DTYPE,
      device: "cpu",
    });

    const rawModel = tts.model;
    const rawTokenizer = tts.tokenizer;
    let captured = null;

    tts.model = async (...args) => {
      const output = await rawModel(...args);
      captured = {
        predDur: Array.from(output.pred_dur?.data ?? [], Number),
        waveformSamples: output.waveform?.data?.length ?? 0,
        phonemes: captured?.phonemes ?? "",
      };
      return output;
    };

    tts.tokenizer = (...args) => {
      const output = rawTokenizer(...args);
      if (typeof args[0] === "string") {
        captured = {
          predDur: captured?.predDur ?? [],
          waveformSamples: captured?.waveformSamples ?? 0,
          phonemes: args[0],
        };
      }
      return output;
    };

    return {
      tts,
      tokenizer: rawTokenizer,
      consumeTiming() {
        const value = captured;
        captured = null;
        return value;
      },
    };
  } catch (error) {
    console.error(
      "Install generation tooling with: npm install --no-save --package-lock=false kokoro-js@1.2.1 @huggingface/transformers@3.8.1",
    );
    throw error;
  }
}

function tokenizerTokenCount(tokenizer, value) {
  const encoded = tokenizer(value, { truncation: true });
  const length = encoded.input_ids?.dims?.at(-1) ?? 0;
  return Math.max(0, length - 2);
}

function groupDurations(timing, tokenizer, durationSeconds) {
  const predDur = timing?.predDur ?? [];
  const phonemes = timing?.phonemes?.trim() ?? "";
  const groups = phonemes.split(/\s+/u).filter(Boolean);

  if (predDur.length < 3 || groups.length === 0) return null;

  const counts = groups.map((group) =>
    Math.max(1, tokenizerTokenCount(tokenizer, group)),
  );
  const nonSpecialCount = predDur.length - 2;
  const groupedCount = counts.reduce((sum, count) => sum + count, 0);
  const separators = Math.max(0, nonSpecialCount - groupedCount);
  const boundaryCount = Math.max(0, groups.length - 1);
  const separatorBase = boundaryCount
    ? Math.floor(separators / boundaryCount)
    : 0;
  let separatorExtra = boundaryCount ? separators % boundaryCount : 0;

  const totalFrames = predDur.reduce(
    (sum, value) => sum + Number(value || 0),
    0,
  );
  if (!Number.isFinite(totalFrames) || totalFrames <= 0) return null;
  const secondsPerFrame = durationSeconds / totalFrames;

  const cumulative = [0];
  for (const value of predDur) {
    cumulative.push(
      cumulative[cumulative.length - 1] + Number(value || 0),
    );
  }

  let cursor = 1;
  const output = [];
  for (let index = 0; index < groups.length; index += 1) {
    const count = Math.min(
      counts[index],
      Math.max(0, predDur.length - 1 - cursor),
    );
    const startCursor = cursor;
    cursor += count;
    output.push({
      start: cumulative[startCursor] * secondsPerFrame,
      end:
        cumulative[Math.min(cursor, cumulative.length - 1)] *
        secondsPerFrame,
    });

    if (index < groups.length - 1) {
      const separatorCount =
        separatorBase + (separatorExtra > 0 ? 1 : 0);
      if (separatorExtra > 0) separatorExtra -= 1;
      cursor = Math.min(
        predDur.length - 1,
        cursor + separatorCount,
      );
    }
  }

  return output;
}

function estimateExtraSpokenUnits(word) {
  const token = word.replace(
    /^[^\p{L}\p{N}$£]+|[^\p{L}\p{N}%×$£.,:]+$/gu,
    "",
  );
  let extra = 0;
  if (/%/u.test(token)) extra += 1;
  if (/×/u.test(token)) extra += 1;
  if (/^\d*\.\d+%?$/u.test(token)) {
    const fraction = token.replace(/%/g, "").split(".")[1] ?? "";
    extra += 1 + Math.max(1, fraction.length);
  } else if (/^\d{4}s?$/u.test(token)) {
    const year = Number.parseInt(token.slice(0, 4), 10);
    if (year >= 1100 && year % 1000 >= 10) extra += 1;
  } else if (/^\d{1,3}(?:,\d{3})+%?$/u.test(token)) {
    extra += Math.max(1, token.split(",").length - 1);
  }
  if (/^[$£]\d/u.test(token)) extra += token.includes(".") ? 3 : 1;
  if (/^\d{1,2}:\d{2}$/u.test(token)) {
    extra += token.endsWith(":00") ? 1 : 2;
  }
  return extra;
}

function allocateGroupsToWords(words, groupCount) {
  if (words.length === 0) return [];
  if (groupCount < words.length) return null;

  const allocation = Array(words.length).fill(1);
  let remaining = groupCount - words.length;
  const ranked = words
    .map((word, index) => ({
      index,
      score:
        estimateExtraSpokenUnits(word.word) * 100 +
        (/\d|[%×$£]/u.test(word.word) ? 20 : 0) +
        Math.min(word.word.length, 15),
    }))
    .sort(
      (left, right) =>
        right.score - left.score || left.index - right.index,
    );

  let cursor = 0;
  while (remaining > 0) {
    allocation[ranked[cursor % ranked.length].index] += 1;
    remaining -= 1;
    cursor += 1;
  }
  return allocation;
}

function proportionalWordTimings(words, durationSeconds) {
  const weights = words.map(({ word }) =>
    Math.max(
      1,
      word.replace(/[^\p{L}\p{N}]/gu, "").length,
    ),
  );
  const total = weights.reduce((sum, value) => sum + value, 0);
  let cursor = 0;
  return words.map((item, index) => {
    const start = cursor;
    cursor += durationSeconds * (weights[index] / total);
    return {
      id: item.id,
      word: item.word,
      start,
      end: cursor,
    };
  });
}

function buildCueTimings(
  part,
  timing,
  tokenizer,
  durationSeconds,
) {
  if (part.words.length === 0) return [];
  const groups = groupDurations(
    timing,
    tokenizer,
    durationSeconds,
  );
  if (!groups?.length) {
    return proportionalWordTimings(part.words, durationSeconds);
  }

  const allocation = allocateGroupsToWords(
    part.words,
    groups.length,
  );
  if (!allocation) {
    return proportionalWordTimings(part.words, durationSeconds);
  }

  let groupIndex = 0;
  return part.words.map((item, wordIndex) => {
    const count = allocation[wordIndex];
    const selected = groups.slice(
      groupIndex,
      groupIndex + count,
    );
    groupIndex += count;
    if (!selected.length) {
      return {
        id: item.id,
        word: item.word,
        start: 0,
        end: 0,
      };
    }
    return {
      id: item.id,
      word: item.word,
      start: selected[0].start,
      end: selected[selected.length - 1].end,
    };
  });
}

async function generateVoice(
  engine,
  article,
  segments,
  voiceId,
  voiceConfig,
) {
  const articleDir = path.join(OUTPUT_ROOT, article.slug);
  const outputPath = path.join(
    articleDir,
    voiceConfig.fileName,
  );
  const timingsOutputPath = path.join(
    articleDir,
    voiceConfig.timingsFileName,
  );
  fs.mkdirSync(articleDir, { recursive: true });

  const tempDir = fs.mkdtempSync(
    path.join(
      os.tmpdir(),
      `writing-audio-${article.slug}-${voiceId}-`,
    ),
  );

  try {
    const parts = narrationParts(segments);
    const wavFiles = [];
    const cues = [];
    let audioOffset = 0;

    for (let index = 0; index < parts.length; index += 1) {
      const part = parts[index];
      const audio = await engine.tts.generate(part.text, {
        voice: voiceConfig.kokoroVoice,
        speed: 1,
      });
      const timing = engine.consumeTiming();
      if (!timing?.predDur?.length) {
        throw new Error(
          `Timestamped Kokoro returned no pred_dur for ${article.slug} / ${voiceId} / part ${index + 1}.`,
        );
      }

      const wavPath = path.join(
        tempDir,
        `${String(index).padStart(4, "0")}.wav`,
      );
      await audio.save(wavPath);
      wavFiles.push(wavPath);

      const partDuration = audioDurationSeconds(wavPath);
      for (const cue of buildCueTimings(
        part,
        timing,
        engine.tokenizer,
        partDuration,
      )) {
        cues.push({
          ...cue,
          start: Number(
            (cue.start + audioOffset).toFixed(3),
          ),
          end: Number(
            (cue.end + audioOffset).toFixed(3),
          ),
        });
      }
      audioOffset += partDuration;
      process.stdout.write(
        `  ${voiceId}: part ${index + 1}/${parts.length}\r`,
      );
    }
    process.stdout.write("\n");

    const concatFile = path.join(tempDir, "concat.txt");
    fs.writeFileSync(
      concatFile,
      wavFiles
        .map(
          (file) =>
            `file '${file.replaceAll("'", "'\\''")}'`,
        )
        .join("\n"),
    );

    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        concatFile,
        "-ac",
        "1",
        "-ar",
        "24000",
        "-codec:a",
        "libmp3lame",
        "-b:a",
        "64k",
        outputPath,
      ],
      { stdio: "inherit" },
    );

    const finalDuration = audioDurationSeconds(outputPath);
    fs.writeFileSync(
      timingsOutputPath,
      JSON.stringify(
        {
          version: 1,
          model: MODEL_ID,
          voice: voiceId,
          kokoroVoice: voiceConfig.kokoroVoice,
          durationSeconds: Number(finalDuration.toFixed(3)),
          autoScroll: false,
          cues,
        },
        null,
        2,
      ) + "\n",
    );

    return {
      path: `/audio/writing/${article.slug}/${voiceConfig.fileName}`,
      timingsPath: `/audio/writing/${article.slug}/${voiceConfig.timingsFileName}`,
      kokoroVoice: voiceConfig.kokoroVoice,
      durationSeconds: Math.round(finalDuration),
      bytes: fs.statSync(outputPath).size,
      sha256: sha256(fs.readFileSync(outputPath)),
      timingsBytes: fs.statSync(timingsOutputPath).size,
      timingsSha256: sha256(
        fs.readFileSync(timingsOutputPath),
      ),
      cueCount: cues.length,
    };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  ensureFfmpeg();
  fs.mkdirSync(OUTPUT_ROOT, { recursive: true });

  const onlySlug = argumentValue("--slug");
  const onlyVoice = argumentValue("--voice");
  const manifestOnly = process.argv.includes("--manifest-only");

  if (onlyVoice && !VOICES[onlyVoice]) {
    throw new Error(`Unknown narration voice: ${onlyVoice}`);
  }

  const writing = await readWritingModule();
  const allArticles = writing.writingArticles.filter(
    (article) => article.status === "published",
  );
  const articles = onlySlug
    ? allArticles.filter(
        (article) => article.slug === onlySlug,
      )
    : allArticles;

  if (onlySlug && articles.length !== 1) {
    throw new Error(
      `Unknown published Writing slug: ${onlySlug}`,
    );
  }

  const selectedVoices = onlyVoice
    ? Object.entries(VOICES).filter(
        ([voiceId]) => voiceId === onlyVoice,
      )
    : Object.entries(VOICES);

  const manifest = readManifest();
  manifest.version = 2;
  manifest.model = MODEL_ID;
  manifest.dtype = DTYPE;
  manifest.generatorVersion = GENERATOR_VERSION;
  manifest.generatedAt = new Date().toISOString();
  manifest.articles ??= {};

  if (!onlySlug && !onlyVoice && !manifestOnly) {
    const activeSlugs = new Set(
      allArticles.map((article) => article.slug),
    );
    for (const slug of Object.keys(manifest.articles)) {
      if (!activeSlugs.has(slug)) {
        delete manifest.articles[slug];
        fs.rmSync(path.join(OUTPUT_ROOT, slug), {
          recursive: true,
          force: true,
        });
      }
    }
  }

  if (manifestOnly) {
    manifest.articles = {};
    for (const article of allArticles) {
      const segments =
        writing.getWritingNarrationSegments(article);
      const text = narrationText(segments);
      const textHash = sha256(
        JSON.stringify({
          generatorVersion: GENERATOR_VERSION,
          model: MODEL_ID,
          dtype: DTYPE,
          segments,
          text,
        }),
      );

      manifest.articles[article.slug] = {
        textHash,
        voices: {},
      };

      for (const [voiceId, voiceConfig] of selectedVoices) {
        const outputPath = path.join(
          OUTPUT_ROOT,
          article.slug,
          voiceConfig.fileName,
        );
        const timingsOutputPath = path.join(
          OUTPUT_ROOT,
          article.slug,
          voiceConfig.timingsFileName,
        );
        if (!fs.existsSync(outputPath)) {
          throw new Error(
            `Missing generated narration: ${outputPath}`,
          );
        }
        if (!fs.existsSync(timingsOutputPath)) {
          throw new Error(
            `Missing generated narration timings: ${timingsOutputPath}`,
          );
        }

        const timingPayload = JSON.parse(
          fs.readFileSync(timingsOutputPath, "utf8"),
        );
        if (
          !Array.isArray(timingPayload.cues) ||
          timingPayload.cues.length === 0
        ) {
          throw new Error(
            `Narration timings have no cues: ${timingsOutputPath}`,
          );
        }

        const voiceHash = sha256(
          JSON.stringify({
            textHash,
            voiceId,
            kokoroVoice: voiceConfig.kokoroVoice,
          }),
        );
        manifest.articles[article.slug].voices[voiceId] = {
          hash: voiceHash,
          path: `/audio/writing/${article.slug}/${voiceConfig.fileName}`,
          timingsPath: `/audio/writing/${article.slug}/${voiceConfig.timingsFileName}`,
          kokoroVoice: voiceConfig.kokoroVoice,
          durationSeconds: Math.round(
            audioDurationSeconds(outputPath),
          ),
          bytes: fs.statSync(outputPath).size,
          sha256: sha256(fs.readFileSync(outputPath)),
          timingsBytes: fs.statSync(timingsOutputPath).size,
          timingsSha256: sha256(
            fs.readFileSync(timingsOutputPath),
          ),
          cueCount: timingPayload.cues.length,
        };
      }
    }

    fs.writeFileSync(
      MANIFEST_PATH,
      JSON.stringify(manifest, null, 2) + "\n",
    );
    console.log(
      `Narration manifest rebuilt for ${allArticles.length} published article(s).`,
    );
    return;
  }

  const work = [];
  for (const article of articles) {
    const segments =
      writing.getWritingNarrationSegments(article);
    const text = narrationText(segments);
    const textHash = sha256(
      JSON.stringify({
        generatorVersion: GENERATOR_VERSION,
        model: MODEL_ID,
        dtype: DTYPE,
        segments,
        text,
      }),
    );
    const previous = manifest.articles[article.slug];

    for (const [voiceId, voiceConfig] of selectedVoices) {
      const outputPath = path.join(
        OUTPUT_ROOT,
        article.slug,
        voiceConfig.fileName,
      );
      const timingsOutputPath = path.join(
        OUTPUT_ROOT,
        article.slug,
        voiceConfig.timingsFileName,
      );
      const voiceHash = sha256(
        JSON.stringify({
          textHash,
          voiceId,
          kokoroVoice: voiceConfig.kokoroVoice,
        }),
      );
      const previousVoice = previous?.voices?.[voiceId];

      if (
        previous?.textHash === textHash &&
        previousVoice?.hash === voiceHash &&
        fs.existsSync(outputPath) &&
        fs.existsSync(timingsOutputPath)
      ) {
        console.log(
          `Skipping ${article.slug} / ${voiceId}: narration is unchanged.`,
        );
        continue;
      }

      work.push({
        article,
        segments,
        textHash,
        voiceId,
        voiceConfig,
        voiceHash,
      });
    }
  }

  const engine = work.length ? await loadKokoro() : null;

  for (const item of work) {
    console.log(
      `Generating ${item.article.slug} / ${item.voiceId} (${item.voiceConfig.kokoroVoice})…`,
    );
    const generated = await generateVoice(
      engine,
      item.article,
      item.segments,
      item.voiceId,
      item.voiceConfig,
    );

    manifest.articles[item.article.slug] ??= {
      textHash: item.textHash,
      voices: {},
    };
    manifest.articles[item.article.slug].textHash =
      item.textHash;
    manifest.articles[item.article.slug].voices[
      item.voiceId
    ] = {
      hash: item.voiceHash,
      ...generated,
    };

    fs.writeFileSync(
      MANIFEST_PATH,
      JSON.stringify(manifest, null, 2) + "\n",
    );
  }

  fs.writeFileSync(
    MANIFEST_PATH,
    JSON.stringify(manifest, null, 2) + "\n",
  );
  console.log(
    `Narration ready for ${articles.length} published article(s) / ${selectedVoices.length} voice(s) in ${OUTPUT_ROOT}.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
