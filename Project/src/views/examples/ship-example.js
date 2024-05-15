import { Phaser2Grid } from "@armathai/phaser2-grid";
import { Particle } from "../../classes/particle";
import { Vector } from "../../classes/vector";
import { getBasicGridConfig } from "../../configs/grid-config";

export class ShipExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._angle = 0;
    this._thrusting = false;
    this._turningLeft = false;
    this._turningRight = false;
    this._thrust = new Vector(0, 0);
    this._shape = this._buildShape();
    this._tale = this._buildTale();
    this._ship = new Particle(0, 0, 0, 0, 0);
    this._shipContainer = new Phaser.Group(this.game);

    this._build();

    document.body.addEventListener("keydown", this._onKeyDown.bind(this));
    document.body.addEventListener("keyup", this._onKeyUp.bind(this));
  }

  getBounds() {
    const { innerWidth, innerHeight } = window;

    return new Phaser.Rectangle(
      -innerWidth / 2,
      -innerHeight / 2,
      innerWidth,
      innerHeight
    );
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
    this._updateShipPosition();
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 38: // up
        this._thrusting = true;
        break;
      case 37: // left
        this._turningLeft = true;
        break;
      case 39: // right
        this._turningRight = true;
        break;
      default:
        break;
    }
  }

  _onKeyUp(event) {
    switch (event.keyCode) {
      case 38: // up
        this._thrusting = false;
        break;
      case 37: // left
        this._turningLeft = false;
        break;
      case 39: // right
        this._turningRight = false;
        break;
      default:
        break;
    }
  }

  _setBounds() {
    const { innerWidth, innerHeight } = window;
    this._shipContainer.getBounds = () => {
      return new Phaser.Rectangle(
        -innerWidth / 2,
        -innerHeight / 2,
        innerWidth,
        innerHeight
      );
    };
  }

  _drawBounds() {
    const { x, y, width, height } = this._shipContainer.getBounds();

    this._bounds = this.game.add.graphics();
    this._bounds.beginFill(0xff0000, 0.4);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _build() {
    super.build(this.getGridConfig());
    this._buildShip();
    this._setBounds();
    // this._drawBounds();
  }

  _buildShape() {
    const points = [
      new Phaser.Point(-20, -20),
      new Phaser.Point(-20, 20),
      new Phaser.Point(40, 0),
      new Phaser.Point(-20, -20)
    ];

    const gr = this.game.add.graphics();
    gr.lineStyle(3, 0x000000);
    gr.drawTriangle(points);
    gr.endFill();

    return gr;
  }

  _buildTale() {
    const gr = this.game.add.graphics();
    gr.lineStyle(7, 0xff0000);
    gr.drawRect(-55, 0, 30, 1);
    gr.endFill();

    return gr;
  }

  _buildShip() {
    const { x, y } = this._ship;

    this._tale.alpha = 0;
    this._shape.position.set(x, y);

    this._shape.addChild(this._tale);
    this._shipContainer.addChild(this._shape);

    this.setChild("cell", this._shipContainer);
  }

  _checkForBounds() {
    const { width, height } = this.getBounds();
    this._ship.position.x > width / 2 && (this._ship.position.x = -width / 2);
    this._ship.position.x < -width / 2 && (this._ship.position.x = width / 2);
    this._ship.position.y > height / 2 && (this._ship.position.y = -height / 2);
    this._ship.position.y < -height / 2 && (this._ship.position.y = height / 2);
  }

  _checkForMovement() {
    this._turningLeft && (this._angle -= 5);
    this._turningRight && (this._angle += 5);
    this._thrust.angle = (this._angle * Math.PI) / 180;

    if (this._thrusting) {
      this._thrust.length = 0.1;
      this._tale.alpha = 1;
    } else {
      this._thrust.length = 0;
      this._tale.alpha = 0;
    }
  }

  _updateShipPosition() {
    this._checkForBounds();
    this._checkForMovement();

    this._ship.accelerate(this._thrust);
    this._ship.update();

    const { x, y } = this._ship.position;
    this._shape.position.set(x, y);
    this._shape.angle = this._angle;
  }
}
