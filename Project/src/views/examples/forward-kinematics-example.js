import { Phaser2Grid } from "@armathai/phaser2-grid";
import { FKSystem } from "../../classes/fk-system";
import { getBasicGridConfig } from "../../configs/grid-config";

export class ForwardKinematicsExample extends Phaser2Grid {
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
    this._renderArms();
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

  _init() {
    this._fks = new FKSystem(0, 0);

    this._fks.addArm(150);
    this._fks.addArm(150);
    this._fks.addArm(100);

    this._localAngle = 0;

    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());

    this._setBounds();
    this._drawBounds();
  }

  _renderArms() {
    this._area.removeChildren();

    this._fks.rotateArm(0, Math.sin(this._localAngle) * 1.3);
    this._fks.rotateArm(1, Math.cos(this._localAngle) * -0.3);
    this._fks.rotateArm(2, Math.sin(this._localAngle) * 1.3);

    this._fks.update();

    const { arms } = this._fks;

    for (let i = 0; i < arms.length; i += 1) {
      const arm = arms[i];
      this._buildArm(arm);
    }

    this._localAngle += 0.05;
  }

  _buildArm(arm) {
    const { x, y, endXForFK, endYForFK } = arm;
    const gr = this.game.add.graphics();
    gr.lineStyle(10, 0x000000, 1);
    gr.moveTo(x, y);
    gr.lineTo(endXForFK, endYForFK);

    this._area.addChild(gr);
  }
}
