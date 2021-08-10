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
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
};

export const distance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;

  return Math.sqrt(dx * dx + dy * dy);
};

export const circleCollision = (x1, y1, r1, x2, y2, r2) => {
  return distance(x1, y1, x2, y2) <= r1 + r2;
};

export const circlePointCollision = (x, y, circle) => {
  const { x: circleX, y: circleY, radius } = circle;
  return distance(x, y, circleX, circleY) < radius;
};

export const pointInRectangle = (x, y, rectangle) => {
  const { x: rectX, y: rectY, width, height } = rectangle;
  return inRange(x, rectX, rectX + width) && inRange(y, rectY, rectY + height);
};

export const inRange = (value, min, max) => {
  return value >= Math.min(min, max) && value <= Math.max(min, max);
};

export const rangeIntersect = (min1, max1, min2, max2) => {
  return (
    Math.max(min1, max1) >= Math.min(min2, max2) &&
    Math.min(min1, max1) <= Math.max(min2, max2)
  );
};

export const rectangleIntersect = (rectangle1, rectangle2) => {
  const { x: x1, y: y1, width: w1, height: h1 } = rectangle1;
  const { x: x2, y: y2, width: w2, height: h2 } = rectangle2;

  return (
    rangeIntersect(x1, x1 + w1, x2, x2 + w2) &&
    rangeIntersect(y1, y1 + h1, y2, y2 + h2)
  );
};

export const randomRange = (min, max) => {
  return min + Math.random() * (max - min);
};

export const randomInt = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const degreesToRadians = (degrees) => {
  return (degrees / 180) * Math.PI;
};

export const radiansToDegrees = (radians) => {
  return (radians * 180) / Math.PI;
};

export const roundToPlaces = (value, places) => {
  const power = Math.pow(10, places);
  return Math.round(value * power) / power;
};

export const roundToNearest = (value, nearest) => {
  return Math.round(value / nearest) * nearest;
};

export const randomDist = (min, max, iterations) => {
  let total = 0;

  for (let i = 0; i < iterations; i++) {
    total += randomRange(min, max);
  }

  return Math.floor(total / iterations);
};

export const quadraticBezier = (p1, p2, p3, t, pFinal) => {
  const final = pFinal || {};

  final.x = Math.pow(1 - t, 2) * p1.x + (1 - t) * 2 * t * p2.x + t * t * p3.x;
  final.y = Math.pow(1 - t, 2) * p1.y + (1 - t) * 2 * t * p2.y + t * t * p3.y;

  return final;
};

export const cubicBezier = (p1, p2, p3, p4, t, pFinal) => {
  const final = pFinal || {};

  final.x =
    Math.pow(1 - t, 3) * p1.x +
    Math.pow(1 - t, 2) * 3 * t * p2.x +
    (1 - t) * 3 * t * t * p3.x +
    t * t * t * p4.x;
  final.y =
    Math.pow(1 - t, 3) * p1.y +
    Math.pow(1 - t, 2) * 3 * t * p2.y +
    (1 - t) * 3 * t * t * p3.y +
    t * t * t * p4.y;

  return final;
};

export const multiCurve = (points, context) => {
  let p1, p2, midX, midY;

  context.moveTo(points[0].x, points[0].y);

  for (var i = 1; i < points.length - 2; i += 1) {
    p1 = points[i];
    p2 = points[i + 1];

    midX = (p1.x + p2.x) / 2;
    midY = (p1.y + p2.y) / 2;

    context.quadraticCurveTo(p1.x, p1.y, midX, midY);
  }

  p1 = points[points.length - 2];
  p2 = points[points.length - 1];

  context.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
};
