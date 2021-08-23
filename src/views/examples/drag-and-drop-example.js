import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { circlePointCollision, randomRange } from "../../utils";

export class DragAndDropExample extends Phaser2Grid {
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
    this._pointsShapes = [];
    this._handles = [p1, p2, p3, p4];
    this._offset = { x: 0, y: 0 };
    this._isDragging = false;
    this._dragHandle = { x: 0, y: 0 };
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildPoints();
    this._buildBezier();
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

  _buildBezier() {
    const { p1, p2, p3, p4 } = this._points;
    const gr = this.game.add.graphics();
    gr.lineStyle(2, 0x000000, 1);
    gr.moveTo(p1.x, p1.y);
    gr.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

    this.addChild((this._bezier = gr));
  }

  _draw() {
    this._pointsShapes.forEach((shape) => {
      this.removeChild(shape);
      this._pointsShapes.pop();
    });

    this.removeChild(this._bezier);

    this._buildPoints();
    this._buildBezier();
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
