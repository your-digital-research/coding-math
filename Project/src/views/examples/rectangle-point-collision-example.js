import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { pointInRectangle } from "../../utils";

export class RectanglePointCollisionExample extends Phaser2Grid {
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
    this._r = {
      x: 300,
      y: 200,
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

    this._buildRectangle();
  }

  _buildRectangle(color = 0xfff000) {
    const { x, y, width, height } = this._r;
    this._rectangle = this.game.add.graphics();
    this._rectangle.beginFill(color, 1);
    this._rectangle.drawRect(0, 0, width, height);
    this._rectangle.endFill();
    this._rectangle.position.set(x, y);

    this.addChild(this._rectangle);
  }

  _updateCollision() {
    const { x, y } = this.game.input.activePointer;

    this._rectangle.position.set(x, y);
    if (pointInRectangle(x, y, this._r)) {
      this.removeChild(this._rectangle);
      this._buildRectangle(0xff0000);
    } else {
      this.removeChild(this._rectangle);
      this._buildRectangle();
    }
  }
}
