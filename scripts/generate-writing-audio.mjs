import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import ts from "typescript";

const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";
const DTYPE = "q8";
const GENERATOR_VERSION = "kokoro-writing-v1";
const VOICES = {
  female: { kokoroVoice: "af_heart", fileName: "female.mp3" },
  male: { kokoroVoice: "am_michael", fileName: "male.mp3" },
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

function blockSpeechText(block) {
  switch (block.type) {
    case "paragraph":
      return block.text;
    case "bullets":
      return block.items.map((item) => `Bullet point. ${item}`).join(" ");
    case "quote":
      return [block.text, block.attribution ? `Quote attribution: ${block.attribution}.` : ""]
        .filter(Boolean)
        .join(" ");
    case "image":
      return block.caption ?? "";
    case "code":
      return "";
    case "callout":
      return [block.title ?? "", block.text].filter(Boolean).join(". ");
    default:
      return "";
  }
}

function articleNarrationText(article) {
  const parts = [
    article.title,
    article.description,
    article.thesis ? `Key idea. ${article.thesis}` : "",
    ...article.sections.flatMap((section) => [
      section.title ?? "",
      ...(section.paragraphs ?? []),
      ...(section.bullets ?? []).map((item) => `Bullet point. ${item}`),
      ...(section.blocks ?? []).map(blockSpeechText),
    ]),
    ...(article.takeaways?.length
      ? [
          article.takeawaysTitle ?? "Key takeaways",
          ...article.takeaways.map((item) => `Takeaway. ${item}`),
        ]
      : []),
  ];

  return parts
    .map((part) => part?.trim())
    .filter(Boolean)
    .join("\n\n")
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
      version: 1,
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
    return KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: DTYPE,
      device: "cpu",
    });
  } catch (error) {
    console.error(
      "Install generation tooling with: npm install --no-save --package-lock=false kokoro-js@1.2.1 @huggingface/transformers@3.8.1",
    );
    throw error;
  }
}

async function generateVoice(tts, article, narrationText, voiceId, voiceConfig) {
  const articleDir = path.join(OUTPUT_ROOT, article.slug);
  const outputPath = path.join(articleDir, voiceConfig.fileName);
  fs.mkdirSync(articleDir, { recursive: true });

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), `writing-audio-${article.slug}-${voiceId}-`),
  );

  try {
    const chunks = speechChunks(narrationText);
    const wavFiles = [];

    for (let index = 0; index < chunks.length; index += 1) {
      const audio = await tts.generate(chunks[index], {
        voice: voiceConfig.kokoroVoice,
        speed: 1,
      });
      const wavPath = path.join(tempDir, `${String(index).padStart(4, "0")}.wav`);
      await audio.save(wavPath);
      wavFiles.push(wavPath);
      process.stdout.write(`  ${voiceId}: chunk ${index + 1}/${chunks.length}\r`);
    }
    process.stdout.write("\n");

    const concatFile = path.join(tempDir, "concat.txt");
    fs.writeFileSync(
      concatFile,
      wavFiles.map((file) => `file '${file.replaceAll("'", "'\\''")}'`).join("\n"),
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

    return {
      path: `/audio/writing/${article.slug}/${voiceConfig.fileName}`,
      kokoroVoice: voiceConfig.kokoroVoice,
      durationSeconds: Math.round(audioDurationSeconds(outputPath)),
      bytes: fs.statSync(outputPath).size,
      sha256: sha256(fs.readFileSync(outputPath)),
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
  const allArticles = writing.writingArticles.filter((article) => article.status === "published");
  const articles = onlySlug
    ? allArticles.filter((article) => article.slug === onlySlug)
    : allArticles;

  if (onlySlug && articles.length !== 1) {
    throw new Error(`Unknown published Writing slug: ${onlySlug}`);
  }

  const selectedVoices = onlyVoice
    ? Object.entries(VOICES).filter(([voiceId]) => voiceId === onlyVoice)
    : Object.entries(VOICES);

  const manifest = readManifest();
  manifest.version = 1;
  manifest.model = MODEL_ID;
  manifest.dtype = DTYPE;
  manifest.generatorVersion = GENERATOR_VERSION;
  manifest.generatedAt = new Date().toISOString();
  manifest.articles ??= {};

  if (!onlySlug && !onlyVoice && !manifestOnly) {
    const activeSlugs = new Set(allArticles.map((article) => article.slug));
    for (const slug of Object.keys(manifest.articles)) {
      if (!activeSlugs.has(slug)) {
        delete manifest.articles[slug];
        fs.rmSync(path.join(OUTPUT_ROOT, slug), { recursive: true, force: true });
      }
    }
  }

  if (manifestOnly) {
    manifest.articles = {};
    for (const article of allArticles) {
      const narrationText = articleNarrationText(article);
      const textHash = sha256(
        JSON.stringify({
          generatorVersion: GENERATOR_VERSION,
          model: MODEL_ID,
          dtype: DTYPE,
          narrationText,
        }),
      );

      manifest.articles[article.slug] = { textHash, voices: {} };

      for (const [voiceId, voiceConfig] of selectedVoices) {
        const outputPath = path.join(OUTPUT_ROOT, article.slug, voiceConfig.fileName);
        if (!fs.existsSync(outputPath)) {
          throw new Error(`Missing generated narration: ${outputPath}`);
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
          kokoroVoice: voiceConfig.kokoroVoice,
          durationSeconds: Math.round(audioDurationSeconds(outputPath)),
          bytes: fs.statSync(outputPath).size,
          sha256: sha256(fs.readFileSync(outputPath)),
        };
      }
    }

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
    console.log(`Narration manifest rebuilt for ${allArticles.length} published article(s).`);
    return;
  }

  const work = [];
  for (const article of articles) {
    const narrationText = articleNarrationText(article);
    const textHash = sha256(
      JSON.stringify({
        generatorVersion: GENERATOR_VERSION,
        model: MODEL_ID,
        dtype: DTYPE,
        narrationText,
      }),
    );
    const previous = manifest.articles[article.slug];

    for (const [voiceId, voiceConfig] of Object.entries(VOICES)) {
      const outputPath = path.join(OUTPUT_ROOT, article.slug, voiceConfig.fileName);
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
        fs.existsSync(outputPath)
      ) {
        console.log(`Skipping ${article.slug} / ${voiceId}: narration is unchanged.`);
        continue;
      }

      work.push({
        article,
        narrationText,
        textHash,
        voiceId,
        voiceConfig,
        voiceHash,
      });
    }
  }

  const tts = work.length ? await loadKokoro() : null;

  for (const item of work) {
    console.log(
      `Generating ${item.article.slug} / ${item.voiceId} (${item.voiceConfig.kokoroVoice})…`,
    );
    const generated = await generateVoice(
      tts,
      item.article,
      item.narrationText,
      item.voiceId,
      item.voiceConfig,
    );

    manifest.articles[item.article.slug] ??= {
      textHash: item.textHash,
      voices: {},
    };
    manifest.articles[item.article.slug].textHash = item.textHash;
    manifest.articles[item.article.slug].voices[item.voiceId] = {
      hash: item.voiceHash,
      ...generated,
    };

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(
    `Narration ready for ${articles.length} published article(s) / ${selectedVoices.length} voice(s) in ${OUTPUT_ROOT}.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
