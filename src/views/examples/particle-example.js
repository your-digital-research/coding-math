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

  _drawBounds() {
    const { x, y, width, height } = this.getBounds();

    this._bounds = this.game.add.graphics();
    this._bounds.beginFill(0xff0000, 0.4);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _build() {
    super.build(this.getGridConfig());
    this._buildParticles();
    this._drawBounds();
  }

  _buildParticles() {
    const amount = 30;

    for (let index = 0; index < amount; index++) {
      const speed = Math.random() * 8 + 5;
      const direction = -Math.PI / 2 + Math.random() * 0.4 - 0.2;

      const particle = new Particle(0, this.bottom, 0, speed, direction, 0.1);
      particle.radius = Math.random() * 10 + 15;
      this._particles.push(particle);
    }

    this.setChild("cell", this._particlesGroup);
  }

  _updateParticles() {
    this._particlesGroup.removeChildren();

    for (let index = 0; index < this._particles.length; index++) {
      const particle = this._particles[index];

      particle.update();
      this._emitFallenParticles();
      // this._removeDeadParticles();

      const { x, y } = particle.position;
      const gr = this.game.add.graphics();

      gr.beginFill(0x00fffff, 0.7);
      gr.drawCircle(x, y, particle.radius);
      gr.endFill();

      this._particlesGroup.addChild(gr);
    }
  }

  _emitFallenParticles() {
    const { width, height, bottom } = this.getBounds();
    const speed = Math.random() * 8 + 5;
    const direction = -Math.PI / 2 + Math.random() * 0.4 - 0.2;

    for (let i = 0; i < this._particles.length; i++) {
      const particle = this._particles[i];
      if (
        particle.position.x > width / 2 + particle.radius ||
        particle.position.x < -width / 2 - particle.radius ||
        particle.position.y > height / 2 + particle.radius ||
        particle.position.y < -height / 2 - particle.radius
      ) {
        particle.position.x = 0;
        particle.position.y = bottom;
        particle.velocity.length = speed;
        particle.velocity.angle = direction;
      }
    }
  }

  _removeDeadParticles() {
    const { width, height } = this.getBounds();
    for (let i = 0; i < this._particles.length; i++) {
      const particle = this._particles[i];
      if (
        particle.position.x > width / 2 + particle.radius ||
        particle.position.x < -width / 2 - particle.radius ||
        particle.position.y > height / 2 + particle.radius ||
        particle.position.y < -height / 2 - particle.radius
      ) {
        this._particles.splice(i, 1);
        console.log(this._particles.length);
      }
    }
  }
}
