import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class CubeExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._init();
    this._build();

    document.body.addEventListener("keydown", this._onKeyDown.bind(this));
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
    if (this._updateNeeded) {
      this._lines.removeChildren();

      this._projectPoints();

      this._drawLine(0, 1, 2, 3, 0);
      this._drawLine(4, 5, 6, 7, 4);
      this._drawLine(0, 4);
      this._drawLine(1, 5);
      this._drawLine(2, 6);
      this._drawLine(3, 7);

      this._updateNeeded = false;
    }
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 37: // left
        this._translateModel(-20, 0, 0);
        this._buildPoints();
        break;
      case 39: // right
        this._translateModel(20, 0, 0);
        this._buildPoints();
        break;
      case 38: // up
        if (event.shiftKey) {
          this._translateModel(0, 0, 20);
        } else {
          this._translateModel(0, -20, 0);
        }
        this._buildPoints();
        break;
      case 40: // down
        if (event.shiftKey) {
          this._translateModel(0, 0, -20);
        } else {
          this._translateModel(0, 20, 0);
        }
        this._buildPoints();
        break;
      default:
        break;
    }
  }

  _translateModel(x, y, z) {
    for (var i = 0; i < this._points.length; i += 1) {
      this._points[i].x += x;
      this._points[i].y += y;
      this._points[i].z += z;
    }

    this._updateNeeded = true;
  }

  _init() {
    this._points = [
      { x: -500, y: -500, z: 1000, sx: null, sy: null },
      { x: 500, y: -500, z: 1000, sx: null, sy: null },
      { x: 500, y: -500, z: 500, sx: null, sy: null },
      { x: -500, y: -500, z: 500, sx: null, sy: null },
      { x: -500, y: 500, z: 1000, sx: null, sy: null },
      { x: 500, y: 500, z: 1000, sx: null, sy: null },
      { x: 500, y: 500, z: 500, sx: null, sy: null },
      { x: -500, y: 500, z: 500, sx: null, sy: null }
    ];

    this._pointsShapes = [];
    this._focalLength = 300;
    this._updateNeeded = true;
    this._lines = new Phaser.Group(this.game);
  }

  _projectPoints() {
    for (let i = 0; i < this._points.length; i += 1) {
      const point = this._points[i];
      const scale = this._focalLength / (this._focalLength + this._points[i].z);

      point.sx = point.x * scale;
      point.sy = point.y * scale;
    }
  }

  _drawLine() {
    let point = this._points[arguments[0]];
    const { innerWidth, innerHeight } = window;

    const gr = this.game.add.graphics();
    gr.lineStyle(1, 0x000000, 1);
    gr.moveTo(point.sx, point.sy);

    for (let i = 1; i < arguments.length; i += 1) {
      point = this._points[arguments[i]];
      gr.lineTo(point.sx, point.sy);
    }
    gr.endFill();
    gr.position.set(innerWidth / 2, innerHeight / 2);

    this._lines.addChild(gr);
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildPoints();
  }

  _buildPoints() {
    const { innerWidth, innerHeight } = window;
    this._pointsShapes = [];
    this.removeChildren();

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
