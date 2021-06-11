import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { circleCollision } from "../../utils";

export class CircleCircleCollisionExample extends Phaser2Grid {
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

    this._c1 = {
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      radius: 50 + Math.random() * 100
    };

    this._c2 = {
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

    this._buildFirstCircle();
    this._buildSecondCircle();
  }

  _buildFirstCircle(pointerX, pointerY, color = 0xfff000) {
    const { x, y, radius } = this._c1;
    pointerX === -1 && (pointerX = x);
    pointerY === -1 && (pointerY = y);
    this._circle1 = this.game.add.graphics();
    this._circle1.beginFill(color, 1);
    this._circle1.drawCircle(0, 0, radius * 2);
    this._circle1.endFill();
    this._circle1.position.set(pointerX, pointerY);

    this.addChild(this._circle1);
  }

  _buildSecondCircle(color = 0xfff000) {
    const { x, y, radius } = this._c2;
    this._circle2 = this.game.add.graphics();
    this._circle2.beginFill(color, 1);
    this._circle2.drawCircle(0, 0, radius * 2);
    this._circle2.endFill();
    this._circle2.position.set(x, y);

    this.addChild(this._circle2);
  }

  _updateCollision() {
    const { x, y } = this.game.input.activePointer;
    const { x: x1, y: y1 } = this._circle1;
    const { x: x2, y: y2 } = this._circle2;
    const { radius: r1 } = this._c1;
    const { radius: r2 } = this._c2;

    if (circleCollision(x1, y1, r1, x2, y2, r2)) {
      this.removeChild(this._circle1);
      this.removeChild(this._circle2);

      this._buildFirstCircle(x, y, 0xff0000);
      this._buildSecondCircle(0xff0000);
    } else {
      this.removeChild(this._circle1);
      this.removeChild(this._circle2);

      this._buildFirstCircle(x, y);
      this._buildSecondCircle();
    }
  }
}
