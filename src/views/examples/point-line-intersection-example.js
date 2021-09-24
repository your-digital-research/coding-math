import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class PointLineIntersectionExample extends Phaser2Grid {
  constructor(game) {
    super(game);
    this._init();
    this._build();
  }

  getGridConfig() {
    return getBasicGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
  }

  update() {
    this._updateParticle();
  }

  _updateParticle() {
    const p1 = {
      x: this._particle.x,
      y: this._particle.y
    };

    this._particle.x += this._particle.vx;
    this._particle.y += this._particle.vy;

    const p2 = {
      x: this._particle.x,
      y: this._particle.y
    };

    this._particleShape.position.set(this._particle.x, this._particle.y);

    for (let i = 0; i < this._linesCount; i += 1) {
      const p3 = this._lines[i].p1;
      const p4 = this._lines[i].p2;

      const intersect = this._segmentIntersect(p1, p2, p3, p4);

      if (intersect) {
        const { x, y } = intersect;
        this._buildCircle(x, y);
      }
    }
  }

  _init() {
    const { innerWidth, innerHeight } = window;
    this._particle = {
      x: innerWidth / 2,
      y: innerHeight / 2,
      vx: Math.random() * 10 - 5,
      vy: Math.random() * 10 - 5
    };

    this._lines = [];
    this._linesCount = 10;

    for (let i = 0; i < this._linesCount; i += 1) {
      const line = {
        p1: {
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight
        },
        p2: {
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight
        }
      };

      this._lines.push(line);
    }
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildLines();
    this._buildParticle();
  }

  _buildLines() {
    const gr = this.game.add.graphics();
    gr.lineStyle(2, 0x000000, 1);
    for (let i = 0; i < this._linesCount; i += 1) {
      gr.moveTo(this._lines[i].p1.x, this._lines[i].p1.y);
      gr.lineTo(this._lines[i].p2.x, this._lines[i].p2.y);
    }
    gr.endFill();

    this.addChild(gr);
  }

  _buildParticle() {
    const gr = this.game.add.graphics();
    gr.beginFill(0x000000, 1);
    gr.drawCircle(0, 0, 10);
    gr.endFill();

    gr.position.set(this._particle.x, this._particle.y);

    this.addChild((this._particleShape = gr));
  }

  _buildCircle(x, y) {
    const gr = this.game.add.graphics();
    gr.beginFill(0xff0000, 1);
    gr.drawCircle(0, 0, 20);
    gr.endFill();

    gr.position.set(x, y);

    this.addChild(gr);
  }

  _segmentIntersect(p1, p2, p3, p4) {
    const A1 = p2.y - p1.y;
    const B1 = p1.x - p2.x;
    const C1 = A1 * p1.x + B1 * p1.y;

    const A2 = p4.y - p3.y;
    const B2 = p3.x - p4.x;
    const C2 = A2 * p3.x + B2 * p3.y;

    const denominator = A1 * B2 - A2 * B1;

    if (denominator === 0) {
      return null;
    }

    const intersectX = (B2 * C1 - B1 * C2) / denominator;
    const intersectY = (A1 * C2 - A2 * C1) / denominator;
    const rx1 = (intersectX - p1.x) / (p2.x - p1.x);
    const ry1 = (intersectY - p1.y) / (p2.y - p1.y);
    const rx2 = (intersectX - p3.x) / (p4.x - p3.x);
    const ry2 = (intersectY - p3.y) / (p4.y - p3.y);

    if (
      ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1)) &&
      ((rx2 >= 0 && rx2 <= 1) || (ry2 >= 0 && ry2 <= 1))
    ) {
      return {
        x: intersectX,
        y: intersectY
      };
    } else {
      return null;
    }
  }
}
