import { Phaser2Grid } from "@armathai/phaser2-grid";
import { Particle } from "../../classes/particle";
import { Vector } from "../../classes/vector";
import { getBasicGridConfig } from "../../configs/grid-config";

export class FrictionExample extends Phaser2Grid {
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
    this._setBounds();

    // if (this._bounds) {
    //   this._bounds.destroy();
    //   this._drawBounds();
    // }
  }

  update() {
    this._updateCircleFrictionByMultiplication();
  }

  _setBounds() {
    this._circleContainer.getBounds = () => {
      return new Phaser.Rectangle(-500, -350, 1000, 700);
    };
  }

  _drawBounds() {
    const { x, y, width, height } = this._circleContainer.getBounds();

    this._bounds = this.game.add.graphics();
    this._bounds.beginFill(0xff0000, 0.4);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _init() {
    this._circle = new Particle(0, 0, 25, 0, 0, 0);
    this._circle.friction = 0.97;
    this._circle.velocity.addTo(
      new Vector(Math.random(0.8) * -20 + 10, Math.random(0.8) * -20 + 10)
    );

    this._friction = new Vector(0.15, 0);

    this._shape = this._buildShape();
    this._circleContainer = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());
    this._buildParticle();
    this._setBounds();
    this._drawBounds();
  }

  _buildShape() {
    const gr = this.game.add.graphics();
    gr.beginFill(0x000000, 1);
    gr.drawCircle(0, 0, this._circle.radius);
    gr.endFill();

    return gr;
  }

  _buildParticle() {
    const { x, y } = this._circle;
    this._shape.position.set(x, y);
    this._circleContainer.addChild(this._shape);

    this.setChild("cell", this._circleContainer);
  }

  _updateCircleFrictionByAngle() {
    const { length: velocityLength } = this._circle.velocity;
    const { length: frictionLength } = this._friction;
    const { x, y } = this._circle.position;

    this._friction.angle = this._circle.velocity.angle;

    velocityLength > frictionLength
      ? this._circle.velocity.subtractFrom(this._friction)
      : (this._circle.velocity.length = 0);

    this._circle.update();

    this._shape.position.set(x, y);
  }

  _updateCircleFrictionByMultiplication() {
    const { x, y } = this._circle.position;

    this._circle.update();
    this._shape.position.set(x, y);
  }
}
