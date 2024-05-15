import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class TweenExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._init();
    this._build();

    this.game.input.onDown.add(this._onClick, this);
  }

  getGridConfig() {
    return getBasicGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
  }

  update() {
    this._tween && this._updateCirclePosition();
  }

  _updateCirclePosition() {
    const time = new Date() - this._startTime;

    if (time < this._duration) {
      const x = this._easeInOutQuad(
        time,
        this._position.x,
        this._change.x,
        this._duration
      );
      const y = this._easeInOutQuad(
        time,
        this._position.y,
        this._change.y,
        this._duration
      );

      this._circle.position.set(x, y);
    } else {
      this._circle.position.set(this._target.x, this._target.y);

      this._position.x = this._target.x;
      this._position.y = this._target.y;

      this._tween = false;
    }
  }

  _onClick() {
    if (!this._tween) {
      this._target.x = this.game.input.activePointer.x;
      this._target.y = this.game.input.activePointer.y;

      this._change.x = this._target.x - this._position.x;
      this._change.y = this._target.y - this._position.y;

      this._startTime = new Date();

      this._tween = true;
    }
  }

  _init() {
    const { innerWidth, innerHeight } = window;
    this._tween = false;
    this._startTime = null;
    this._duration = 1000;

    this._target = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };

    this._position = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };

    this._change = {
      x: 0,
      y: 0
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

  _linearTween(t, b, c, d) {
    return (c * t) / d + b;
  }

  _easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
  }

  _easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  }

  _easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  }
}
