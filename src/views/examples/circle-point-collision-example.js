import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { circlePointCollision } from "../../utils";

export class CirclePointCollisionExample extends Phaser2Grid {
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
    this._updateCollision();
  }

  _setBounds() {
    this._area.getBounds = () => {
      return new Phaser.Rectangle(-500, -375, 1000, 750);
    };
  }

  _drawBounds() {
    const { x, y, width, height } = this._area.getBounds();

    this._bounds = this.game.add.graphics();
    this._bounds.beginFill(0xff0000, 0.4);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _init() {
    const { innerWidth, innerHeight } = window;

    this._c = {
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      radius: 50 + Math.random() * 100
    };

    this.game.input.maxPointers = 1;
    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    // this._drawBounds();

    this._buildCircle();
  }

  _buildCircle(color = 0xfff000) {
    const { x, y, radius } = this._c;
    this._circle = this.game.add.graphics();
    this._circle.beginFill(color, 1);
    this._circle.drawCircle(0, 0, radius * 2);
    this._circle.endFill();
    this._circle.position.set(x, y);

    this.addChild(this._circle);
  }

  _updateCollision() {
    const { x, y } = this.game.input.activePointer;

    if (circlePointCollision(x, y, this._c)) {
      this.removeChild(this._circle);
      this._buildCircle(0xff0000);
    } else {
      this.removeChild(this._circle);
      this._buildCircle();
    }
  }
}
