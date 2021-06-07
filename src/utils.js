export function LP(l, p) {
  return window.innerWidth > window.innerHeight ? l : p;
}

export const loopRunnable = (game, delay, runnable, context, ...args) => {
  return game.time.events.loop(delay, runnable, context, ...args);
};

export const norm = (value, min, max) => {
  return (value - min) / (max - min);
};

export const lerp = (norm, min, max) => {
  return (max - min) * norm + min;
};

export const map = (value, sourceMin, sourceMax, destMin, destMax) => {
  return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};
