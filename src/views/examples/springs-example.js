import { Phaser2Grid } from "@armathai/phaser2-grid";
import { ParticleOptimized } from "../../classes/particle-optimized";
import { getBasicGridConfig } from "../../configs/grid-config";
import { randomRange } from "../../utils";

export class SpringsExample extends Phaser2Grid {
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
    this._pointer.x = this.game.input.activePointer.x;
    this._pointer.y = this.game.input.activePointer.y;
    this._weight.update();
    this.removeChildren();

    this._buildCenter();
    this._buildCircle();
    this._buildLine();
  }

  _init() {
    const { innerWidth, innerHeight } = window;
    this._weight = new ParticleOptimized(
      randomRange(innerWidth / 4, innerWidth),
      randomRange(0, innerHeight),
      randomRange(50, 100),
      randomRange(0, Math.PI * 2),
      0.2
    );
    this._k = 0.05;
    this._weight.radius = 20;
    this._weight.friction = 0.95;

    this._initSprings();
  }

  _initSprings() {
    const springsCount = 5;
    const { innerWidth, innerHeight } = window;

    this._pointer = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };

    this._springs = [];

    for (let i = 0; i < springsCount; i++) {
      const spring = {
        x: randomRange(innerWidth / 2 - 500, innerWidth / 2 + 500),
        y: randomRange(innerHeight / 2 - 500, innerHeight / 2 + 500),
        length: randomRange(0, 0)
      };
      this._springs.push(spring);
      this._weight.addSpring(spring, this._k, spring.length);
    }

    this._weight.addSpring(this._pointer, this._k, 0);
  }

  _build() {
    super.build(this.getGridConfig());
  }

  _buildCenter() {
    const { x, y } = this.game.input.activePointer;
    this._center = this.game.add.graphics();
    this._center.beginFill(0x000000, 1);
    this._center.drawCircle(0, 0, 10);
    this._center.endFill();
    this._center.position.set(x, y);

    this.addChild(this._center);
  }

  _buildCircle() {
    const { x, y, radius } = this._weight;
    this._circle = this.game.add.graphics();
    this._circle.beginFill(0x000000, 1);
    this._circle.drawCircle(0, 0, radius);
    this._circle.endFill();
    this._circle.position.set(x, y);

    this.addChild(this._circle);
  }

  _buildLine() {
    const { x: pointerX, y: pointerY } = this.game.input.activePointer;
    const { x: toX, y: toY } = this._weight;

    this._line = this.game.add.graphics();
    this._line.clear();
    this._line.lineStyle(2, 0x000000, 1);
    this._line.moveTo(pointerX, pointerY);

    this._springs.forEach((spring) => {
      const { x: springX, y: springY } = spring;
      this._line.lineTo(toX, toY);
      this._line.lineTo(springX, springY);
    });

    this._line.endFill();

    this.addChild(this._line);
  }
}
