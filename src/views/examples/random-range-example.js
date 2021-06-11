import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { randomRange } from "../../utils";

export class RandomRangeExample extends Phaser2Grid {
  constructor(game) {
    super(game);

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

  _build() {
    super.build(this.getGridConfig());
    this._buildCircles();
  }

  _buildCircles() {
    const { innerWidth, innerHeight } = window;
    const count = 200;

    for (let i = 0; i < count; i++) {
      const blue = this.game.add.graphics();
      blue.beginFill(0x0000ff, 1);
      blue.drawCircle(
        randomRange(0, innerWidth * 0.33),
        randomRange(0, innerHeight),
        randomRange(10, 40)
      );
      blue.endFill();
      this.addChild(blue);

      const red = this.game.add.graphics();
      red.beginFill(0xff0000, 1);
      red.drawCircle(
        randomRange(innerWidth * 0.33, innerWidth * 0.66),
        randomRange(0, innerHeight),
        randomRange(10, 40)
      );
      red.endFill();
      this.addChild(red);

      const green = this.game.add.graphics();
      green.beginFill(0x00ff00, 1);
      green.drawCircle(
        randomRange(innerWidth * 0.66, innerWidth),
        randomRange(0, innerHeight),
        randomRange(10, 40)
      );
      green.endFill();
      this.addChild(green);
    }
  }
}
