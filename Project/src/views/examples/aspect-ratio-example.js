import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class AspectRatioExample extends Phaser2Grid {
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
    this._scaleMode = {
      fill: "fill",
      showAll: "showAll"
    };

    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());

    this._setBounds();
    this._drawBounds();

    this._buildSquare();
  }

  _buildSquare() {
    let imageWidth = 1280;
    let imageHeight = 720;

    const { width, height } = this._area.getBounds();
    const scaleMode = this._scaleMode.fill;
    const containerAspectRation = width / height;
    const imageAspectRation = imageWidth / imageHeight;
    const widthFirst = this._getWidthFirst(
      scaleMode,
      imageAspectRation,
      containerAspectRation
    );

    if (widthFirst) {
      imageWidth = width;
      imageHeight = imageHeight / imageAspectRation;
    } else {
      imageHeight = height;
      imageWidth = imageHeight * imageAspectRation;
    }

    const gr = this.game.add.graphics();
    gr.beginFill(0xbebebe, 1);
    gr.drawRect(-imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
    gr.endFill();

    this._area.addChild(gr);
  }

  _getWidthFirst(scaleMode, imageAspectRation, containerAspectRation) {
    if (scaleMode === this._scaleMode.showAll) {
      return imageAspectRation > containerAspectRation;
    } else {
      return imageAspectRation < containerAspectRation;
    }
  }
}
