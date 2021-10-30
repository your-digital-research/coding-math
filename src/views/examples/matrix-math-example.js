import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class MatrixMathExample extends Phaser2Grid {
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
    //
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildRect();
  }

  _buildRect() {
    const { innerWidth, innerHeight } = window;
    const bmd = this.game.add.bitmapData(innerWidth, innerHeight);
    const blocker = this.game.add.sprite(0, 0, bmd);

    const angle = Math.PI / 4;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const sx = 2;
    const sy = 1;

    this._ctx = bmd.context;

    // this._ctx.setTransform(cos * sx, sin * sx, -sin * sy, cos * sy, 200, 200); // scale then rotate
    this._ctx.setTransform(cos * sx, sin * sy, -sin * sx, cos * sy, 200, 200); // rotate then scale

    this._ctx.beginPath();
    this._ctx.rect(0, 0, 100, 100);
    this._ctx.fill();
    this._ctx.closePath();
  }
}
