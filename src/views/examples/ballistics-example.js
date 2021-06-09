import { Phaser2Grid } from "@armathai/phaser2-grid";
import { Particle } from "../../classes/particle";
import { getBasicGridConfig } from "../../configs/grid-config";
import { clamp } from "../../utils";

export class BallisticsExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._init();
    this._build();
    document.body.addEventListener("mousedown", this._onMouseDown.bind(this));
    document.body.addEventListener("keydown", this._onKeyDown.bind(this));
  }

  getGridConfig() {
    return getBasicGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
    this._rebuildComponents();
  }

  update() {
    this._updateBall();
  }

  _onMouseDown(event) {
    document.body.addEventListener("mousemove", this._onMouseMove.bind(this));
    document.body.addEventListener("mouseup", this._onMouseUp.bind(this));
    this._aimGun(event.clientX, event.clientY);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 32: // space
        this._canShoot && this._shoot();
        break;

      default:
        break;
    }
  }

  _onMouseMove(event) {
    this._aimGun(event.clientX, event.clientY);
  }

  _onMouseUp(event) {
    document.body.removeEventListener("mousemove", this._onMouseMove);
    document.body.removeEventListener("mouseup", this._onMouseUp);
    this._aimGun(event.clientX, event.clientY);
  }

  _rebuildComponents() {
    this.removeChildren();
    this._draw();
  }

  _setBounds() {
    const { innerWidth, innerHeight } = window;
    this._area.getBounds = () => {
      return new Phaser.Rectangle(
        -innerWidth / 2,
        -innerHeight / 2,
        innerWidth,
        innerHeight
      );
    };
  }

  _drawBounds() {
    const { x, y, width, height } = this._area.getBounds();

    this._bounds = this.game.add.graphics();
    this._bounds.beginFill(0x000000, 1);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _init() {
    this._canShoot = true;
    this.game.input.maxPointers = 1;
    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    // this._drawBounds();

    this._draw();
    this._buildBall();
    this._buildBallShape(this._ball.x, this._ball.y);

    this.setChild("cell", this._area);
  }

  _aimGun(mouseX, mouseY) {
    const angle = clamp(
      (Math.atan2(mouseY - this._gun.y, mouseX - this._gun.x) * 180) / Math.PI,
      -90,
      0
    );
    this._draw(angle);
  }

  _draw(angle) {
    this.removeChild(this._gun);
    this._buildGun(angle);
    this._buildArc();
  }

  _shoot() {
    this._ball.gravity = 0.2;
    this._ball.velocity.length = 20;
    this._ball.velocity.angle = (this._gun.angle * Math.PI) / 180;

    this._canShoot = false;
  }

  _updateBall() {
    const { x, y } = this._ball.position;
    this._ball.update();
    this.removeChild(this._ballShape);
    this._checkForEdges();
    this._buildBallShape(x, y);
  }

  _checkForEdges() {
    const { x, y } = this._ball.position;
    const { innerWidth, innerHeight } = window;
    if (x > innerWidth || x < 0 || y > innerHeight || y < 0) {
      this._canShoot = true;
      this._resetBall();
    }
  }

  _resetBall() {
    const { x, y, angle } = this._gun;
    this._ball.gravity = 0;
    this._ball.velocity.length = 0;
    this._ball.velocity.angle = (angle * Math.PI) / 180;
    this._ball.position.x = x;
    this._ball.position.y = y;
  }

  _buildGun(angle = -15) {
    const { innerHeight } = window;
    this._gun = this.game.add.graphics();
    this._gun.beginFill(0x000000, 1);
    this._gun.drawRect(-25, -25, 150, 50);
    this._gun.endFill();
    this._gun.angle = angle;
    this._gun.position.set(100, innerHeight - 200);

    this.addChild(this._gun);
  }

  _buildArc() {
    const { innerHeight } = window;
    this._arc = this.game.add.graphics();
    this._arc.beginFill(0x000000, 1);
    this._arc.drawCircle(0, 0, 150);
    this._arc.endFill();
    this._arc.position.set(100, innerHeight - 200);

    this.addChild(this._arc);
  }

  _buildBall() {
    const { innerHeight } = window;
    this._ball = new Particle(100, innerHeight - 200, 17, 0, this._gun.angle);
  }

  _buildBallShape(x, y) {
    this._ballShape = this.game.add.graphics();
    this._ballShape.beginFill(0x000000, 1);
    this._ballShape.drawCircle(0, 0, 30);
    this._ballShape.endFill();
    this._ballShape.position.set(x, y);

    this.addChild(this._ballShape);
  }
}
