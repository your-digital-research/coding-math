import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class PyTreeExample extends Phaser2Grid {
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
    this._branchAngle = -Math.PI / 4;
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

    this._tree(-75, 350, 150, 0, 4, this._area);
  }

  _tree(x, y, size, angle, limit, parent) {
    const r1 = this.game.add.graphics();
    r1.beginFill(0x000000, 1);
    r1.drawRect(0, 0, size, -size);
    r1.endFill();

    r1.rotation = angle;
    r1.position.set(x, y);

    parent.addChild(r1);

    // LEFT BRANCH
    const x1 = 0;
    const y1 = -size;
    const size1 = Math.abs(Math.cos(this._branchAngle) * size);
    const angle1 = this._branchAngle;

    if (limit > 0) {
      this._tree(x1, y1, size1, angle1, limit - 1, r1);
    } else {
      const r2 = this.game.add.graphics();
      r2.beginFill(0x000000, 1);
      r2.drawRect(0, 0, size1, -size1);
      r2.endFill();

      r2.rotation = angle1;
      r2.position.set(x1, y1);

      r1.addChild(r2);
    }

    // RIGHT BRANCH
    const x2 = x1 + Math.cos(angle1) * size1;
    const y2 = y1 + Math.sin(angle1) * size1;
    const size2 = Math.abs(Math.sin(this._branchAngle) * size);
    const angle2 = angle1 + Math.PI / 2;

    if (limit > 0) {
      this._tree(x2, y2, size2, angle2, limit - 1, r1);
    } else {
      const r3 = this.game.add.graphics();
      r3.beginFill(0x000000, 1);
      r3.drawRect(0, 0, size2, -size2);
      r3.endFill();

      r3.rotation = angle2;
      r3.position.set(x2, y2);

      r1.addChild(r3);
    }
  }
}
