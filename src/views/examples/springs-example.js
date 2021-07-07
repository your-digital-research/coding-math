import { Phaser2Grid } from "@armathai/phaser2-grid";
import { Particle } from "../../classes/particle";
import { Vector } from "../../classes/vector";
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
    const distance = this._springPoint.subtract(this._weight.position);
    distance.length -= this._springLength;
    const springForce = distance.multiply(this._k);

    this._springPoint.x = this.game.input.activePointer.x;
    this._springPoint.y = this.game.input.activePointer.y;
    this._weight.velocity.addTo(springForce);
    this._weight.update();

    this.removeChildren();

    this._buildCenter();
    this._buildCircle();
    this._buildLine();
  }

  _init() {
    const { innerWidth, innerHeight } = window;
    this._k = 0.05;
    this._springLength = 100;
    this._springPoint = new Vector(innerWidth / 2, innerHeight / 2);
    this._weight = new Particle(
      randomRange(innerWidth / 4, innerWidth),
      randomRange(0, innerHeight),
      randomRange(20, 40),
      randomRange(50, 100),
      randomRange(0, Math.PI * 2),
      0.2
    );
    this._weight.friction = 0.95;
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
    const { radius } = this._weight;
    const { x, y } = this._weight.position;
    this._circle = this.game.add.graphics();
    this._circle.beginFill(0x000000, 1);
    this._circle.drawCircle(0, 0, radius);
    this._circle.endFill();
    this._circle.position.set(x, y);

    this.addChild(this._circle);
  }

  _buildLine() {
    const { x: centerX, y: centerY } = this.game.input.activePointer;
    const { x: toX, y: toY } = this._weight.position;

    this._line = this.game.add.graphics();
    this._line.clear();
    this._line.lineStyle(2, 0x000000, 1);
    this._line.moveTo(centerX, centerY);
    this._line.lineTo(toX, toY);
    this._line.endFill();

    this.addChild(this._line);
  }
}
