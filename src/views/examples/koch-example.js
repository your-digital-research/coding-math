import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class KochExample extends Phaser2Grid {
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
    this._draw();
  }

  _init() {
    const { innerWidth, innerHeight } = window;

    this._p1 = {
      x: innerWidth / 2,
      y: innerHeight / 2 - 321
    };

    this._p2 = {
      x: innerWidth / 2 + 278,
      y: innerHeight / 2 + 160
    };

    this._p3 = {
      x: innerWidth / 2 - 278,
      y: innerHeight / 2 + 160
    };

    this._a = 0;
    this._t = null;
  }

  _build() {
    super.build(this.getGridConfig());

    // this._koch(this._p1, this._p2, 3);
    // this._koch(this._p2, this._p3, 3);
    // this._koch(this._p3, this._p1, 3);
  }

  _draw() {
    this._t = 1 / 3 + (Math.sin((this._a += 0.02)) * 1) / 6;
    this.removeChildren();

    this._koch(this._p1, this._p2, 3);
    this._koch(this._p2, this._p3, 3);
    this._koch(this._p3, this._p1, 3);
  }

  _koch(p1, p2, limit) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const unit = dist / 3;
    const angle = Math.atan2(dy, dx);

    const pA = {
      x: p1.x + dx * this._t, // / 3,
      y: p1.y + dy * this._t // / 3
    };
    const pC = {
      x: p2.x - dx * this._t, // / 3,
      y: p2.y - dy * this._t // / 3
    };
    const pB = {
      x: pA.x + Math.cos(angle - Math.PI * this._t) * unit, // Math.PI / 3
      y: pA.y + Math.sin(angle - Math.PI * this._t) * unit // Math.PI / 3
    };

    if (limit > 0) {
      this._koch(p1, pA, limit - 1);
      this._koch(pA, pB, limit - 1);
      this._koch(pB, pC, limit - 1);
      this._koch(pC, p2, limit - 1);
    } else {
      const gr = this.game.add.graphics();
      gr.lineStyle(2, 0x000000, 1);
      gr.moveTo(p1.x, p1.y);
      gr.lineTo(pA.x, pA.y);
      gr.lineTo(pB.x, pB.y);
      gr.lineTo(pC.x, pC.y);
      gr.lineTo(p2.x, p2.y);
      gr.endFill();

      this.addChild(gr);
    }
  }
}
