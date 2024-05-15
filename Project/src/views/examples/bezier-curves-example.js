import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { cubicBezier, randomRange } from "../../utils";

export class BezierCurvesExample extends Phaser2Grid {
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
    this._updateBall();
  }

  _updateBall() {
    const { p1, p2, p3, p4 } = this._points;
    const finalPosition = cubicBezier(p1, p2, p3, p4, this._t, this._pFinal);
    const { x, y } = finalPosition;
    this._ball.position.set(x, y);

    this._t += this._direction;
    if (this._t > 1 || this._t < 0) {
      this._direction = -this._direction;
    }
  }

  _init() {
    this._t = 0;
    this._pFinal = {};
    this._direction = 0.01;

    const { innerWidth, innerHeight } = window;
    this._points = {
      p1: {
        x: randomRange(0, innerWidth),
        y: randomRange(0, innerHeight)
      },
      p2: {
        x: randomRange(0, innerWidth),
        y: randomRange(0, innerHeight)
      },
      p3: {
        x: randomRange(0, innerWidth),
        y: randomRange(0, innerHeight)
      },
      p4: {
        x: randomRange(0, innerWidth),
        y: randomRange(0, innerHeight)
      }
    };
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildPoints();
    this._buildBezier();
    this._buildBall();
  }

  _buildPoints() {
    const { p1, p2, p3, p4 } = this._points;
    const arr = [p1, p2, p3, p4];
    const gr = this.game.add.graphics();

    gr.beginFill(0xff0000, 1);
    arr.forEach((point) => {
      const { x, y } = point;
      gr.drawCircle(x, y, 10);
    });

    gr.endFill();

    this.addChild(gr);
  }

  _buildBezier() {
    const { p1, p2, p3, p4 } = this._points;
    const gr = this.game.add.graphics();
    gr.lineStyle(2, 0x000000, 1);
    gr.moveTo(p1.x, p1.y);
    gr.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

    this.addChild((this._bezier = gr));
  }

  _buildBall() {
    const gr = this.game.add.graphics();
    gr.beginFill(0x000000, 1);
    gr.drawCircle(0, 0, 30);
    gr.endFill();

    this.addChild((this._ball = gr));
  }
}
