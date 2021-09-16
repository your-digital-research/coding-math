import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class EasingExample extends Phaser2Grid {
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

    const dx = this._target.x - this._position.x;
    const dy = this._target.y - this._position.y;
    const vx = dx * this._ease;
    const vy = dy * this._ease;

    this._position.x += vx;
    this._position.y += vy;

    const { x: newX, y: newY } = this._position;

    this._circle.position.set(newX, newY);
  }

  _init() {
    const { innerWidth, innerHeight } = window;
    this._ease = 0.1;

    this._target = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };

    this._position = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildCircle();
  }

  _buildCircle() {
    const { x, y } = this._target;
    const gr = this.game.add.graphics();
    gr.beginFill(0x000000, 1);
    gr.drawCircle(0, 0, 50);
    gr.endFill();

    gr.position.set(x, y);

    this.addChild((this._circle = gr));
  }
}
