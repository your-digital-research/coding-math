import { loopRunnable } from "./utils";

export function drawCircle(game, context, parent, cell) {
  let angle = 0;
  let speedX = 175;
  let speedY = 0.1;
  let offsetY = 200;
  let baseRadius = 50;
  let baseAlpha = 1;

  loopRunnable(game, 10, () => {
    let x = angle * speedX;
    let y = context.centerY + -Math.sin(angle) * offsetY;
    // let radius = baseRadius + -Math.sin(angle) * offsetY;
    // let alpha = baseAlpha + -Math.sin(angle) * offsetY;

    parent.removeChildren();

    const gr = game.add.graphics();
    gr.beginFill(0xff00ff, 1);
    gr.drawCircle(x, y, 50);
    gr.endFill();

    angle += speedY;

    if (angle >= Math.PI * 2) {
      angle = 0;
    }

    parent.addChild(gr);
    context.addChild(parent);
  });
}

export function buildArrow(game, context, parent, cell) {
  const a = game.add.graphics(0, 0);
  a.beginFill(0x000000, 1);
  a.lineStyle(2, 0x000000, 1);
  a.drawRect(-50, 0, 100, 1);
  a.endFill();

  const b = game.add.graphics(0, 0);
  b.beginFill(0x000000, 1);
  b.lineStyle(2, 0x000000, 1);
  b.drawRect(-12.5, -38, 50, 1);
  b.endFill();
  b.angle = 45;

  const c = game.add.graphics(0, 0);
  c.beginFill(0x000000, 1);
  c.lineStyle(2, 0x000000, 1);
  c.drawRect(-12.5, 38, 50, 1);
  c.endFill();
  c.angle = -45;

  parent.addChild(a);
  parent.addChild(b);
  parent.addChild(c);

  context.setChild(cell, parent);
}

export function buildSin(game, context, parent, cell) {
  for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
    const x = angle * 200;
    const y = -Math.sin(angle) * 200;

    const gr = game.add.graphics();
    gr.beginFill(0x00ff00, 1);
    gr.drawRect(x, y, 5, 5);
    gr.endFill();

    parent.addChild(gr);
  }

  context.setChild(cell, parent);
}

export function buildCos(game, context, parent, cell) {
  for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
    const x = angle * 200;
    const y = -Math.cos(angle) * 200;

    const gr = game.add.graphics();
    gr.beginFill(0xff0000, 1);
    gr.drawRect(x, y, 5, 5);
    gr.endFill();

    parent.addChild(gr);
  }

  context.setChild(cell, parent);
}

export function buildTg(game, context, parent, cell) {
  for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
    const x = this.centerX + angle * 50;
    const y = this.centerY + -Math.tan(angle) * 50;

    const gr = game.add.graphics();
    gr.beginFill(0xff00ff, 1);
    gr.drawRect(x, y, 5, 5);
    gr.endFill();

    parent.addChild(gr);
  }

  context.setChild(cell, parent);
}

export function buildCtg(game, context, parent, cell) {
  for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
    const x = this.centerX + angle * 50;
    const y = this.centerY + (1 / -Math.tan(angle)) * 50;

    const gr = game.add.graphics();
    gr.beginFill(0x000000, 1);
    gr.drawRect(x, y, 5, 5);
    gr.endFill();

    parent.addChild(gr);
  }

  context.setChild(cell, parent);
}

export function updateAngle(game, view) {
  const dx = game.input.activePointer.x - view.x;
  const dy = game.input.activePointer.y - view.y;
  const targetAngle = (360 / (2 * Math.PI)) * Math.atan2(dy, dx);
  // const targetAngle = (360 / (2 * Math.PI)) * Math.atan(dy / dx);

  view.angle = targetAngle;
}
