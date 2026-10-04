export type WritingEvidence = {
  label: string;
  value: string;
  detail: string;
};

export type WritingSection = {
  id?: string;
  eyebrow?: string;
  title?: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  blocks?: readonly WritingBlock[];
};

export type WritingBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: readonly string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "code"; language?: string; code: string }
  | { type: "callout"; title?: string; text: string };

export type WritingSource = {
  label: string;
  href: string;
  kind: "first-hand" | "reference";
};

export type WritingAudio = {
  src: string;
  mimeType: string;
  durationSeconds: number;
};

export type WritingFormat =
  | "note"
  | "analysis"
  | "deep-dive"
  | "project-reflection";

export const writingNarrationVoices = {
  female: {
    label: "Female",
    kokoroVoice: "af_heart",
    fileName: "female.mp3",
  },
  male: {
    label: "Male",
    kokoroVoice: "am_michael",
    fileName: "male.mp3",
  },
} as const;

export type WritingNarrationVoice = keyof typeof writingNarrationVoices;

export function getWritingNarrationSources(
  article: Pick<WritingArticleBase, "slug">,
) {
  return Object.entries(writingNarrationVoices).map(([id, voice]) => ({
    id: id as WritingNarrationVoice,
    label: voice.label,
    kokoroVoice: voice.kokoroVoice,
    src: `/audio/writing/${article.slug}/${voice.fileName}`,
    timingsSrc: `/audio/writing/${article.slug}/${id}.timings.json`,
    mimeType: "audio/mpeg" as const,
  }));
}

export const writingCategories = {
  ai: { label: "AI" },
  technology: { label: "Technology" },
  data: { label: "Data" },
  career: { label: "Career" },
  projects: { label: "Projects" },
  notes: { label: "Notes" },
} as const;

export const writingSeries = {
  "what-the-work-taught-me": { label: "What the Work Taught Me" },
} as const;

export const writingSectionCopy = {
  heading: "What I’m thinking through.",
  subtitle: "Ideas, experiments, and everything that piques my curiosity as I navigate my career.",
} as const;

export type WritingCategory = keyof typeof writingCategories;
export type WritingSeries = keyof typeof writingSeries;
export type WritingCover =
  | { kind: "visual"; visual: "forecast-calibration" | "oil-sar" | "agent-provenance"; alt: string }
  | { kind: "image"; src: string; alt: string };
export type WritingOrigin =
  | { kind: "project"; projectSlugs: readonly string[]; disclosure?: string }
  | { kind: "independent" };

export type WritingArticleBase = {
  slug: string;
  title: string;
  description: string;
  cardDescription?: string;
  format: WritingFormat;
  updatedAt?: string;
  category: WritingCategory;
  topics: readonly string[];
  series?: WritingSeries;
  readingMinutes: number;
  listenMinutes: number;
  audio?: WritingAudio;
  homeRank?: number;
  cover: WritingCover;
  origin: WritingOrigin;
  thesis?: string;
  evidence?: readonly WritingEvidence[];
  sections: readonly WritingSection[];
  takeaways?: readonly string[];
  takeawaysTitle?: string;
  sources?: readonly WritingSource[];
};

export type PublishedWritingArticle = WritingArticleBase & {
  status: "published";
  publishedAt: string;
};

export type DraftWritingArticle = WritingArticleBase & {
  status: "draft";
  publishedAt?: string;
};

export type WritingArticle = PublishedWritingArticle | DraftWritingArticle;


export type WritingNarrationSegment = {
  id: string;
  text: string;
  prefix?: string;
};

function narrationListPrefix(index: number) {
  const ordinals = [
    "First.",
    "Second.",
    "Third.",
    "Fourth.",
    "Fifth.",
    "Sixth.",
    "Seventh.",
    "Eighth.",
    "Ninth.",
    "Tenth.",
  ] as const;
  return ordinals[index] ?? `Item ${index + 1}.`;
}

function writingBlockNarrationSegments(
  block: WritingBlock,
  sectionIndex: number,
  blockIndex: number,
): WritingNarrationSegment[] {
  const base = `section-${sectionIndex}-block-${blockIndex}`;
  switch (block.type) {
    case "paragraph":
      return [{ id: `${base}-paragraph`, text: block.text }];
    case "bullets":
      return block.items.map((item, itemIndex) => ({
        id: `${base}-bullet-${itemIndex}`,
        text: item,
        prefix: narrationListPrefix(itemIndex),
      }));
    case "quote":
      return [
        { id: `${base}-quote`, text: block.text },
        ...(block.attribution
          ? [{ id: `${base}-attribution`, text: block.attribution, prefix: "Quote attribution." }]
          : []),
      ];
    case "image":
      return block.caption
        ? [{ id: `${base}-caption`, text: block.caption }]
        : [];
    case "code":
      return [];
    case "callout":
      return [
        ...(block.title ? [{ id: `${base}-title`, text: block.title }] : []),
        { id: `${base}-text`, text: block.text },
      ];
  }
}

