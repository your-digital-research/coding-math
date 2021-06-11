import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { rectangleIntersect } from "../../utils";

export class RectangleRectangleCollisionExample extends Phaser2Grid {
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

    this._r1 = {
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      width: 200,
      height: 100
    };

    this._r2 = {
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      width: 200,
      height: 100
    };

    this.game.input.maxPointers = 1;
    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    // this._drawBounds();

    this._buildFirstRectangle();
    this._buildSecondRectangle();
  }

  _buildFirstRectangle(pointerX, pointerY, color = 0xfff000) {
    const { x, y, width, height } = this._r1;
    pointerX === -1 && (pointerX = x);
    pointerY === -1 && (pointerY = y);
    this._rectangle1 = this.game.add.graphics();
    this._rectangle1.beginFill(color, 1);
    this._rectangle1.drawRect(-width / 2, -height / 2, width, height);
    this._rectangle1.endFill();
    this._rectangle1.position.set(pointerX, pointerY);

    this.addChild(this._rectangle1);
  }

  _buildSecondRectangle(color = 0xfff000) {
    const { x, y, width, height } = this._r1;
    this._rectangle2 = this.game.add.graphics();
    this._rectangle2.beginFill(color, 1);
    this._rectangle2.drawRect(-width / 2, -height / 2, width, height);
    this._rectangle2.endFill();
    this._rectangle2.position.set(x - width / 2, y - height / 2);

    this.addChild(this._rectangle2);
  }

  _updateCollision() {
    const { x, y } = this.game.input.activePointer;

    if (rectangleIntersect(this._rectangle1, this._rectangle2)) {
      this.removeChild(this._rectangle1);
      this.removeChild(this._rectangle2);

      this._buildFirstRectangle(x, y, 0xff0000);
      this._buildSecondRectangle(0xff0000);
    } else {
      this.removeChild(this._rectangle1);
      this.removeChild(this._rectangle2);

      this._buildFirstRectangle(x, y);
      this._buildSecondRectangle();
    }
  }
}
