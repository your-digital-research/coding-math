import { Phaser2Grid } from "@armathai/phaser2-grid";
import { IKSystem } from "../../classes/ik-system";
import { getBasicGridConfig } from "../../configs/grid-config";

export class InverseKinematicsExample extends Phaser2Grid {
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
    const armsCount = 30;

    this._iks = new IKSystem(0, 0);
    this._area = new Phaser.Group(this.game);

    for (let i = 0; i < armsCount; i += 1) {
      this._iks.addArm(30);
    }
  }

  _build() {
    super.build(this.getGridConfig());

    this._setBounds();
    this._drawBounds();
  }

  _renderArms() {
    this.removeChildren();

    const { x, y } = this.game.input.activePointer;
    this._iks.drag(x, y);

    const { arms } = this._iks;

    for (let i = 0; i < arms.length; i += 1) {
      const arm = arms[i];
      this._buildArm(arm);
    }
  }

  _buildArm(arm) {
    const { x, y, endXForIK, endYForIK } = arm;
    const gr = this.game.add.graphics();
    gr.lineStyle(10, 0x000000, 1);
    gr.moveTo(x, y);
    gr.lineTo(endXForIK, endYForIK);

    this.addChild(gr);
  }
}
