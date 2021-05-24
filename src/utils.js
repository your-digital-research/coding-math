export function LP(l, p) {
  return window.innerWidth > window.innerHeight ? l : p;
}

export const loopRunnable = (game, delay, runnable, context, ...args) => {
  return game.time.events.loop(delay, runnable, context, ...args);
};

export const norm = (value, min, max) => {
  return (value - min) / (max - min);
};
