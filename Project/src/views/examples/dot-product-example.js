import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { circlePointCollision } from "../../utils";

export class DotProductExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._init();
    this._build();

    this.game.input.onDown.add(this._onDown, this);
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
        x: 500,
        y: 500,
        radius: 30,
        centerPoint: false
      },
      p2: {
        x: 500,
        y: 1000,
        radius: 30,
        centerPoint: true
      },
      p3: {
        x: 1000,
        y: 1000,
        radius: 30,
        centerPoint: false
      }
    };
    const { p1, p2, p3 } = this._points;
    this._pointsShapes = [];
    this._lines = [];
    this._handles = [p1, p2, p3];
    this._offset = { x: 0, y: 0 };
    this._isDragging = false;
    this._dragHandle = { x: 0, y: 0 };
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildPoints();
    this._buildLines();
    this._getDotProduct();
  }

  _createVector(p1, p2) {
    return {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    };
  }

  _normalizeVector(vector) {
    const magnitude = this._getMagnitude(vector);
    return {
      x: vector.x / magnitude,
      y: vector.y / magnitude
    };
  }

  _dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  _getAngleBetween(v1, v2) {
    const dotProduct = this._dotProduct(v1, v2);
    const magnitudeV1 = this._getMagnitude(v1);
    const magnitudeV2 = this._getMagnitude(v2);

    return Math.acos(dotProduct / magnitudeV1 / magnitudeV2);
  }

  _getMagnitude(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  }

  _getDotProduct() {
    const { p1, p2, p3 } = this._points;
    const firstVector = this._normalizeVector(this._createVector(p1, p2));
    const secondVector = this._normalizeVector(this._createVector(p3, p2));
    const dotProduct = this._dotProduct(firstVector, secondVector);
    const angleBetween =
      (this._getAngleBetween(firstVector, secondVector) * 180) / Math.PI;

    window.console.clear();
    console.log("Dot product : ", dotProduct);
    console.log("Angle between : ", angleBetween);
  }

  _buildPoints() {
    const { p1, p2, p3 } = this._points;
    const arr = [p1, p2, p3];
    const gr = this.game.add.graphics();

    arr.forEach((point) => {
      const { centerPoint } = point;
      centerPoint ? gr.beginFill(0x000000, 1) : gr.beginFill(0xababab, 1);
      const { x, y, radius } = point;
      gr.drawCircle(x, y, radius);
    });

    gr.endFill();
    this._pointsShapes.push(gr);

    this.addChild(gr);
  }

  _buildLines() {
    const { p1, p2, p3 } = this._points;

    const gr = this.game.add.graphics();
    gr.lineStyle(2, 0x000000, 1);
    gr.moveTo(p1.x, p1.y);
    gr.lineTo(p2.x, p2.y);
    gr.lineTo(p3.x, p3.y);
    gr.endFill();

    this._lines.push(gr);

    this.addChild(gr);
  }

  _draw() {
    this._pointsShapes.forEach((shape) => {
      this.removeChild(shape);
      this._pointsShapes.pop();
    });

    this._lines.forEach((line) => {
      this.removeChild(line);
    });

    this._buildPoints();
    this._buildLines();
    this._getDotProduct();
  }

  _onDown() {
    this.game.input.addMoveCallback(this._onMove, this);
    this.game.input.onUp.add(this._onUp, this);

    for (let i = 0; i < this._handles.length; i++) {
      const handle = this._handles[i];

      if (
        circlePointCollision(
          this.game.input.activePointer.x,
          this.game.input.activePointer.y,
          handle
        )
      ) {
        this._isDragging = true;
        this._dragHandle = handle;
        this._offset.x = this.game.input.activePointer.x - handle.x;
        this._offset.y = this.game.input.activePointer.y - handle.y;
        this._draw();
      }
    }
  }

  _onMove() {
    this._dragHandle.x = this.game.input.activePointer.x - this._offset.x;
    this._dragHandle.y = this.game.input.activePointer.y - this._offset.y;

    this._draw();
  }

  _onUp() {
    this.game.input.deleteMoveCallback(this._onMove, this);
    this.game.input.onUp.remove(this._onUp, this);

    this._isDragging = false;

    this._draw();
  }
}
