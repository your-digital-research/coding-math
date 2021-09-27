import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class SierpinskiExample extends Phaser2Grid {
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
      x: 0,
      y: -321
    };

    this._p2 = {
      x: 278,
      y: 160
    };

    this._p3 = {
      x: -278,
      y: 160
    };

    this._a = 0;
    this._b = 0;
    this._r = 0;
    this._tx = null;
    this._ty = null;
    this._area = new Phaser.Group(this.game);
  }

  _setBounds() {
    this._area.getBounds = () => {
      return new Phaser.Rectangle(-375, -375, 750, 750);
    };

    this.setChild("cell", this._area);
  }

  _drawBounds() {
    const { x, y, width, height } = this._area.getBounds();

    this._bounds = this.game.add.graphics();
    this._bounds.beginFill(0xff0000, 0);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    this._drawBounds();

    // this._sierpinski(this._p1, this._p2, this._p3, 5);
  }

  _draw() {
    this._area.removeChildren();
    this._area.rotation = this._r += 0.01;
    this._a >= Math.PI && (this._a = 0);
    this._b >= Math.PI && (this._b = 0);
    this._tx = 0.5 * Math.sin((this._a += 0.05)) * 1;
    this._ty = 0.5 * Math.sin((this._b += 0.05)) * 1;

    this._sierpinski(this._p1, this._p2, this._p3, 4);
  }

  _sierpinski(p1, p2, p3, limit) {
    if (limit > 0) {
      const pA = {
        x: p1.x + (p2.x - p1.x) * this._tx,
        y: p1.y + (p2.y - p1.y) * this._ty
      };
      const pB = {
        x: p2.x + (p3.x - p2.x) * this._tx,
        y: p2.y + (p3.y - p2.y) * this._ty
      };
      const pC = {
        x: p3.x + (p1.x - p3.x) * this._tx,
        y: p3.y + (p1.y - p3.y) * this._ty
      };

      this._sierpinski(p1, pA, pC, limit - 1);
      this._sierpinski(pA, p2, pB, limit - 1);
      this._sierpinski(pC, pB, p3, limit - 1);
    } else {
      this._drawTriangle(p1, p2, p3);
    }
  }

  _drawTriangle(p1, p2, p3) {
    const gr = this.game.add.graphics();
    gr.beginFill(0x000000, 1);
    gr.moveTo(p1.x, p1.y);
    gr.lineTo(p2.x, p2.y);
    gr.lineTo(p3.x, p3.y);
    gr.endFill();

    this._area.addChild(gr);
  }
}