export function getWritingNarrationSegments(
  article: Pick<
    WritingArticleBase,
    "title" | "description" | "thesis" | "sections" | "takeaways" | "takeawaysTitle"
  >,
): WritingNarrationSegment[] {
  const segments: WritingNarrationSegment[] = [
    { id: "article-title", text: article.title },
    { id: "article-description", text: article.description },
  ];

  if (article.thesis) {
    segments.push({
      id: "article-thesis",
      text: article.thesis,
      prefix: "Key idea.",
    });
  }

  article.sections.forEach((section, sectionIndex) => {
    if (section.title) {
      segments.push({
        id: `section-${sectionIndex}-title`,
        text: section.title,
      });
    }
    section.paragraphs?.forEach((paragraph, paragraphIndex) => {
      segments.push({
        id: `section-${sectionIndex}-paragraph-${paragraphIndex}`,
        text: paragraph,
      });
    });
    section.bullets?.forEach((bullet, bulletIndex) => {
      segments.push({
        id: `section-${sectionIndex}-bullet-${bulletIndex}`,
        text: bullet,
        prefix: narrationListPrefix(bulletIndex),
      });
    });
    section.blocks?.forEach((block, blockIndex) => {
      segments.push(
        ...writingBlockNarrationSegments(block, sectionIndex, blockIndex),
      );
    });
  });

  if (article.takeaways?.length) {
    segments.push({
      id: "takeaways-title",
      text: article.takeawaysTitle ?? "Key takeaways",
    });
    article.takeaways.forEach((takeaway, takeawayIndex) => {
      segments.push({
        id: `takeaway-${takeawayIndex}`,
        text: takeaway,
        prefix: narrationListPrefix(takeawayIndex),
      });
    });
  }

  return segments;
}

/**
 * Editorial content is subordinate to the governed public truth and evidence model.
 *
 * This is editorial content, not a new source of biographical truth. Material
 * project claims must remain supported by the public evidence linked from each
 * article and by data/source-of-truth.public.yaml / project-evidence.public.yaml.
 */
