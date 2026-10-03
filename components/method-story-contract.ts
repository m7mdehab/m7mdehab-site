export const METHOD_STORY = {
  eyebrow: "APPROACH",
  headline: "I turn messy reality into reliable systems.",
  support:
    "I make unclear problems legible, reduce ambiguity, then build the smallest system that can carry the job.",
  stages: [
    {
      id: "messy",
      index: "01",
      title: "Messy reality",
      detail: "Fragmented, inconsistent and unclear.",
    },
    {
      id: "expose",
      index: "02",
      title: "Expose the truth",
      detail: "Surface evidence, constraints and unknowns.",
    },
    {
      id: "reduce",
      index: "03",
      title: "Reduce ambiguity",
      detail: "Turn fuzzy questions into explicit mappings and decisions.",
    },
    {
      id: "build",
      index: "04",
      title: "Build the system",
      detail: "Create the smallest reliable system that works in practice.",
    },
    {
      id: "outcomes",
      index: "05",
      title: "Reliable outcomes",
      detail: "Validated, usable and ready for real use.",
    },
  ],
  inputs: [
    { id: "fragmented", label: "Fragmented data", icon: "database" },
    { id: "conflicting", label: "Conflicting definitions", icon: "conflict" },
    { id: "missing", label: "Missing context", icon: "document" },
    { id: "incomplete", label: "Incomplete evidence", icon: "unknown" },
  ],
  exposeTags: [
    { id: "evidence", label: "Evidence", tone: "mint" },
    { id: "constraints", label: "Constraints", tone: "teal" },
    { id: "unknowns", label: "Unknowns", tone: "amber" },
  ],
  outputs: [
    { id: "migration", label: "Validated migration", icon: "database" },
    { id: "analytics", label: "Decision-ready analytics", icon: "analytics" },
    { id: "model", label: "Evaluated model", icon: "model" },
    { id: "ai", label: "Governed AI workflow", icon: "network" },
    { id: "product", label: "Usable product", icon: "cube" },
  ],
  status: "DECISION-READY",
  cta: { label: "Inspect the evidence", href: "/work" },
} as const;

export const METHOD_STORY_VIEWBOX = {
  width: 1500,
  height: 410,
  zones: {
    input: [0, 270],
    expose: [300, 575],
    reduce: [610, 865],
    build: [900, 1130],
    outcomes: [1160, 1500],
  },
} as const;

export const METHOD_STORY_MOTION = {
  scrollOffset: ["start 78%", "end 28%"] as const,
  desktopScrollOffset: ["start 86%", "start 42%"] as const,
  spring: { stiffness: 115, damping: 28, mass: 0.35 },
  ranges: {
    messy: [0, 0.18],
    expose: [0.16, 0.38],
    reduce: [0.34, 0.6],
    build: [0.56, 0.8],
    outcomes: [0.76, 1],
  },
  outputStagger: 0.08,
} as const;

export const METHOD_STORY_INPUT_LAYOUT = [
  { id: "fragmented", x: 14, y: 74, width: 190, height: 48, rotate: -4 },
  { id: "conflicting", x: 74, y: 136, width: 210, height: 54, rotate: 5 },
  { id: "missing", x: 8, y: 210, width: 190, height: 48, rotate: 2 },
  { id: "incomplete", x: 92, y: 272, width: 190, height: 52, rotate: -5 },
] as const;

export const METHOD_STORY_CONNECTORS = {
  inputToExpose: [
    "M190 63 C248 63 286 82 330 96",
    "M270 147 C296 147 316 139 342 132",
    "M190 238 C252 238 294 194 354 166",
    "M263 322 C294 304 326 234 366 202",
  ],
  exposeToReduce: [
    "M536 80 C586 80 610 128 662 154",
    "M542 102 C590 102 616 136 662 154",
    "M548 124 C596 124 620 143 662 154",
    "M548 146 C596 146 622 150 662 154",
    "M544 168 C594 168 618 161 662 154",
    "M536 190 C586 190 612 172 662 154",
  ],
  reduceBranches: [
    "M640 174 C690 174 710 205 748 205",
    "M640 190 C690 190 710 205 748 205",
    "M640 206 C690 206 710 205 748 205",
    "M640 222 C690 222 710 205 748 205",
    "M640 238 C690 238 710 205 748 205",
    "M640 254 C690 254 710 205 748 205",
  ],
  reduceToBuild: "M840 205 C885 205 900 205 932 205",
  buildToOutputs: [
    "M1110 170 C1144 170 1156 92 1190 92",
    "M1110 188 C1145 188 1156 142 1190 142",
    "M1110 206 C1146 206 1157 192 1190 192",
    "M1110 224 C1146 224 1157 242 1190 242",
    "M1110 242 C1145 242 1156 292 1190 292",
  ],
} as const;

export const METHOD_STORY_VISUAL_LIMITS = {
  maxConnectorPaths: 40,
  maxDecorativeSvgNodes: 220,
  desktop: { minWidth: 1100, minHeight: 410, maxHeight: 470 },
  tablet: { minWidth: 720, maxWidth: 1099 },
  mobile: { maxWidth: 719 },
} as const;


export const METHOD_STORY_DESKTOP_PASS_02 = {
  breakpoint: 1100,
  connectorCounts: {
    inputToExpose: 4,
    exposeToReduce: 12,
    reduceToBuild: 1,
    buildToOutcomes: 5,
  },
  edgeTouchTolerancePx: 2,
  centerAlignmentTolerancePx: 10,
  intro: {
    showEyebrow: false,
    titleSingleLine: true,
    supportSingleLine: true,
  },
  stageIntent: [
    "distinct",
    "connected",
    "precision-anchored",
    "desktop-only",
  ],
} as const;
