import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class BoxLayoutExample extends Phaser2Grid {
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
    this._bounds.beginFill(0xff0000, 0.5);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _init() {
    this._items = [];
    this._alignments = {
      top: "top",
      center: "center",
      bottom: "bottom"
    };

    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());

    this._setBounds();
    this._drawBounds();

    this._buildItems();
    this._buildSquares(10, this._alignments.center, true);
  }

  _buildItems() {
    const itemCount = 50;

    for (let i = 0; i < itemCount; i += 1) {
      this._items.push({
        width: 20 + Math.random() * 80,
        height: 20 + Math.random() * 80
      });
    }
  }

  _buildSquares(spacing, alignment, wrap) {
    let x = spacing;
    let y = 0;
    let startY = 0;
    let maxHeight = 0;

    for (let i = 0; i < this._items.length; i += 1) {
      maxHeight = Math.max(maxHeight, this._items[i].height);
    }

    for (let i = 0; i < this._items.length; i += 1) {
      const item = this._items[i];

      if (wrap && x + item.width + spacing > 750) {
        x = spacing;
        y += maxHeight + spacing;
      }

      if (alignment === this._alignments.bottom) {
        startY = maxHeight - item.height;
      } else if (alignment === this._alignments.center) {
        startY = maxHeight - item.height / 2;
      }

      const gr = this.game.add.graphics();
      gr.beginFill(0x000000, 1);
      gr.drawRect(0, 0, item.width, item.height);
      gr.endFill();
      gr.position.set(x - 375, y - 375 + startY);

      this._area.addChild(gr);

      x += item.width + spacing;
    }
  }
}
