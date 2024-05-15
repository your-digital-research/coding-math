import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class MouseTrailsExample extends Phaser2Grid {
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
    this._updateCirclePosition();
  }

  _updateCirclePosition() {
    const { x, y } = this.game.input.activePointer;
    this._target.x = x;
    this._target.y = y;

    let leader = {
      x: this._target.x,
      y: this._target.y
    };

    this._points.forEach((point, index) => {
      point.x += (leader.x - point.x) * this._ease;
      point.y += (leader.y - point.y) * this._ease;

      this._circles[index].position.set(point.x, point.y);

      leader.x = point.x;
      leader.y = point.y;
    });
  }

  _easeTo(position, target, ease) {
    const dx = target.x - position.x;
    const dy = target.y - position.y;

    position.x += dx * ease;
    position.y += dy * ease;

    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
      position.x = target.x;
      position.y = target.y;

      return false;
    }

    return true;
  }

  _init() {
    const { innerWidth, innerHeight } = window;
    this._ease = 0.1;
    this._points = [];
    this._circles = [];
    this._numberOfPoints = 50;

    this._target = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };

    this._position = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };

    for (let i = 0; i < this._numberOfPoints; i += 1) {
      this._points.push({
        x: 0,
        y: 0
      });
    }
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildCircle();
  }

  _buildCircle() {
    this._points.forEach((point) => {
      const gr = this.game.add.graphics();
      gr.beginFill(0x000000, 1);
      gr.drawCircle(0, 0, 20);
      gr.endFill();

      gr.position.set(point.x, point.y);

      this._circles.push(gr);
      this.addChild(gr);
    });
  }
}
