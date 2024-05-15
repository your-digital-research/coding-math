import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { randomRange } from "../../utils";

export class BezierCurvesExtendedExample extends Phaser2Grid {
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
    //
  }

  _init() {
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

    const { p1, p2, p3 } = this._points;
    this._controlPoint = {
      x: p2.x * 2 - (p1.x + p3.x) / 2,
      y: p2.y * 2 - (p1.y + p3.y) / 2
    };
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildLines();
    this._buildPoints();
    this._buildBezier();
  }

  _buildLines() {
    const { p1, p3 } = this._points;
    const { x: cpX, y: cpY } = this._controlPoint;

    const gr = this.game.add.graphics();
    gr.lineStyle(2, 0xff0000, 1);
    gr.moveTo(p1.x, p1.y);
    gr.lineTo(cpX, cpY);
    gr.lineTo(p3.x, p3.y);
    gr.endFill();

    this.addChild(gr);
  }

  _buildPoints() {
    const { p1, p2, p3 } = this._points;
    const points = [p1, p2, p3, this._controlPoint];

    points.forEach((point) => {
      this._drawPoint(point);
    });
  }

  _buildBezier() {
    const { p1, p3 } = this._points;
    const { x: cpX, y: cpY } = this._controlPoint;

    const gr = this.game.add.graphics();
    gr.lineStyle(2, 0x000000, 1);
    gr.moveTo(p1.x, p1.y);
    gr.quadraticCurveTo(cpX, cpY, p3.x, p3.y);

    this.addChild((this._bezier = gr));
  }

  _drawPoint(point) {
    const { x, y } = point;

    const gr = this.game.add.graphics();
    gr.beginFill(0x000000, 1);
    gr.drawCircle(0, 0, 10);
    gr.endFill();
    gr.position.set(x, y);

    this.addChild(gr);
  }
}
