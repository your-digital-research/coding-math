import { Phaser2Grid } from "@armathai/phaser2-grid";
import { ParticleOptimized } from "../../classes/particle-optimized";
import { getBasicGridConfig } from "../../configs/grid-config";
import { randomRange } from "../../utils";

export class BitmapCollisionExample extends Phaser2Grid {
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
    this._updateParticle();
    this._updateBitmapData();
  }

  _updateParticle() {
    const { innerWidth } = window;
    const { x, y } = this._particle;

    this._particle.update();
    x > innerWidth && this._resetParticle();

    this._particleShape.position.set(x, y);
  }

  _updateBitmapData() {
    const { x, y, radius } = this._particle;
    const imageData = this._ctx.getImageData(x, y, 1, 1);

    if (imageData.data[3] > 0) {
      const sprite = this._getCut();
      this._bmd.draw(sprite, x, y);

      this._ctx.beginPath();
      this._ctx.globalCompositeOperation = "destination-out";
      this._ctx.fillStyle = "rgba(255, 255, 255, 1)";
      this._ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      this._ctx.fill();
      this._ctx.closePath();

      this._resetParticle();
    }
  }

  _resetParticle() {
    const { innerHeight } = window;

    this._particle.x = 0;
    this._particle.y = innerHeight / 2;
    this._particle.heading = randomRange(-0.1, 0.1);
  }

  _getCut() {
    const { radius } = this._particle;
    const sprite = this.game.add.sprite();
    const gr = this.game.add.graphics();
    gr.beginFill(0xffffff, 0);
    gr.drawCircle(0, 0, radius);
    gr.endFill();
    sprite.addChild(gr);

    return sprite;
  }

  _init() {
    const { innerHeight } = window;
    this._particle = new ParticleOptimized(0, innerHeight / 2, 10, 0);
    this._particle.radius = 30;
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildBitmapCircle();
    this._buildParticle();
  }

  _buildParticle() {
    const { radius } = this._particle;

    const gr = this.game.add.graphics();
    gr.beginFill(0x000000, 1);
    gr.drawCircle(0, 0, radius);
    gr.endFill();

    this.addChild((this._particleShape = gr));
  }

  _buildBitmapCircle() {
    const { innerWidth, innerHeight } = window;

    this._bmd = this.game.add.bitmapData(innerWidth, innerHeight);
    this._ctx = this._bmd.context;

    this._ctx.beginPath();
    this._ctx.globalCompositeOperation = "source-over";
    this._ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this._ctx.arc(innerWidth / 2, innerHeight / 2, 200, 0, Math.PI * 2, false);
    this._ctx.fill();
    this._ctx.closePath();
    this._bmd.addToWorld();
  }
}
