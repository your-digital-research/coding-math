import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBoardGridConfig } from "../configs/grid-config";

export class BoardView extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._build();
  }

  getBounds() {
    return new Phaser.Rectangle(9, 0, 750, 750);
  }

  getGridConfig() {
    return getBoardGridConfig();
  }

  rebuild() {
    this._circle && this._circle.destroy();
    super.rebuild(this.getGridConfig());
  }

  update() {
    //
  }

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    // this._drawBounds();
  }

  _setBounds() {
    // set bounds for groups like sin, cos, tg, ctg
  }

  _drawBounds() {
    const { x, y, width, height } = this.getBounds();

    const gr = this.game.add.graphics();
    gr.beginFill(0xff0000, 0.4);
    gr.drawRect(x, y, width, height);
    gr.endFill();

    this.setChild("scene", gr);
  }
}
