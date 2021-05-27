import { Phaser2Grid } from "@armathai/phaser2-grid";
import { Particle } from "../../classes/particle";
import { Vector } from "../../classes/vector";
import { getBasicGridConfig } from "../../configs/grid-config";

export class HandlingEdgeExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._circle = new Particle(0, 0, 50, 0, 0, 0.3);
    this._circle.bounce = -0.9;
    this._circle.velocity.addTo(new Vector(-5, -5));

    this._shape = this._buildShape();
    this._circleContainer = new Phaser.Group(this.game);

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
    this._updateParticlePosition();
  }

  _setBounds() {
    this._circleContainer.getBounds = () => {
      return new Phaser.Rectangle(-375, -200, 750, 400);
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

  _checkForBounds() {
    const { width, height } = this.getBounds();
    const { radius } = this._circle;
    const { x, y } = this._circle.position;

    x > width / 2 + radius && (this._circle.position.x = -width / 2 - radius);
    x < -width / 2 - radius && (this._circle.position.x = width / 2 + radius);
    y > height / 2 + radius && (this._circle.position.y = -height / 2 - radius);
    y < -height / 2 - radius && (this._circle.position.y = height / 2 + radius);
  }

  _checkForBounce() {
    let { width, height } = this._circleContainer.getBounds();
    const { radius, bounce } = this._circle;
    const { x: pX, y: pY } = this._circle.position;
    const { x: vX, y: vY } = this._circle.velocity;

    if (pX > (width - radius) / 2) {
      this._circle.position.x = (width - radius) / 2;
      this._circle.velocity.x = vX * bounce;
    }
    if (pX < (-width + radius) / 2) {
      this._circle.position.x = (-width + radius) / 2;
      this._circle.velocity.x = vX * bounce;
    }
    if (pY > (height - radius) / 2) {
      this._circle.position.y = (height - radius) / 2;
      this._circle.velocity.y = vY * bounce;
    }
    if (pY < (-height + radius) / 2) {
      this._circle.position.y = (-height + radius) / 2;
      this._circle.velocity.y = vY * bounce;
    }
  }

  _updateParticlePosition() {
    this._checkForBounce();
    this._circle.update();

    const { x, y } = this._circle.position;
    this._shape.position.set(x, y);
  }
}