export const writingArticles: readonly WritingArticle[] = [
  {
    slug: "when-to-trust-a-probabilistic-forecast",
    title: "When should you trust a probabilistic forecast?",
    description:
      "A practical trust test for probabilistic forecasts: proper scoring, calibration, complete coverage, leakage-resistant evaluation, reproducibility and published failure modes.",
    cardDescription:
      "A practical test for knowing when a probabilistic forecast deserves trust.",
    format: "deep-dive",
    status: "published",
    publishedAt: "2026-09-11",
    category: "data",
    topics: ["Forecasting", "Calibration", "Evaluation"],
    series: "what-the-work-taught-me",
    homeRank: 1,
    cover: {
      kind: "visual",
      visual: "forecast-calibration",
      alt: "Dark navy calibration chart comparing forecast probabilities with observed outcomes.",
    },
    readingMinutes: 9,
    listenMinutes: 8,
    origin: {
      kind: "project",
      projectSlugs: ["presaira"],
      disclosure: "This essay is derived from public project evidence and does not widen the ownership or publication boundaries of the underlying case study.",
    },
    thesis:
      "A forecast earns trust by surviving inspection after reality is known. The useful question is not whether one prediction was right, but whether the probability system was evaluated completely, reproducibly and without hiding the ways it failed.",
    evidence: [
      {
        label: "2026 coverage",
        value: "104 / 104",
        detail: "All 72 group matches and 32 knockout matches are present in the committed tournament evaluation.",
      },
      {
        label: "Tournament simulation",
        value: "50,000×",
        detail: "Production tournament simulations run at a fixed seed with model and simulator versions recorded.",
      },
      {
        label: "Calibration decision",
        value: "None",
        detail: "Platt and isotonic post-calibration were tested and rejected when they did not improve the held-out evidence cleanly.",
      },
    ],
    sections: [
      {
        eyebrow: "01 — Define the claim",
        title: "A probability is not a disguised yes-or-no answer.",
        paragraphs: [
          "A 60% forecast does not promise that this particular event will happen. It makes a statement about repeated behaviour: across a sufficiently large set of comparable 60% forecasts, the event should occur about 60% of the time. That distinction changes how the system has to be evaluated.",
          "Presaira therefore treats the output as a distribution rather than a single predicted scoreline. Brier score and log loss sit ahead of top-pick accuracy because they score the probabilities themselves. A confidently wrong distribution should be punished more than a cautious miss, and a well-calibrated probability should get credit even when one individual outcome goes the other way.",
          "This is also why a single spectacular prediction is weak evidence. Probabilistic quality is a property of a collection of forecasts, not a screenshot of one correct call.",
        ],
      },
      {
        eyebrow: "02 — Score honestly",
        title: "Use proper scores, then inspect reliability instead of worshipping one number.",
        paragraphs: [
          "A proper scoring rule gives the forecaster an incentive to state the probability it actually believes. In the Presaira evaluation, multiclass Brier score and log loss provide that baseline discipline. A uniform one-third model is also kept visible as a deliberately simple reference rather than letting the model grade itself in isolation.",
          "But a Brier score alone is not a complete trust certificate. Reliability matters: probabilities near 0.6 should verify near 60% over enough observations. Sharpness matters too: a model that always predicts the base rate can look reliably cautious while contributing little decision value. Reliability diagrams help separate those behaviours, provided the bins contain enough observations to mean something.",
          "Tournament samples are small. Presaira explicitly notes that calibration bins at the tails can be dominated by one or two matches. A diagram with sparse bins should reduce confidence in the conclusion, not invite stronger storytelling.",
        ],
        bullets: [
          "Score the full probability vector, not only the winning class.",
          "Keep a simple reference model visible.",
          "Read calibration together with bin counts and sample size.",
        ],
      },
      {
        eyebrow: "03 — Protect the timeline",
        title: "A clean metric is worthless if future information leaked into the past.",
        paragraphs: [
          "Temporal leakage is one of the easiest ways to make a forecasting model look better than it was. The training boundary has to be an executable rule, not a sentence in a README. Presaira records a 2026-06-10 training cutoff for the published tournament run and contains a pre-cutoff assertion that raises when future rows enter the training set.",
          "The historical evaluation separates tuning from holding out: 2022 was used for tuning while 2018 remained held out for evaluation. That is more informative than reporting a score from a dataset that influenced every modeling choice.",
          "The general test is simple: if I cannot explain what information was available at the moment each forecast would have been issued, I do not yet have an honest out-of-sample result.",
        ],
      },
      {
        eyebrow: "04 — Count every outcome",
        title: "Coverage is part of the metric.",
        paragraphs: [
          "A good average can be manufactured by quietly dropping awkward observations. For the 2026 tournament, Presaira records 72 of 72 group matches and 32 of 32 knockout matches, with an empty omitted list. That coverage statement belongs beside the score because the score is only meaningful over the set it actually represents.",
          "The same principle applies well beyond sport. If a pipeline rejects difficult records, if a sensor disappears during bad conditions, or if an evaluation excludes cases after seeing their outcomes, the denominator becomes a modeling decision. Report it explicitly.",
        ],
      },
      {
        eyebrow: "05 — Calibrate only when evidence earns it",
        title: "Calibration is a model choice, not a ceremonial final step.",
        paragraphs: [
          "Post-hoc calibration can improve probability quality, but it can also overfit a small calibration window. In Presaira, Platt scaling and isotonic regression were both tested. Platt was effectively neutral on Brier while degrading log loss; isotonic worsened the 2022 Brier score by 2.3%. The recorded decision was therefore calibration_method: none.",
          "That result matters because 'no calibration' can mean two very different things: nobody checked, or calibration methods were evaluated and the evidence did not justify adding one. Only the second is a defensible engineering decision.",
          "A trustworthy pipeline should make rejected interventions visible. Otherwise the published model becomes a survivor selected from an invisible garden of experiments.",
        ],
      },
      {
        eyebrow: "06 — Reproduce the system",
        title: "Reproducibility includes simulation, versions and failed checks.",
        paragraphs: [
          "Tournament probabilities depend on more than the match model. Group rules, knockout progression, third-place qualification, random sampling and simulation count all affect the final distribution. Presaira runs the tournament 50,000 times with a fixed seed and records model and simulator versions so the published artifact has an inspectable computational context.",
          "One of the most useful pieces of evidence is a failed convergence check: the committed 10,000-versus-50,000 target does not pass its chosen threshold, so production stays at 50,000. Keeping that failure is stronger evidence than retroactively choosing a threshold that makes the run look clean.",
        ],
      },
      {
        eyebrow: "07 — Bound the trust",
        title: "A model can be useful without pretending to be an oracle.",
        paragraphs: [
          "Presaira does not see team news, injuries, suspensions or lineups. It was also under-confident in parts of the 2026 probability range, and the historical backtests sit within one standard deviation of a strong Elo-based baseline. Those limitations are not footnotes to remove from the story; they define where the forecast deserves reliance.",
          "My practical trust test is therefore cumulative. I want proper scoring, calibration evidence, complete coverage, leakage protection, reproducible artifacts and explicit limitations. None proves a forecast is 'correct'. Together they make it possible to understand what the numbers actually deserve.",
        ],
      },
    ],
    takeawaysTitle: "What I carry into the next system.",
    takeaways: [
      "Judge probabilistic systems over many forecasts with proper scoring rules, not isolated wins.",
      "Treat coverage and temporal cutoffs as part of the evaluation, not implementation trivia.",
      "Calibration should be tested and rejected when it does not improve held-out evidence.",
      "Version simulation assumptions and preserve failed checks; reproducibility includes uncomfortable results.",
      "Trust should shrink when sample size, missing inputs or observed calibration behaviour demand it.",
    ],
    sources: [
      {
        label: "Presaira model card and committed evaluation rationale",
        href: "https://github.com/m7mdehab/WC2026-Live-Prediction-Engine/blob/main/docs/model_card.md",
        kind: "first-hand",
      },
      {
        label: "Presaira 2026 tournament postmortem",
        href: "https://github.com/m7mdehab/WC2026-Live-Prediction-Engine/blob/main/docs/wc2026_postmortem.md",
        kind: "first-hand",
      },
      {
        label: "ECMWF Forecast User Guide — probabilistic verification, reliability and Brier score",
        href: "https://confluence.ecmwf.int/spaces/FUG/pages/673551875/Section+12.B+Statistical+Concepts+-+Probabilistic+Data",
        kind: "reference",
      },
    ],
  },
  {
    slug: "why-accuracy-is-not-enough-for-oil-spill-detection",
    title: "Why accuracy alone is not enough for oil-spill detection",
    description:
      "A metric-design case study from Sentinel-1 SAR segmentation: why rare oil pixels, look-alikes and deployment domain gaps make overall accuracy a weak headline measure.",
    cardDescription:
      "Why rare oil pixels make accuracy a weak headline metric.",
    format: "deep-dive",
    status: "published",
    publishedAt: "2026-09-11",
    category: "data",
    topics: ["Computer vision", "Metrics", "Validation"],
    series: "what-the-work-taught-me",
    homeRank: 2,
    cover: {
      kind: "visual",
      visual: "oil-sar",
      alt: "Public Sentinel-1 SAR case-study image used for oil-spill segmentation.",
    },
    readingMinutes: 8,
    listenMinutes: 8,
    origin: {
      kind: "project",
      projectSlugs: ["oil-spill-detection"],
      disclosure: "This essay is derived from public project evidence and does not widen the ownership or publication boundaries of the underlying case study.",
    },
    thesis:
      "When the class you care about is rare, overall accuracy can improve while the useful part of the system remains poor. Evaluation has to follow the operational question: did the model find oil, distinguish it from look-alikes and preserve that behaviour when the pipeline left the curated test chips?",
    evidence: [
      {
        label: "Selected model",
        value: "SegFormer mit-b2",
        detail: "Chosen from the committed U-Net, DeepLabV3+ and SegFormer comparison on the official test split.",
      },
      {
        label: "Oil IoU / recall",
        value: "0.566 / 0.764",
        detail: "Oil-specific overlap and recall from the selected model's committed 110-image test evaluation.",
      },
      {
        label: "Class rarity",
        value: "≈1% oil pixels",
        detail: "The official dataset contains 1002 training and 110 test images with severe oil/background imbalance.",
      },
    ],
    sections: [
      {
        eyebrow: "01 — Start with the failure mode",
        title: "The sea can make a bad model look accurate.",
        paragraphs: [
          "In the oil-spill dataset I used, oil occupies roughly 1% of pixels. Most of an image is not oil. A segmentation model can therefore classify enormous regions of background correctly and still miss a meaningful share of the spill while retaining an impressive-looking overall pixel accuracy.",
          "The selected SegFormer model reaches 0.967 pixel accuracy, but that is deliberately not the headline result. The more useful numbers are oil IoU at 0.566 and oil recall at 0.764, reported alongside mean IoU and macro F1. Those metrics force the evaluation to look at the class the system is meant to detect.",
          "The general lesson is not that accuracy is a bad metric. It is that a metric becomes bad when its weighting is misaligned with the cost and rarity of the classes that matter.",
        ],
      },
      {
        eyebrow: "02 — Make ambiguity a class",
        title: "Oil is not just dark water.",
        paragraphs: [
          "Synthetic Aperture Radar is valuable because it works through cloud and at night, but dark patches in SAR are not uniquely oil. Low-wind zones, biogenic films and rain-related effects can suppress backscatter too. If those look-alikes are collapsed into generic background, the model can avoid learning the distinction the operator actually needs.",
          "The project frames the task as five-class segmentation: sea surface, oil spill, look-alike, ship and land. That makes oil-versus-look-alike confusion measurable rather than hiding it inside a binary target.",
          "This framing also changes how qualitative inspection should work. A visually plausible dark-region mask is not enough; it matters whether the model is repeatedly converting look-alikes into false oil alerts.",
        ],
      },
      {
        eyebrow: "03 — Use a metric stack",
        title: "IoU, recall and macro metrics answer different questions.",
        paragraphs: [
          "Intersection over Union asks how much the predicted oil region overlaps the labelled oil region, penalizing both missed oil and over-prediction. Recall asks how much of the labelled oil the model recovers. Macro F1 and mean IoU stop the majority class from completely dominating the summary because each class contributes more evenly.",
          "On the committed 110-image test split, SegFormer mit-b2 produced oil IoU 0.566, oil recall 0.764, mean IoU 0.696 and macro F1 0.802. U-Net and DeepLabV3+ produced lower oil IoU and recall in the same project evaluation. That is why the model-selection argument is expressed in oil-specific terms rather than '96.7% accurate'.",
          "No single number captures every operating preference. A response system that values missing as little oil as possible may choose a different threshold than a review workflow that cannot tolerate many false alarms. The metric stack keeps that trade-off visible.",
        ],
      },
      {
        eyebrow: "04 — Keep the split honest",
        title: "A test score describes one dataset, not the ocean.",
        paragraphs: [
          "The official split is small: 1002 training images and 110 test images. The project records that limitation directly. Model comparisons are meaningful inside that evaluation contract, but they should not be inflated into a claim of universal marine performance.",
          "The dataset also uses VV intensity imagery. That means dual-polarization information is not part of the learned signal. A later system with different sensors, preprocessing, incidence-angle distributions or geographic conditions should be treated as a domain change until evidence shows otherwise.",
          "This is where evaluation language matters. 'Best on this committed test split' is a checkable statement. 'Detects oil spills accurately everywhere' is not.",
        ],
      },
      {
        eyebrow: "05 — Test the pipeline boundary",
        title: "The model is only one part of a geospatial product.",
        paragraphs: [
          "Training runs on labelled image chips, while useful deployment starts with a raw Sentinel-1 scene. The project therefore carries the selected model through ONNX export, scene preprocessing, tiled inference, overlap stitching, GeoTIFF output, polygon vectorization, API serving and a MapLibre interface.",
          "Every transition is another place where an offline metric can stop describing the real system. Preprocessing mismatch can move the input distribution. Tiling can create seams. Georeferencing errors can place a good mask in the wrong location. Vectorization can change the geometry an operator sees.",
          "For production ML, I therefore think of validation as a chain: model metrics establish one link; parity checks and end-to-end scene tests establish the rest.",
        ],
      },
      {
        eyebrow: "06 — Use real events carefully",
        title: "A case study can expose a domain gap without pretending to close it.",
        paragraphs: [
          "The Wakashio case study runs the pipeline on a previously unseen Sentinel-1B scene over the August 2020 spill near Mauritius. The output places detected oil in the expected coastal and lagoon area, which is useful evidence that the geospatial pipeline can operate end to end.",
          "It is not a substitute for a large independently labelled raw-scene benchmark. The project explicitly treats detected area as an approximate lower bound because the raw-scene radiometry and training-chip preprocessing do not line up perfectly. That caveat is the right conclusion from the evidence, not a defect to hide.",
        ],
      },
      {
        eyebrow: "07 — Design metrics around the decision",
        title: "The headline metric is part of product design.",
        paragraphs: [
          "Choosing what to put at the top of a report shapes what the team optimizes. If background-dominated accuracy is the headline, improvements that make the sea easier to classify can look more important than improvements that find oil. If oil IoU and recall are first, the optimization target is much closer to the reason the system exists.",
          "That is the broader pattern I carry into imbalanced ML work: identify the consequential class, expose the confusable alternatives, report the denominator, and choose metrics that make expensive errors visible rather than numerically cheap.",
        ],
      },
    ],
    takeawaysTitle: "What I carry into the next system.",
    takeaways: [
      "For rare-class segmentation, overall accuracy can be numerically strong while the target class remains weak.",
      "Report target-class overlap and recall alongside balanced multiclass metrics.",
      "Represent operational look-alikes explicitly when they are a real source of false positives.",
      "Keep dataset size, sensor channel and domain limits beside the score.",
      "Validate the deployment chain after the model: preprocessing, export parity, tiling, georeferencing and vectorization all matter.",
    ],
    sources: [
      {
        label: "Oil Spill Detection repository — architecture, results and limitations",
        href: "https://github.com/m7mdehab/oil-spill-detection",
        kind: "first-hand",
      },
      {
        label: "Committed model results",
        href: "https://github.com/m7mdehab/oil-spill-detection/blob/main/docs/results.md",
        kind: "first-hand",
      },
      {
        label: "Wakashio end-to-end case study",
        href: "https://github.com/m7mdehab/oil-spill-detection/tree/main/docs/case_study",
        kind: "first-hand",
      },
      {
        label: "Scientific Reports — domain-adaptation segmentation of noisy SAR oil-spill imagery",
        href: "https://doi.org/10.1038/s41598-026-49934-w",
        kind: "reference",
      },
    ],
  },
  {
    slug: "what-an-ai-agent-should-do-when-evidence-is-missing",
    title: "What should an AI agent do when the evidence is missing?",
    description:
      "A practical governance pattern for agentic systems: preserve unknowns, trace material claims to evidence and separate content generation from authority to take external action.",
    cardDescription:
      "How agents should handle missing evidence without inventing certainty.",
    format: "analysis",
    status: "published",
    publishedAt: "2026-09-11",
    category: "ai",
    topics: ["AI agents", "Provenance", "Governance"],
    series: "what-the-work-taught-me",
    homeRank: 3,
    cover: {
      kind: "visual",
      visual: "agent-provenance",
      alt: "Public-safe governance diagram linking evidence, known and unknown claims, traceable provenance, and action authority.",
    },
    readingMinutes: 9,
    listenMinutes: 8,
    origin: {
      kind: "project",
      projectSlugs: ["opportunityos"],
      disclosure: "This essay is derived from public project evidence and does not widen the ownership or publication boundaries of the underlying case study.",
    },
    thesis:
      "The safest useful answer to missing evidence is often neither yes nor no. A governed agent needs an explicit unknown state, traceable material claims and a separate authority model for external actions so fluency never silently becomes permission.",
    evidence: [
      {
        label: "Truth authority",
        value: "EvidenceClaim",
        detail: "Material generated claims in the public OpportunityOS contract remain traceable to evidence records.",
      },
      {
        label: "Decision semantics",
        value: "Open-world",
        detail: "UNKNOWN is not FALSE and ABSENT is not INELIGIBLE; missing evidence does not become a negative fact.",
      },
      {
        label: "Action authority",
        value: "3 modes",
        detail: "DRY_RUN, ASSISTED and CONTROLLED_SUBMIT separate preparation from progressively stronger external side effects.",
      },
    ],
    sections: [
      {
        eyebrow: "01 — Preserve uncertainty",
        title: "Missing data is not negative evidence.",
        paragraphs: [
          "Many automation failures begin with an innocent shortcut: a field is empty, so the system treats the answer as no. That is closed-world logic. It can be appropriate in a tightly controlled database, but it is dangerous when an agent is assembling evidence from incomplete resumes, websites, job descriptions or external sources.",
          "OpportunityOS uses an open-world distinction in its public architecture: UNKNOWN is not FALSE, and ABSENT is not INELIGIBLE. If work authorization for one country is not recorded, that does not establish that the person is unauthorized there. If a tool is not mentioned in one document, that does not prove the person lacks it.",
          "The practical consequence is that uncertainty must survive normalization. Once an ingestion layer collapses unknown into false, every downstream model inherits a confident fiction.",
        ],
      },
      {
        eyebrow: "02 — Attach claims to evidence",
        title: "Provenance has to constrain generation, not decorate it afterward.",
        paragraphs: [
          "A citation shown next to generated text is useful, but governance needs a stronger invariant: material claims should be generated only from facts the system is authorized to use. In OpportunityOS, the Truth Graph and EvidenceClaim model are the factual authority for founder claims.",
          "The public product constitution permits generated CVs, proposals and related artifacts to select, reorder, summarize and rewrite verified facts. It does not permit them to invent employers, dates, titles, skills, credentials, achievements, outcomes or other material claims. If evidence is insufficient, the output should omit the claim or route it for review.",
          "That design moves provenance upstream. Instead of asking 'Can I find a source that resembles what the model just wrote?', the compiler asks 'Which verified evidence permits this sentence to exist?'",
        ],
      },
      {
        eyebrow: "03 — Separate qualification from guessing",
        title: "A hard rejection should require a hard conflict.",
        paragraphs: [
          "Agents that rank opportunities face a tempting optimization: turn every unknown into a penalty so the pipeline can always produce a clean ordered list. The result looks decisive but can systematically reject opportunities for which the evidence is merely incomplete.",
          "The OpportunityOS approach keeps hard constraints separate from soft ranking. A hard rejection needs an explicit requirement plus a verified conflict or applicable policy. Missing evidence can lower confidence, create a review task or remain an unknown, but it does not get promoted into a fact simply because the scoring function wants a number.",
          "This is a broader governance pattern: uncertainty should affect confidence and workflow, not silently mutate ontology.",
        ],
      },
      {
        eyebrow: "04 — Separate language ability from action authority",
        title: "Being able to fill a form is not permission to submit it.",
        paragraphs: [
          "An agent can often generate an answer, navigate a page and identify a submit button long before the system has earned authority to make the external commitment. Treating those capabilities as one permission boundary is a serious design error.",
          "OpportunityOS therefore exposes three action modes. DRY_RUN prepares and validates without external mutation. ASSISTED may navigate, fill or upload where allowed but must not submit. CONTROLLED_SUBMIT is reserved for individually graduated actions whose pre-submit checks and authority requirements have been satisfied.",
          "This separation makes escalation explicit. It also creates a place for CAPTCHA, MFA, ambiguous declarations, changed terms or uncertain prior outcomes to stop the workflow rather than trigger improvisation.",
        ],
      },
      {
        eyebrow: "05 — Treat uncertain side effects as state",
        title: "After an ambiguous external action, do not guess and retry.",
        paragraphs: [
          "Distributed systems already teach this lesson: a timeout does not tell you whether the remote side effect happened. Agentic workflows inherit the same problem. If a submission request times out after the remote server accepted it, blindly retrying can create duplicate applications, messages or transactions.",
          "A governed workflow needs an explicit uncertain-outcome state and a reconciliation path. The agent should freeze the affected action, inspect durable evidence where available, and recover deliberately. 'I did not see success' is not equivalent to 'nothing happened'.",
          "This is another form of open-world reasoning: operational uncertainty deserves its own state rather than being coerced into a convenient boolean.",
        ],
      },
      {
        eyebrow: "06 — Keep learning downstream of truth",
        title: "Optimization must not create a weaker route around the authority model.",
        paragraphs: [
          "Outcome feedback can improve source selection, ranking and workflow efficiency. It should not rewrite historical facts, relax claim provenance or quietly widen action permissions because a reward signal says that doing so increases throughput.",
          "In the public OpportunityOS architecture, monitoring and learning sit downstream of the same truth and authority contracts. That ordering matters. A learning loop can propose better behavior, but deterministic truth and permission invariants remain the boundary it has to operate within.",
          "This is where governance becomes architecture rather than policy prose: the safest rule is the one a lower-level module cannot bypass by accident.",
        ],
      },
      {
        eyebrow: "07 — Design for explainable restraint",
        title: "A useful agent should be able to explain why it stopped.",
        paragraphs: [
          "A refusal to invent missing evidence is not a failure of autonomy. Neither is requiring review before a consequential external action. The system is more useful when it can distinguish 'I cannot infer this fact', 'I can prepare this action', and 'I am authorized to execute this action'.",
          "NIST's AI Risk Management Framework treats trustworthy AI as a lifecycle risk-management problem rather than a one-time model property. My practical interpretation for agentic products is to make evidence, uncertainty and authority first-class data structures. That gives the product something concrete to test when the model is persuasive but the evidence is weak.",
        ],
      },
    ],
    takeawaysTitle: "What I carry into the next system.",
    takeaways: [
      "Keep UNKNOWN distinct from FALSE; missing evidence should not become a negative fact.",
      "Bind material generated claims to explicit provenance before generation, not as a cosmetic citation step afterward.",
      "Require verified conflicts for hard rejection and let uncertainty change confidence or workflow instead.",
      "Model preparation, assisted interaction and external submission as different authority levels.",
      "Treat ambiguous side effects as an explicit state and keep learning loops downstream of deterministic truth controls.",
    ],
    sources: [
      {
        label: "OpportunityOS public product constitution",
        href: "https://github.com/m7mdehab/opportunityos-docs/blob/main/docs/PRODUCT_CONSTITUTION.md",
        kind: "first-hand",
      },
      {
        label: "OpportunityOS public architecture contract",
        href: "https://github.com/m7mdehab/opportunityos-docs/blob/main/docs/ARCHITECTURE_CURRENT.md",
        kind: "first-hand",
      },
      {
        label: "OpportunityOS public authority index",
        href: "https://github.com/m7mdehab/opportunityos-docs/blob/main/docs/AUTHORITY_INDEX.md",
        kind: "first-hand",
      },
      {
        label: "NIST AI Risk Management Framework",
        href: "https://www.nist.gov/itl/ai-risk-management-framework",
        kind: "reference",
      },
      {
        label: "NIST AI RMF Generative AI Profile",
        href: "https://doi.org/10.6028/NIST.AI.600-1",
        kind: "reference",
      },
    ],
  },
] as const;

