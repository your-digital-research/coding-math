import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class EasingExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._init();
    this._build();

    this.game.input.onDown.add(() => (this._easing = true));
  }

  getGridConfig() {
    return getBasicGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
  }

  update() {
    this._easing && this._updateCirclePosition();
  }

  _updateCirclePosition() {
    const { x, y } = this.game.input.activePointer;
    this._target.x = x;
    this._target.y = y;

    this._easing = this._easeTo(this._position, this._target, this._ease);

    const { x: newX, y: newY } = this._position;

    this._circle.position.set(newX, newY);
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
    this._easing = true;

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
