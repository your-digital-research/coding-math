import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class KochExample extends Phaser2Grid {
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

  _init() {
    this._p1 = {
      x: 0,
      y: -321
    };

    this._p2 = {
      x: 278,
      y: 160
    };

    this._p3 = {
      x: -278,
      y: 160
    };

    this._area = new Phaser.Group(this.game);
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

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    this._drawBounds();

    this._koch(this._p1, this._p2, 3);
    this._koch(this._p2, this._p3, 3);
    this._koch(this._p3, this._p1, 3);
  }

  _koch(p1, p2, limit) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const unit = dist / 3;
    const angle = Math.atan2(dy, dx);

    const pA = {
      x: p1.x + dx / 3,
      y: p1.y + dy / 3
    };
    const pC = {
      x: p2.x - dx / 3,
      y: p2.y - dy / 3
    };
    const pB = {
      x: pA.x + Math.cos(angle - Math.PI / 3) * unit,
      y: pA.y + Math.sin(angle - Math.PI / 3) * unit
    };

    if (limit > 0) {
      this._koch(p1, pA, limit - 1);
      this._koch(pA, pB, limit - 1);
      this._koch(pB, pC, limit - 1);
      this._koch(pC, p2, limit - 1);
    } else {
      const gr = this.game.add.graphics();
      gr.lineStyle(2, 0x000000, 1);
      gr.moveTo(p1.x, p1.y);
      gr.lineTo(pA.x, pA.y);
      gr.lineTo(pB.x, pB.y);
      gr.lineTo(pC.x, pC.y);
      gr.lineTo(p2.x, p2.y);
      gr.endFill();

      this._area.addChild(gr);
    }
  }
}
