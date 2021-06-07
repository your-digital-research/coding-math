import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { distance } from "../../utils";

export class PythagoreanExample extends Phaser2Grid {
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
    this._rebuildComponents();
  }

  update() {
    this._checkForDistance();
  }

  _rebuildComponents() {
    this.removeChildren();
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
    this.game.input.maxPointers = 1;
    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    // this._drawBounds();

    this._buildCircle();
    this.setChild("cell", this._area);

    const x1 = window.innerWidth / 2;
    const y1 = window.innerHeight / 2;
    console.warn(x1, y1);
  }

  _buildCircle(color = 0xfff000) {
    const { innerWidth, innerHeight } = window;

    this._shape = this.game.add.graphics();
    this._shape.beginFill(color, 1);
    this._shape.drawCircle(0, 0, 100);
    this._shape.endFill();
    this._shape.position.set(innerWidth / 2, innerHeight / 2);

    this.addChild(this._shape);
  }

  _checkForDistance() {
    const x1 = window.innerWidth / 2;
    const y1 = window.innerHeight / 2;
    const { x: x2, y: y2 } = this.game.input.activePointer;
    const dist = distance(x1, y1, x2, y2);

    if (dist <= 100) {
      this.removeChild(this._shape);
      this._buildCircle(0xff0000);
    } else {
      this.removeChild(this._shape);
      this._buildCircle();
    }
  }
}
