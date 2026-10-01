export type SelectedWorkLoop = {
  duration: number;
  times: number[];
  ease: ("easeInOut" | "linear")[];
  repeat: number;
  delay?: number;
};

/** A slow draw, readable hold, graceful clear, and quiet interval. */
export function selectedWorkPathLoop(
  drawSeconds: number,
  holdSeconds = 2.5,
  clearSeconds = 0.65,
  quietSeconds = 1.25,
): SelectedWorkLoop {
  const duration = drawSeconds + holdSeconds + clearSeconds + quietSeconds;
  return {
    duration,
    times: [0, drawSeconds / duration, (drawSeconds + holdSeconds) / duration, (duration - clearSeconds) / duration, 1],
    ease: ["easeInOut", "linear", "linear", "easeInOut"],
    repeat: Infinity,
  };
}

export function selectedWorkNodeLoop(delay = 0): SelectedWorkLoop {
  return { duration: 6.3, times: [0, 0.12, 0.24, 1], ease: ["easeInOut", "easeInOut", "linear"], repeat: Infinity, delay };
}
