import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { map } from "../../utils";

export class InterpolationExample extends Phaser2Grid {
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
    this._updateCircle();
  }

  _setBounds() {
    this._area.getBounds = () => {
      return new Phaser.Rectangle(-375, -375, 750, 750);
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
    const { width, height } = this.getBounds();
    this._minX = -width / 2;
    this._maxX = width;
    this._minY = 0;
    this._maxY = height;
    this._minAlpha = 0;
    this._maxAlpha = 1;
    this._minRadius = 50;
    this._maxRadius = 400;
    this._t = 0;
    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    // this._drawBounds();
    this._buildCircle();
  }

  _buildCircle() {
    const { height } = this.getBounds();
    const x = 0; // lerp(this._t, this._minX, this._maxX);
    const y = 0; // lerp(this._t, this._minY, this._maxY);
    // const radius = lerp(this._t, this._minRadius, this._maxRadius);

    const radius = map(
      this.game.input.activePointer.y,
      0,
      height,
      this._minRadius,
      this._maxRadius
    );

    this._shape = this.game.add.graphics();
    this._shape.beginFill(0x000000, 1);
    this._shape.drawCircle(x, y, radius);
    this._shape.alpha = 1; // lerp(this._t, this._minAlpha, this._maxAlpha);
    this._shape.endFill();

    this._area.addChild(this._shape);
    this.setChild("cell", this._area);
  }

  _updateCircle() {
    // this._t += 0.025;
    // this._t > 1 && (this._t = 0);

    this._area.removeChildren();
    this._buildCircle();
  }
}
