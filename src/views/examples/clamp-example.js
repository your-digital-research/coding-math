import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { clamp } from "../../utils";

export class ClampExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this.game.input.maxPointers = 1;
    this._area = new Phaser.Group(this.game);
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

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    // this._drawBounds();

    this._buildBox();
    this._buildCircle();
    this.setChild("cell", this._area);
  }

  _buildBox() {
    const { innerWidth, innerHeight } = window;
    this._box = this.game.add.graphics();
    this._box.beginFill(0xbdbdbdb, 0.5);
    this._box.drawRect(0, 0, 400, 200);
    this._box.endFill();
    this._box.position.set(innerWidth / 2 - 200, innerHeight / 2 - 100);

    this.addChild(this._box);
  }

  _buildCircle(x = 0, y = 0) {
    this._circle = this.game.add.graphics();
    this._circle.beginFill(0xa9a9a9a, 1);
    this._circle.drawCircle(0, 0, 30);
    this._circle.endFill();

    this.addChild(this._circle);
  }

  _updateCircle() {
    const { x: boxX, y: boxY, width, height } = this._box;
    const x = clamp(
      this.game.input.activePointer.x,
      boxX + 15,
      boxX + width - 15
    );
    const y = clamp(
      this.game.input.activePointer.y,
      boxY + 15,
      boxY + height - 15
    );
    this._circle.position.set(x, y);
  }
}
