import { Phaser2Grid } from "@armathai/phaser2-grid";
import { ParticleOptimized } from "../../classes/particle-optimized";
import { getBasicGridConfig } from "../../configs/grid-config";
import { randomDist, randomRange } from "../../utils";

export class RandomDistributionExtended extends Phaser2Grid {
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
    this._updateParticles();
  }

  _updateParticles() {
    this._particles.forEach((particle, index) => {
      particle.update();
      const { x, y } = particle;
      const shape = this._particlesShapes[index];
      shape.position.set(x, y);
    });
  }

  _init() {
    this._particles = [];
    this._particlesShapes = [];
    this._particlesCount = 100;
    const { innerWidth, innerHeight } = window;
    for (let i = 0; i < this._particlesCount; i++) {
      const particle = new ParticleOptimized(innerWidth / 2, innerHeight / 2);

      // Rectangle form
      // particle.vx = randomRange(-1, 1);
      // particle.vy = randomRange(-1, 1);

      // Circle form
      particle.speed = randomRange(1, 2);
      particle.heading = randomRange(0, Math.PI * 2);

      this._particles.push(particle);
    }
  }

  _build() {
    super.build(this.getGridConfig());

    // this._buildDots();
    // this._buildCircularDistribution();
    this._buildParticles();
  }

  _buildDots() {
    const count = 10000;
    const { innerWidth, innerHeight } = window;
    for (let i = 0; i < count; i += 1) {
      const x = randomDist(0, innerWidth, 5);
      const y = randomDist(0, innerHeight, 5);
      const gr = this.game.add.graphics();
      gr.beginFill(0x000000, 1);
      gr.drawCircle(0, 0, 2);
      gr.endFill();
      gr.position.set(x, y);
      this.addChild(gr);
    }
  }

  _buildCircularDistribution() {
    const count = 10000;
    const maxRadius = 200;
    const { innerWidth, innerHeight } = window;

    for (let i = 0; i < count; i++) {
      const radius = Math.sqrt(Math.random()) * maxRadius + 100;
      const angle = randomRange(0, Math.PI * 2);
      const x = innerWidth / 2 + Math.cos(angle) * radius;
      const y = innerHeight / 2 + Math.sin(angle) * radius;

      const gr = this.game.add.graphics();
      gr.beginFill(0x000000, 1);
      gr.drawCircle(0, 0, 1);
      gr.endFill();
      gr.position.set(x, y);

      this.addChild(gr);
    }
  }

  _buildParticles() {
    for (let i = 0; i < this._particlesCount; i++) {
      const gr = this.game.add.graphics();
      gr.beginFill(0x000000, 1);
      gr.drawCircle(0, 0, 20);
      gr.endFill();
      this._particlesShapes.push(gr);
      this.addChild(gr);
    }
  }
}