export function isPublishedWritingArticle(
  article: WritingArticle,
): article is PublishedWritingArticle {
  return article.status === "published";
}

export const publishedWritingArticles = writingArticles.filter(isPublishedWritingArticle);

export const writingSlugs = publishedWritingArticles.map((article) => article.slug);

export function getWritingArticle(slug: string) {
  return publishedWritingArticles.find((article) => article.slug === slug);
}

export function getHomepageWriting(limit = 6) {
  return [...publishedWritingArticles]
    .filter((article) => article.homeRank !== undefined)
    .sort((left, right) => (left.homeRank ?? Infinity) - (right.homeRank ?? Infinity) || left.slug.localeCompare(right.slug))
    .slice(0, Math.max(0, Math.min(limit, 6)));
}

function slugifyWritingHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function writingSectionAnchor(section: WritingSection, index: number) {
  if (section.id?.trim()) return section.id;
  const label = section.title ?? section.eyebrow ?? `section-${index + 1}`;
  const slug = slugifyWritingHeading(label) || `section-${index + 1}`;
  return `section-${index + 1}-${slug}`;
}

export function getWritingTocEntries(article: Pick<WritingArticleBase, "sections">) {
  return article.sections.flatMap((section, index) =>
    section.title
      ? [{ id: writingSectionAnchor(section, index), label: section.title }]
      : [],
  );
}

