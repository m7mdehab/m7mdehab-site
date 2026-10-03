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
    "M222 50 C266 50 304 96 340 117",
    "M300 117 C318 117 337 124 355 133",
    "M216 189 C270 189 320 164 370 149",
    "M289 256 C320 256 352 199 385 165",
  ],
  exposeToReduce: [
    "M459 165 C520 165 575 132 625 120",
    "M476 149 C530 149 578 128 625 120",
    "M492 133 C540 133 583 124 625 120",
    "M509 117 C548 117 587 119 625 120",
    "M526 101 C558 101 592 112 625 120",
    "M510 78 C550 78 590 105 625 120",
    "M520 108 C557 108 592 115 625 120",
  ],
  reduceConvergedToDecision: "M630 120 C641 120 650 120 660 120",
  reduceToBuild: "M750 120 C806 120 860 120 910 120",
  buildToOutputs: [
    "M1055 92 C1090 92 1104 47 1133 47",
    "M1055 122 C1090 122 1104 101 1133 101",
    "M1055 152 C1090 152 1104 155 1133 155",
    "M1055 182 C1090 182 1104 209 1133 209",
    "M1055 212 C1090 212 1104 263 1133 263",
  ],
} as const;

export const METHOD_STORY_VISUAL_LIMITS = {
  maxConnectorPaths: 40,
  maxDecorativeSvgNodes: 220,
  desktop: { minWidth: 1100, minHeight: 410, maxHeight: 470 },
  tablet: { minWidth: 720, maxWidth: 1099 },
  mobile: { maxWidth: 719 },
} as const;
