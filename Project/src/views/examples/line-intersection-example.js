import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { circlePointCollision, randomRange } from "../../utils";

export class LineIntersectionExample extends Phaser2Grid {
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
        x: randomRange(0, innerWidth),
        y: randomRange(0, innerHeight),
        radius: 30
      },
      p2: {
        x: randomRange(0, innerWidth),
        y: randomRange(0, innerHeight),
        radius: 30
      },
      p3: {
        x: randomRange(0, innerWidth),
        y: randomRange(0, innerHeight),
        radius: 30
      },
      p4: {
        x: randomRange(0, innerWidth),
        y: randomRange(0, innerHeight),
        radius: 30
      }
    };

    const { p1, p2, p3, p4 } = this._points;
    this._lines = [];
    this._pointsShapes = [];
    this._isDragging = false;
    this._intersectionPoint = null;
    this._offset = { x: 0, y: 0 };
    this._dragHandle = { x: 0, y: 0 };
    this._handles = [p1, p2, p3, p4];
  }

  _build() {
    super.build(this.getGridConfig());

    this._draw();
  }

  _buildPoints() {
    const { p1, p2, p3, p4 } = this._points;
    const arr = [p1, p2, p3, p4];
    const gr = this.game.add.graphics();

    gr.beginFill(0xababab, 1);
    arr.forEach((point) => {
      const { x, y, radius } = point;
      gr.drawCircle(x, y, radius);
    });

    gr.endFill();
    this._pointsShapes.push(gr);

    this.addChild(gr);
  }

  _buildLines() {
    const { p1, p2, p3, p4 } = this._points;
    const gr = this.game.add.graphics();

    gr.lineStyle(2, 0x000000, 1);
    gr.moveTo(p1.x, p1.y);
    gr.lineTo(p2.x, p2.y);
    gr.moveTo(p3.x, p3.y);
    gr.lineTo(p4.x, p4.y);
    gr.endFill();

    this._lines.push(gr);

    this.addChild(gr);
  }

  _intersect() {
    const { p1, p2, p3, p4 } = this._points;
    const intersectionPoint = this._segmentIntersect(p1, p2, p3, p4);
    if (intersectionPoint) {
      const { x, y } = intersectionPoint;

      const gr = this.game.add.graphics();

      gr.beginFill(0x000000, 1);
      gr.drawCircle(0, 0, 50);
      gr.endFill();

      gr.position.set(x, y);

      this.addChild((this._intersectionPoint = gr));
    }
  }

  _draw() {
    this._pointsShapes.forEach((shape) => {
      this.removeChild(shape);
      this._pointsShapes.pop();
    });

    this._lines.forEach((line) => {
      this.removeChild(line);
      this._lines.pop();
    });

    this.removeChild(this._intersectionPoint);

    this._buildPoints();
    this._buildLines();
    this._intersect();
  }

  _lineIntersect(p1, p2, p3, p4) {
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

    return {
      x: (B2 * C1 - B1 * C2) / denominator,
      y: (A1 * C2 - A2 * C1) / denominator
    };
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
