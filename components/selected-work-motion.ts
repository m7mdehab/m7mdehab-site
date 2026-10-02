export type SelectedWorkLoop = {
  duration: number;
  times: number[];
  ease: ("easeInOut" | "linear")[];
  repeat: number;
  repeatType?: "loop";
  delay?: number;
};

export const SELECTED_WORK_FORWARD_PATH: number[] = [0, 1, 1, 1, 1];
export const SELECTED_WORK_FORWARD_OPACITY: number[] = [1, 1, 1, 0, 0];

/** A one-way draw, readable hold, hidden reset, and quiet interval. */
export function selectedWorkPathLoop(
  drawSeconds: number,
  holdSeconds = 2.5,
  clearSeconds = 0.08,
  quietSeconds = 1.25,
): SelectedWorkLoop {
  const duration = drawSeconds + holdSeconds + clearSeconds + quietSeconds;
  return {
    duration,
    times: [0, drawSeconds / duration, (drawSeconds + holdSeconds) / duration, (drawSeconds + holdSeconds + clearSeconds) / duration, 1],
    ease: ["easeInOut", "linear", "linear", "linear"],
    repeat: Infinity,
    repeatType: "loop",
  };
}

export function selectedWorkNodeLoop(delay = 0): SelectedWorkLoop {
  return { duration: 6.3, times: [0, 0.12, 0.24, 1], ease: ["easeInOut", "easeInOut", "linear"], repeat: Infinity, repeatType: "loop", delay };
}
