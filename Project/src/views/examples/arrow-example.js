import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class ArrowExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._arrow = new Phaser.Group(this.game);
    this._build();
  }

  getGridConfig() {
    return getBasicGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
  }

  update() {
    this._updateAngle();
  }

  _build() {
    super.build(this.getGridConfig());
    this._buildArrow();
  }

  _buildArrow() {
    const a = this.game.add.graphics(0, 0);
    a.beginFill(0x000000, 1);
    a.lineStyle(2, 0x000000, 1);
    a.drawRect(-50, 0, 100, 1);
    a.endFill();

    const b = this.game.add.graphics(0, 0);
    b.beginFill(0x000000, 1);
    b.lineStyle(2, 0x000000, 1);
    b.drawRect(-12.5, -38, 50, 1);
    b.endFill();
    b.angle = 45;

    const c = this.game.add.graphics(0, 0);
    c.beginFill(0x000000, 1);
    c.lineStyle(2, 0x000000, 1);
    c.drawRect(-12.5, 38, 50, 1);
    c.endFill();
    c.angle = -45;

    this._arrow.addChild(a);
    this._arrow.addChild(b);
    this._arrow.addChild(c);

    this.setChild("cell", this._arrow);
  }

  _updateAngle() {
    const dx = this.game.input.activePointer.x - this._arrow.x;
    const dy = this.game.input.activePointer.y - this._arrow.y;
    const targetAngle = (360 / (2 * Math.PI)) * Math.atan2(dy, dx);
    // const targetAngle = (360 / (2 * Math.PI)) * Math.atan(dy / dx);

    this._arrow.angle = targetAngle;
  }
}
