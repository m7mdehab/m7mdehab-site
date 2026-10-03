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
    "M248 145 C286 145 318 156 352 174",
    "M276 205 C307 205 330 205 362 205",
    "M240 267 C286 267 326 250 372 236",
    "M270 326 C306 318 344 286 382 266",
  ],
  exposeToReduce: [
    "M520 158 C584 158 624 188 704 214",
    "M532 177 C590 177 632 194 704 214",
    "M540 196 C600 196 640 202 704 214",
    "M540 220 C600 220 640 220 704 214",
    "M532 244 C590 244 632 232 704 214",
    "M520 264 C584 264 624 238 704 214",
  ],
  reduceBranches: [],
  reduceToBuild: "M758 214 C818 214 866 214 930 214",
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
