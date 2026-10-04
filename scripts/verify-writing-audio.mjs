import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
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
const filesOnly = process.argv.includes("--files-only");

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

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function verifyFileMetadata(filePath, expectedBytes, expectedSha256, label) {
  assert(fs.existsSync(filePath), `Missing ${label}: ${filePath}`);
  const bytes = fs.statSync(filePath).size;
  assert(
    bytes === expectedBytes,
    `${label} size mismatch for ${filePath}: expected ${expectedBytes}, got ${bytes}`,
  );
  const digest = sha256(fs.readFileSync(filePath));
  assert(
    digest === expectedSha256,
    `${label} checksum mismatch for ${filePath}: expected ${expectedSha256}, got ${digest}`,
  );
}

async function main() {
  assert(fs.existsSync(MANIFEST_PATH), `Missing narration manifest: ${MANIFEST_PATH}`);
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));

  assert(manifest.version === 2, `Unsupported narration manifest version: ${manifest.version}`);
  assert(manifest.model === MODEL_ID, `Narration model mismatch: ${manifest.model}`);
  assert(manifest.dtype === DTYPE, `Narration dtype mismatch: ${manifest.dtype}`);
  assert(
    manifest.generatorVersion === GENERATOR_VERSION,
    `Narration generator version mismatch: ${manifest.generatorVersion}`,
  );

  const writing = await readWritingModule();
  const articles = writing.writingArticles.filter(
    (article) => article.status === "published",
  );
  const expectedSlugs = articles.map((article) => article.slug).sort();
  const manifestSlugs = Object.keys(manifest.articles ?? {}).sort();

  assert(
    JSON.stringify(expectedSlugs) === JSON.stringify(manifestSlugs),
    `Narration manifest article set is stale. Expected ${expectedSlugs.join(", ")}, found ${manifestSlugs.join(", ")}`,
  );

  for (const article of articles) {
    const articleEntry = manifest.articles?.[article.slug];
    assert(articleEntry, `Missing narration manifest entry for ${article.slug}`);

    const segments = writing.getWritingNarrationSegments(article);
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

    if (!filesOnly) {
      assert(
        articleEntry.textHash === textHash,
        `Narration text is stale for ${article.slug}. Run npm run writing:audio before deployment.`,
      );
    }

    for (const [voiceId, voiceConfig] of Object.entries(VOICES)) {
      const voiceEntry = articleEntry.voices?.[voiceId];
      assert(voiceEntry, `Missing ${voiceId} narration metadata for ${article.slug}`);

      const expectedPath = `/audio/writing/${article.slug}/${voiceConfig.fileName}`;
      const expectedTimingsPath = `/audio/writing/${article.slug}/${voiceConfig.timingsFileName}`;

      assert(
        voiceEntry.path === expectedPath,
        `Unexpected ${voiceId} narration path for ${article.slug}: ${voiceEntry.path}`,
      );
      assert(
        voiceEntry.timingsPath === expectedTimingsPath,
        `Unexpected ${voiceId} timing path for ${article.slug}: ${voiceEntry.timingsPath}`,
      );
      assert(
        voiceEntry.kokoroVoice === voiceConfig.kokoroVoice,
        `Unexpected Kokoro voice for ${article.slug} / ${voiceId}: ${voiceEntry.kokoroVoice}`,
      );

      if (!filesOnly) {
        const voiceHash = sha256(
          JSON.stringify({
            textHash,
            voiceId,
            kokoroVoice: voiceConfig.kokoroVoice,
          }),
        );
        assert(
          voiceEntry.hash === voiceHash,
          `Narration voice hash is stale for ${article.slug} / ${voiceId}. Run npm run writing:audio before deployment.`,
        );
      }

      const audioPath = path.join("public", voiceEntry.path.replace(/^\//, ""));
      const timingsPath = path.join(
        "public",
        voiceEntry.timingsPath.replace(/^\//, ""),
      );

      verifyFileMetadata(
        audioPath,
        voiceEntry.bytes,
        voiceEntry.sha256,
        `${voiceId} audio`,
      );
      verifyFileMetadata(
        timingsPath,
        voiceEntry.timingsBytes,
        voiceEntry.timingsSha256,
        `${voiceId} timings`,
      );

      const timingPayload = JSON.parse(fs.readFileSync(timingsPath, "utf8"));
      assert(
        Array.isArray(timingPayload.cues) && timingPayload.cues.length > 0,
        `Narration timings have no cues: ${timingsPath}`,
      );
      assert(
        timingPayload.voice === voiceId,
        `Timing voice mismatch for ${article.slug} / ${voiceId}`,
      );
      assert(
        timingPayload.kokoroVoice === voiceConfig.kokoroVoice,
        `Timing Kokoro voice mismatch for ${article.slug} / ${voiceId}`,
      );
    }
  }

  console.log(
    filesOnly
      ? `Verified checked-in Writing narration file integrity for ${articles.length} published article(s).`
      : `Verified checked-in Writing narration is current for ${articles.length} published article(s).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
