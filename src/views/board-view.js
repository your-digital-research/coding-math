import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBoardGridConfig } from "../configs/grid-config";
import { PostcardsInSpaceExample } from "./examples/postcards-in-space-example";
export class BoardView extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._build();
  }

  getBounds() {
    return new Phaser.Rectangle(0, 0, 750, 750);
  }

  getGridConfig() {
    return getBoardGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
  }

  update() {
    this._example.update();
  }

  _build() {
    super.build(this.getGridConfig());
    // this._drawBounds();

    this._buildExample();
  }

  _drawBounds() {
    const { x, y, width, height } = this.getBounds();

    const gr = this.game.add.graphics();
    gr.beginFill(0xff0000, 0.4);
    gr.drawRect(x, y, width, height);
    gr.endFill();

    this.setChild("example", gr);
  }

  _buildExample() {
    this._example = new PostcardsInSpaceExample(this.game);
    this.setChild("example", this._example);
  }
}
