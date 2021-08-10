import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { multiCurve, randomRange } from "../../utils";

export class MultiCurvesExample extends Phaser2Grid {
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
    this._points = [];
    this._numberOfPoints = 5;

    for (let i = 0; i < this._numberOfPoints; i++) {
      const point = {
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight
      };

      this._points.push(point);
    }

    this._constantPoints = {
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

    this._buildLines();
    this._buildPoints();
    this._buildMultiCurve();

    // this._buildBezier();
  }

  _buildLines() {
    const gr = this.game.add.graphics();
    gr.lineStyle(2, 0xff0000, 1);

    for (let i = 0; i < this._points.length - 1; i += 1) {
      const currentPoint = this._points[i];
      const nextPoint = this._points[i + 1];
      gr.moveTo(currentPoint.x, currentPoint.y);
      gr.lineTo(nextPoint.x, nextPoint.y);
    }

    this.addChild(gr);
  }

  _buildPoints() {
    this._points.forEach((point) => {
      this._drawPoint(point);
    });
  }

  _buildMultiCurve() {
    const gr = this.game.add.graphics();
    gr.lineStyle(2, 0x000000, 1);
    multiCurve(this._points, gr);

    this.addChild((this._multiCurve = gr));
  }

  _buildBezier() {
    const { p1, p2, p3, p4 } = this._constantPoints;
    const points = [p1, p2, p3, p4];
    const gr = this.game.add.graphics();
    gr.lineStyle(2, 0x000000, 1);
    gr.moveTo(p1.x, p1.y);
    gr.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

    gr.lineStyle(2, 0xff0000, 1);
    multiCurve(points, gr);

    points.forEach((point) => {
      this._drawPoint(point);
    });

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
