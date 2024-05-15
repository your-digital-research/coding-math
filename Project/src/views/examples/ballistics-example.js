import { Phaser2Grid } from "@armathai/phaser2-grid";
import { ParticleOptimized } from "../../classes/particle-optimized";
import { getBasicGridConfig } from "../../configs/grid-config";
import { circleCollision, clamp, map, randomRange } from "../../utils";

export class BallisticsExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._init();
    this._build();

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
    this._aimGun(
      this.game.input.activePointer.x,
      this.game.input.activePointer.y
    );

    if (this._isShooting) {
      this._updateBall();
      this._checkTarget();
    } else {
      this._updateBar();
    }
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 32: // space
        !this._isShooting && this._shoot();
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
    this._build();
    this._draw();
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
    this._rawForce = 0;
    this._forceAngle = 0;
    this._forceSpeed = 0.1;
    this._isShooting = false;
    this.game.input.maxPointers = 1;
  }

  _build() {
    super.build(this.getGridConfig());

    this._draw();
    this._buildArc();
    this._buildBar();
    this._buildBall();
    this._buildTarget();
    this._buildBallShape(this._ball.x, this._ball.y);
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
  }

  _shoot() {
    const force = map(this._rawForce, -1, 1, 10, 30);

    this._ball.gravity = 0.2;
    this._ball.x = this._gun.x + Math.cos(this._gun.rotation) * 40;
    this._ball.y = this._gun.y + Math.sin(this._gun.rotation) * 40;
    this._ball.speed = force;
    this._ball.heading = this._gun.rotation;

    this._isShooting = true;
  }

  _updateBall() {
    const { x, y } = this._ball;

    this._ball.update();
    this._ballShape.position.set(x, y);

    this._checkForEdges();
  }

  _checkTarget() {
    const { x: x1, y: y1, width: d1 } = this._target;
    const { x: x2, y: y2, width: d2 } = this._ballShape;

    if (circleCollision(x1, y1, d1 / 2, x2, y2, d2 / 2)) {
      this.removeChild(this._target);
      this.removeChild(this._ballShape);

      this._target = null;
      this._isShooting = false;

      this._resetBall();
      this._resetFill();
      this._buildTarget();
      this._buildBallShape(this._ball.x, this._ball.y);
    }
  }

  _updateBar() {
    this._forceAngle += this._forceSpeed;
    this._rawForce = Math.sin(this._forceAngle);
    this._buildFill();
  }

  _checkForEdges() {
    const { x, y } = this._ball;
    const { innerWidth, innerHeight } = window;

    if (x > innerWidth + 30 || x < -30 || y > innerHeight + 30 || y < -30) {
      this.removeChild(this._ballShape);

      this._isShooting = false;
      this._resetBall();
      this._resetFill();
      this._buildBallShape(this._ball.x, this._ball.y);
    }
  }

  _resetBall() {
    const { x, y } = this._gun;

    this._ball.y = y;
    this._ball.x = x;
    this._ball.vx = 0;
    this._ball.vy = 0;
    this._ball.gravity = 0;
  }

  _resetFill() {
    this._forceAngle = -1;
    this._buildFill();
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

    this._ball = new ParticleOptimized(
      100,
      innerHeight - 200,
      0,
      this._gun.angle
    );
  }

  _buildTarget() {
    const { innerWidth } = window;

    this._target = this.game.add.graphics();
    this._target.beginFill(0xff0000, 1);
    this._target.drawCircle(0, 0, 50);
    this._target.endFill();
    this._target.position.set(
      randomRange(500, innerWidth),
      randomRange(200, 700)
    );

    this.addChild(this._target);
  }

  _buildBallShape(x, y) {
    this._ballShape = this.game.add.graphics();
    this._ballShape.beginFill(0x000000, 1);
    this._ballShape.drawCircle(0, 0, 30);
    this._ballShape.endFill();
    this._ballShape.position.set(x, y);

    this.addChild(this._ballShape);
  }

  _buildBar() {
    const { innerHeight } = window;

    this._bar = this.game.add.graphics();
    this._bar.beginFill(0xc9c9c9, 1);
    this._bar.drawRect(0, 0, 150, 30);
    this._bar.endFill();
    this._bar.position.set(30, innerHeight - 100);

    this.addChild(this._bar);
  }

  _buildFill() {
    this.removeChild(this._fill);

    const { innerHeight } = window;

    this._fill = this.game.add.graphics();
    this._fill.beginFill(0x999999, 1);
    this._fill.drawRect(0, 0, map(this._rawForce, -1, 1, 0, 150), 30);
    this._fill.endFill();
    this._fill.position.set(30, innerHeight - 100);

    this.addChild(this._fill);
  }
}
