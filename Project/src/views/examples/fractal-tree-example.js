import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class FractalTreeExample extends Phaser2Grid {
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
      y: 300
    };
    this._p2 = {
      x: 0,
      y: -300
    };

    this._trunkRatio = 0.5;
    this._branchAngleA = Math.PI / 4;
    this._branchAngleB = Math.PI / 4;

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

    this._tree(this._p1, this._p2, 5);
  }

  _tree(p1, p2, limit) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const branchLength = dist * (1 - this._trunkRatio);

    const pA = {
      x: p1.x + dx * this._trunkRatio,
      y: p1.y + dy * this._trunkRatio
    };

    const pB = {
      x: pA.x + Math.cos(angle + this._branchAngleA) * branchLength,
      y: pA.y + Math.sin(angle + this._branchAngleA) * branchLength
    };

    const pC = {
      x: pA.x + Math.cos(angle - this._branchAngleB) * branchLength,
      y: pA.y + Math.sin(angle - this._branchAngleB) * branchLength
    };

    const gr = this.game.add.graphics();
    gr.lineStyle(1, 0x000000, 1);

    gr.moveTo(p1.x, p1.y);
    gr.lineTo(pA.x, pA.y);

    if (limit > 0) {
      this._tree(pA, pB, limit - 1);
      this._tree(pA, pC, limit - 1);
    } else {
      gr.moveTo(pB.x, pB.y);
      gr.lineTo(pA.x, pA.y);
      gr.lineTo(pC.x, pC.y);
    }

    this._area.addChild(gr);
  }
}
