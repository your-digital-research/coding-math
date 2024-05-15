import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { norm } from "../../utils";

export class NormalizationExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._points = [];
    this._values = [2, 9, 4, 12, 30, 2, 21, 4, 34, 23, 19, 36, 14, 17];
    this._min = Math.min(...this._values);
    this._max = Math.max(...this._values);
    this._area = new Phaser.Group(this.game);

    this._build();
  }

  getBounds() {
    return new Phaser.Rectangle(-500, -375, 1000, 750);
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

  _drawBounds() {
    const { x, y, width, height } = this.getBounds();

    this._bounds = this.game.add.graphics();
    this._bounds.beginFill(0xff0000, 0.4);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _build() {
    super.build(this.getGridConfig());
    // this._drawBounds();
    this._buildPoints();
    this._drawLines();
  }

  _buildPoints() {
    const { width, height } = this.getBounds();

    for (let i = 0; i < this._values.length; i++) {
      const normValue = norm(this._values[i], this._min, this._max);
      const x = (width / (this._values.length - 1)) * i;
      const y = height - height * normValue;

      this._points.push(new Phaser.Point(x, y));
    }
  }

  _drawLines() {
    const gr = this.game.add.graphics();
    gr.clear();
    gr.lineStyle(2, 0x000000, 1);

    this._points.forEach((point, i) => {
      const { x, y } = point;
      if (i === 0) {
        gr.moveTo(x, y);
      } else {
        gr.lineTo(x, y);
      }
    });

    this._area.addChild(gr);
    this.setChild("cell", this._area);
  }
}