function blockPlainText(block: WritingBlock) {
  switch (block.type) {
    case "paragraph":
      return block.text;
    case "bullets":
      return block.items.join(" ");
    case "quote":
      return [block.text, block.attribution ?? ""].join(" ");
    case "image":
      return block.caption ?? "";
    case "code":
      return "";
    case "callout":
      return [block.title ?? "", block.text].join(" ");
  }
}

export function getWritingWordCount(article: Pick<WritingArticleBase, "thesis" | "sections" | "takeaways">) {
  const body = [
    article.thesis ?? "",
    ...article.sections.flatMap((section) => [
      section.title ?? "",
      ...(section.paragraphs ?? []),
      ...(section.bullets ?? []),
      ...(section.blocks ?? []).map(blockPlainText),
    ]),
    ...(article.takeaways ?? []),
  ]
    .join(" ")
    .trim();

  return body ? body.split(/\s+/u).filter(Boolean).length : 0;
}

export function getRelatedWritingArticles(article: PublishedWritingArticle, limit = 2) {
  const articleTopics = new Set(article.topics.map((topic) => topic.toLowerCase()));

  return publishedWritingArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const sharedTopics = candidate.topics.reduce(
        (count, topic) => count + (articleTopics.has(topic.toLowerCase()) ? 1 : 0),
        0,
      );
      const score =
        (candidate.category === article.category ? 4 : 0) +
        sharedTopics * 2 +
        (candidate.series && candidate.series === article.series ? 1 : 0);
      return { candidate, score };
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        right.candidate.publishedAt.localeCompare(left.candidate.publishedAt) ||
        left.candidate.slug.localeCompare(right.candidate.slug),
    )
    .slice(0, Math.max(0, limit))
    .map(({ candidate }) => candidate);
}

