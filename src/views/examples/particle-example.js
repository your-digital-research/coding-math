import { Phaser2Grid } from "@armathai/phaser2-grid";
import { Particle } from "../../classes/particle";
import { getBasicGridConfig } from "../../configs/grid-config";

export class ParticleExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._particles = [];
    this._particlesGroup = new Phaser.Group(this.game);

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
    this._updateParticles();
  }

  _build() {
    super.build(this.getGridConfig());
    this._buildParticles();
  }

  _buildParticles() {
    const x = 0;
    const y = 0;
    const amount = 50;

    for (let index = 0; index < amount; index++) {
      const speed = Math.random() * 5 + 2;
      const direction = Math.random() * Math.PI * 2;

      this._particles.push(new Particle(x, y, speed, direction, 0.1));
    }

    this.setChild("cell", this._particlesGroup);
  }

  _updateParticles() {
    this._particlesGroup.removeChildren();

    for (let index = 0; index < this._particles.length; index++) {
      const particle = this._particles[index];

      particle.update();

      const { x, y } = particle.position;
      const gr = this.game.add.graphics();

      gr.beginFill(0x00fffff, 0.7);
      gr.drawCircle(x, y, 20);
      gr.endFill();

      this._particlesGroup.addChild(gr);
    }
  }
}
