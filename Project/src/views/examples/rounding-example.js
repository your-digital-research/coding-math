import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { roundToNearest } from "../../utils";

export class RoundingExample extends Phaser2Grid {
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
    this._gridSize = 40;
    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    // this._drawBounds();

    this._buildGrid();
    this._buildCircle();

    this.setChild("cell", this._area);
  }

  _buildGrid() {
    const { innerWidth: width, innerHeight: height } = window;
    this._grid = this.game.add.graphics();
    this._grid.lineStyle(1, 0x000000, 1);

    for (let x = 0; x < width; x += this._gridSize) {
      this._grid.moveTo(x, 0);
      this._grid.lineTo(x, height);
    }

    for (let y = 0; y < height; y += this._gridSize) {
      this._grid.moveTo(0, y);
      this._grid.lineTo(width, y);
    }

    this._grid.endFill();

    this.addChild(this._grid);
  }

  _buildCircle() {
    this._circle = this.game.add.graphics();
    this._circle.beginFill(0x000000, 1);
    this._circle.drawCircle(0, 0, 50);
    this._circle.endFill();

    this.addChild(this._circle);
  }

  _updateCircle() {
    const x = roundToNearest(this.game.input.activePointer.x, this._gridSize);
    const y = roundToNearest(this.game.input.activePointer.y, this._gridSize);

    this._circle.position.set(x, y);
  }
}
