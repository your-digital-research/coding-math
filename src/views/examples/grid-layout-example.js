import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class GridLayoutExample extends Phaser2Grid {
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
    //
  }

  _setBounds() {
    this._area.getBounds = () => {
      return new Phaser.Rectangle(-375, -375, 750, 750);
    };

    this.setChild("cell", this._area);
  }

  _drawBounds() {
    const { x, y, width, height } = this._area.getBounds();

    this._bounds = this.game.add.graphics();
    this._bounds.beginFill(0xff0000, 0);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _init() {
    this._rows = 10;
    this._cols = 10;
    this._offset = 10;
    this._cW = 750 / this._cols;
    this._cH = 750 / this._rows;

    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());

    this._setBounds();
    this._drawBounds();

    this._buildGrid();
  }

  _buildGrid() {
    const width = this._cW - this._offset;
    const height = this._cH - this._offset;

    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._cols; j++) {
        const gr = this.game.add.graphics();
        gr.lineStyle(2, 0xffffff, 0);
        gr.beginFill(0x000000, 0);
        gr.drawRect(-width / 2, -height / 2, width, height);
        gr.endFill();

        gr.position.set(
          j * this._cW - 375 + this._cW / 2,
          i * this._cH - 375 + this._cH / 2
        );

        const innerForm = this.game.add.graphics();
        innerForm.lineStyle(2, 0x000000, 1);
        for (let k = 0; k < 10; k += 1) {
          innerForm.lineTo(
            Math.random() * width - width / 2,
            Math.random() * height - height / 2
          );
        }
        innerForm.endFill();
        gr.addChild(innerForm);

        this._area.addChild(gr);
      }
    }
  }
}
