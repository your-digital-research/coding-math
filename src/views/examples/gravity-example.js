import { Phaser2Grid } from "@armathai/phaser2-grid";
import { Particle } from "../../classes/particle";
import { getBasicGridConfig } from "../../configs/grid-config";

export class GravityExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._sun = new Particle(0, 0, 0, 0);
    this._sun.mass = 1700;

    this._earth = new Particle(100, 0, 5, -Math.PI / 2);
    this._mars = new Particle(150, 0, 4, -Math.PI / 2);

    this._galaxy = new Phaser.Group(this.game);

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
    this._rotatePlanet();
  }

  _setBounds() {
    this._galaxy.getBounds = () => {
      return new Phaser.Rectangle(-300, -300, 600, 600);
    };
  }

  _drawBounds() {
    const { x, y, width, height } = this._galaxy.getBounds();

    this._bounds = this.game.add.graphics();
    this._bounds.beginFill(0xff0000, 0.4);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    // this._drawBounds();

    this._buildSun();
    this._buildEarth();
    this._buildMars();

    this.setChild("cell", this._galaxy);
  }

  _buildSun() {
    const { x, y } = this._sun.position;
    this._sunShape = this.game.add.graphics();

    this._sunShape.beginFill(0xffff00);
    this._sunShape.drawCircle(x, y, 40);
    this._sunShape.endFill();

    this._galaxy.addChild(this._sunShape);
  }

  _buildEarth() {
    const { x, y } = this._earth.position;
    this._earthShape = this.game.add.graphics();

    this._earthShape.beginFill(0x0000ff);
    this._earthShape.drawCircle(x, y, 10);
    this._earthShape.endFill();

    this._galaxy.addChild(this._earthShape);
  }

  _buildMars() {
    const { x, y } = this._earth.position;
    this._marsShape = this.game.add.graphics();

    this._marsShape.beginFill(0xff0000);
    this._marsShape.drawCircle(x, y, 15);
    this._marsShape.endFill();

    this._galaxy.addChild(this._marsShape);
  }

  _rotatePlanet() {
    this._earth.gravityTo(this._sun);
    this._earth.update();

    this._mars.gravityTo(this._sun);
    this._mars.update();

    const { x: earthX, y: earthY } = this._earth.position;
    const { x: marsX, y: marsY } = this._mars.position;

    this._earthShape.position.set(earthX, earthY);
    this._marsShape.position.set(marsX, marsY);
  }
}
