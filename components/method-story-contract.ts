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
  desktopScrollOffset: ["start 90%", "center 68%"] as const,
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
    "M196 50 C248 50 292 96 340 117",
    "M268 117 C300 117 326 124 355 133",
    "M190 189 C257 189 312 164 370 149",
    "M260 256 C306 256 344 199 385 165",
  ],
  exposeToReduce: [
    "M540 104 C572 104 596 150 625 180",
    "M548 124 C577 124 599 156 625 180",
    "M555 144 C583 144 602 162 625 180",
    "M560 164 C586 164 604 169 625 180",
    "M560 184 C586 184 604 181 625 180",
    "M552 204 C580 204 600 192 625 180",
    "M544 224 C575 224 597 198 625 180",
  ],
  reduceConvergedToDecision: "M630 180 C641 180 650 180 660 180",
  reduceToBuild: "M750 180 C806 180 864 180 918 180",
  buildToOutputs: [
    "M1046 148 C1080 148 1092 88 1120 88",
    "M1046 166 C1082 166 1094 138 1120 138",
    "M1046 184 C1084 184 1096 188 1120 188",
    "M1046 202 C1082 202 1094 238 1120 238",
    "M1046 220 C1080 220 1092 288 1120 288",
  ],
} as const;

export const METHOD_STORY_VISUAL_LIMITS = {
  maxConnectorPaths: 40,
  maxDecorativeSvgNodes: 220,
  desktop: { minWidth: 1100, minHeight: 410, maxHeight: 470 },
  tablet: { minWidth: 720, maxWidth: 1099 },
  mobile: { maxWidth: 719 },
} as const;
