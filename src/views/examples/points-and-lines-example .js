import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class PointsAndLinesExample extends Phaser2Grid {
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
    this._updatePoints();
  }

  _updatePoints() {
    this._baseAngle += this._rotationSpeed;

    this._lines.removeChildren();
    const gr = this.game.add.graphics();

    for (let i = 0; i < this._pointsShapes.length; i += 1) {
      const perspective =
        this._focalLength / (this._focalLength + this._points[i].z);
      const x = innerWidth / 2 + this._points[i].x * perspective;
      const y = innerHeight / 2 + this._points[i].y * perspective;

      this._pointsShapes[i].scale.set(perspective);
      this._pointsShapes[i].position.set(
        innerWidth / 2 + this._points[i].x * perspective,
        innerHeight / 2 + this._points[i].y * perspective
      );

      gr.lineStyle(1, 0x000000, 1);
      if (i === 0) {
        gr.moveTo(x, y);
      } else {
        gr.lineTo(x, y);
      }

      this._points[i].x =
        Math.cos(this._points[i].angle + this._baseAngle) * this._radius;
      this._points[i].z =
        this._centerZ +
        Math.sin(this._points[i].angle + this._baseAngle) * this._radius;
    }

    gr.endFill();
    this._lines.addChild(gr);
  }

  _init() {
    this._radius = 1000;
    this._baseAngle = 0;
    this._centerZ = 7000;
    this._points = [];
    this._focalLength = 900;
    this._rotationSpeed = 0.01;
    this._pointsShapes = [];
    this._numberOfPoints = 500;
    this._lines = new Phaser.Group(this.game);

    for (let i = 0; i < this._numberOfPoints; i += 1) {
      const point = {
        y: 3000 - (5000 / this._numberOfPoints) * i, //+ randomRange(-100, 100),
        x: null,
        z: null,
        angle: 0.2 * i
      };

      point.x = Math.cos(point.angle + this._baseAngle) * this._radius;
      point.z =
        this._centerZ + Math.sin(point.angle + this._baseAngle) * this._radius;

      // this.game.add
      //   .tween(point)
      //   .to(
      //     { y: point.y + randomRange(-200, 200) },
      //     1000,
      //     Phaser.Easing.Linear.None,
      //     true,
      //     0,
      //     -1,
      //     true
      //   );

      this._points.push(point);
    }
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildPoints();
  }

  _buildPoints() {
    const { innerWidth, innerHeight } = window;

    this._points.forEach((rectangle) => {
      const { x, y } = rectangle;
      const perspective = this._focalLength / (this._focalLength + rectangle.z);
      const gr = this.game.add.graphics();

      gr.beginFill(0x000000, 1);
      gr.drawCircle(0, 0, 20);
      gr.endFill();

      gr.scale.set(perspective);
      gr.position.set(
        innerWidth / 2 + x * perspective,
        innerHeight / 2 + y * perspective
      );

      this._pointsShapes.push(gr);

      this.addChild(gr);
    });
  }
}