export function getWritingArticleOptionalContent(article: WritingArticle) {
  return {
    thesis: article.thesis,
    evidence: article.evidence ?? [],
    takeaways: article.takeaways ?? [],
    takeawaysTitle: article.takeawaysTitle,
    sources: article.sources ?? [],
  };
}

export function assertWritingIntegrity(articles: readonly WritingArticle[] = writingArticles) {
  const slugs = new Set<string>();
  const ranks = new Set<number>();

  for (const article of articles) {
    if (slugs.has(article.slug)) throw new Error(`Duplicate Writing slug: ${article.slug}`);
    slugs.add(article.slug);

    if (article.homeRank !== undefined) {
      if (!Number.isInteger(article.homeRank) || article.homeRank < 1) {
        throw new Error(`Invalid Writing homeRank for ${article.slug}`);
      }
      if (ranks.has(article.homeRank)) throw new Error(`Duplicate Writing homeRank: ${article.homeRank}`);
      ranks.add(article.homeRank);
    }

    if (!["note", "analysis", "deep-dive", "project-reflection"].includes(article.format)) {
      throw new Error(`Writing article needs a valid format: ${article.slug}`);
    }
    if (article.status === "published" && !/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt)) {
      throw new Error(`Published Writing article needs an ISO date: ${article.slug}`);
    }
    if (article.topics.length === 0) throw new Error(`Writing article needs a topic: ${article.slug}`);
    if (!article.cover.alt.trim()) throw new Error(`Writing cover needs alt text: ${article.slug}`);
    if ((article.cardDescription?.length ?? 0) > 140) {
      throw new Error(`Writing cardDescription exceeds 140 characters: ${article.slug}`);
    }
    if (!Number.isFinite(article.readingMinutes) || article.readingMinutes <= 0) {
      throw new Error(`Writing article needs positive readingMinutes: ${article.slug}`);
    }
    if (!Number.isFinite(article.listenMinutes) || article.listenMinutes <= 0) {
      throw new Error(`Writing article needs positive listenMinutes: ${article.slug}`);
    }
    if (article.audio && (!article.audio.src.trim() || !article.audio.mimeType.trim() || !Number.isFinite(article.audio.durationSeconds) || article.audio.durationSeconds <= 0)) {
      throw new Error(`Writing audio metadata is invalid: ${article.slug}`);
    }
  }
}

export function writingArticleUrl(slug: string) {
  return `https://m7mdehab.com/writing/${slug}`;
}

export function getWritingTimingLabel(
  article: Pick<WritingArticleBase, "readingMinutes" | "listenMinutes">,
) {
  return `${article.readingMinutes} min read · ~${article.listenMinutes} min listen`;
}

export function getWritingListenDetails(
  article: Pick<WritingArticleBase, "slug" | "title" | "listenMinutes">,
) {
  return {
    sectionLabel: "Listen to this article",
    playerLabel: `Audio narration of ${article.title}`,
    listenMinutes: article.listenMinutes,
    defaultVoice: "female" as const,
    sources: getWritingNarrationSources(article),
  };
}
