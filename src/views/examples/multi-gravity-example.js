import { Phaser2Grid } from "@armathai/phaser2-grid";
import { ParticleOptimized } from "../../classes/particle-optimized";
import { getBasicGridConfig } from "../../configs/grid-config";
import { randomRange } from "../../utils";

export class MultiGravityExample extends Phaser2Grid {
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
    const { innerWidth, innerHeight } = window;

    for (let i = 0; i < this._numOfParticles; i += 1) {
      const particle = this._particles[i];
      particle.update();
      const shape = this._particlesShapes[i];
      shape.position.set(particle.x, particle.y);
      if (
        particle.x > innerWidth ||
        particle.x < 0 ||
        particle.y > innerHeight ||
        particle.y < 0
      ) {
        particle.x = this._emitter.x;
        particle.y = this._emitter.y;
        particle.speed = randomRange(7, 8);
        particle.heading = Math.PI / 2 + randomRange(-0.1, 0.1);
      }
    }
  }

  _init() {
    this._suns = [];
    this._sunsCount = 2;
    this._particles = [];
    this._numOfParticles = 100;
    this._emitter = {
      x: 100,
      y: 0
    };

    this._initSuns();
    this._initParticles();
  }

  _initSuns() {
    const { innerWidth, innerHeight } = window;

    for (let i = 0; i < this._sunsCount; i++) {
      const mass = randomRange(20000, 40000);
      const radius = randomRange(20, 50);
      const xOffset = randomRange(-300, 300);
      const yOffset = randomRange(-300, 300);
      const sun = new ParticleOptimized(
        innerWidth / 2 + xOffset,
        innerHeight / 2 + yOffset,
        0,
        0,
        0
      );
      sun.mass = mass;
      sun.radius = radius;
      this._suns.push(sun);
    }
  }

  _initParticles() {
    for (let i = 0; i < this._numOfParticles; i += 1) {
      const particle = new ParticleOptimized(
        this._emitter.x,
        this._emitter.y,
        randomRange(7, 8),
        Math.PI / 2 + randomRange(-0.1, 0.1)
      );

      this._suns.forEach((sun) => {
        particle.addGravitation(sun);
      });

      particle.radius = 5;
      this._particles.push(particle);
    }
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildSun();
    this._buildParticles();
  }

  _buildSun() {
    this._suns.forEach((sun) => {
      const { x, y, radius } = sun;
      const gr = this.game.add.graphics();

      gr.beginFill(0xffff00);
      gr.drawCircle(x, y, radius);
      gr.endFill();

      this.addChild(gr);
    });
  }

  _buildParticles() {
    this._particlesShapes = [];
    this._particles.forEach((particle) => {
      const { x, y, radius } = particle;
      const gr = this.game.add.graphics();

      gr.beginFill(0x000000);
      gr.drawCircle(x, y, radius);
      gr.endFill();

      this.addChild(gr);
      this._particlesShapes.push(gr);
    });
  }
}
