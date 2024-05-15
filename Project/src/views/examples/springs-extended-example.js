import { Phaser2Grid } from "@armathai/phaser2-grid";
import { Particle } from "../../classes/particle";
import { getBasicGridConfig } from "../../configs/grid-config";
import { randomRange } from "../../utils";

export class SpringsExtendedExample extends Phaser2Grid {
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
    this.removeChildren();

    this._particles.forEach((particle) => {
      this._checkEdges(particle);
    });

    for (let i = 0; i < this._particles.length; i++) {
      const p1 = this._particles[i];
      const p2 =
        i + 1 < this._particles.length
          ? this._particles[i + 1]
          : this._particles[0];

      this._spring(p1, p2);
      this._buildLine(p1.position, p2.position);
    }

    this._buildParticles();
  }

  _init() {
    this._k = 0.025;
    this._distance = 200;
    this._particles = [];

    this._initParticles();
  }

  _build() {
    super.build(this.getGridConfig());
  }

  _initParticles() {
    const count = 3;
    for (let i = 0; i < count; i++) {
      const particle = new Particle(
        randomRange(innerWidth / 4, innerWidth),
        randomRange(0, innerHeight),
        randomRange(20, 40),
        randomRange(50, 100),
        randomRange(0, Math.PI * 2),
        0.2
      );
      particle.friction = 0.95;

      this._particles.push(particle);
    }
  }

  _buildParticles() {
    this._particles.forEach((particle) => {
      this._buildParticle(particle);
    });
  }

  _buildParticle(particle) {
    const { radius } = particle;
    const { x, y } = particle.position;
    const gr = this.game.add.graphics();
    gr.beginFill(0x000000, 1);
    gr.drawCircle(0, 0, radius);
    gr.endFill();
    gr.position.set(x, y);

    this.addChild(gr);
  }

  _buildLine(pointA, pointB) {
    const { x: centerX, y: centerY } = pointA;
    const { x: toX, y: toY } = pointB;

    this._line = this.game.add.graphics();
    this._line.clear();
    this._line.lineStyle(2, 0x000000, 1);
    this._line.moveTo(centerX, centerY);
    this._line.lineTo(toX, toY);
    this._line.endFill();

    this.addChild(this._line);
  }

  _spring(firstParticle, secondParticle) {
    const distance = secondParticle.position.subtract(firstParticle.position);
    distance.length -= this._distance;
    const springForce = distance.multiply(this._k);

    firstParticle.velocity.addTo(springForce);
    secondParticle.velocity.subtractFrom(springForce);

    firstParticle.update();
    secondParticle.update();
  }

  _checkEdges(particle) {
    if (particle.position.y + particle.radius > window.innerHeight) {
      particle.position.y = window.innerHeight - particle.radius / 2;
      particle.velocity.y = particle.velocity.y * -0.95;
    }
  }
}
