import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { loopRunnable } from "../../utils";

export class TrigonometryExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._sin = new Phaser.Group(this.game);
    this._cos = new Phaser.Group(this.game);
    this._tg = new Phaser.Group(this.game);
    this._ctg = new Phaser.Group(this.game);
    this._circle = new Phaser.Group(this.game);

    this._build();
  }

  getBounds() {
    return new Phaser.Rectangle(-375, -375, 750, 750);
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

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    this._buildSin();
    this._buildCos();
    this._buildTg();
    this._buildCtg();
    this._drawCircle();
  }

  _setBounds() {
    this._tg.getBounds = () => {
      return new Phaser.Rectangle(-375, -375, 750, 750);
    };
    this._ctg.getBounds = () => {
      return new Phaser.Rectangle(-375, -375, 750, 750);
    };
    this._circle.getBounds = () => {
      return new Phaser.Rectangle(-375, -375, 750, 750);
    };
  }

  _drawCircle() {
    let angle = 0;
    let speedX = 175;
    let speedY = 0.1;
    let offsetY = 200;
    let baseRadius = 50;
    let baseAlpha = 1;

    loopRunnable(this.game, 10, () => {
      let x = angle * speedX;
      let y = this.centerY + -Math.sin(angle) * offsetY;
      // let radius = baseRadius + -Math.sin(angle) * offsetY;
      // let alpha = baseAlpha + -Math.sin(angle) * offsetY;

      this._circle.removeChildren();

      const gr = this.game.add.graphics();
      gr.beginFill(0xff00ff, 1);
      gr.drawCircle(x, y, 50);
      gr.endFill();

      angle += speedY;

      if (angle >= Math.PI * 2) {
        angle = 0;
      }

      this._circle.addChild(gr);
      this.setChild("cell", this._circle);
    });
  }

  _buildSin() {
    for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
      const x = angle * 200;
      const y = -Math.sin(angle) * 200;

      const gr = this.game.add.graphics();
      gr.beginFill(0x00ff00, 1);
      gr.drawRect(x, y, 5, 5);
      gr.endFill();

      this._sin.addChild(gr);
    }

    this.setChild("cell", this._sin);
  }

  _buildCos() {
    for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
      const x = angle * 200;
      const y = -Math.cos(angle) * 200;

      const gr = this.game.add.graphics();
      gr.beginFill(0xff0000, 1);
      gr.drawRect(x, y, 5, 5);
      gr.endFill();

      this._cos.addChild(gr);
    }

    this.setChild("cell", this._cos);
  }

  _buildTg() {
    for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
      const x = this.centerX + angle * 50;
      const y = this.centerY + -Math.tan(angle) * 50;

      const gr = this.game.add.graphics();
      gr.beginFill(0xff00ff, 1);
      gr.drawRect(x, y, 5, 5);
      gr.endFill();

      this._tg.addChild(gr);
    }

    this.setChild("cell", this._tg);
  }

  _buildCtg() {
    for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
      const x = this.centerX + angle * 50;
      const y = this.centerY + (1 / -Math.tan(angle)) * 50;

      const gr = this.game.add.graphics();
      gr.beginFill(0x000000, 1);
      gr.drawRect(x, y, 5, 5);
      gr.endFill();

      this._ctg.addChild(gr);
    }

    this.setChild("cell", this._ctg);
  }
}
