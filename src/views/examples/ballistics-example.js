import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { clamp } from "../../utils";

export class BallisticsExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._init();
    this._build();
    document.body.addEventListener("mousedown", this._onMouseDown.bind(this));
  }

  getGridConfig() {
    return getBasicGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
    this._rebuildComponents();
  }

  update() {
    //
  }

  _onMouseDown(event) {
    document.body.addEventListener("mousemove", this._onMouseMove.bind(this));
    document.body.addEventListener("mouseup", this._onMouseUp.bind(this));
    this._aimGun(event.clientX, event.clientY);
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
    this._bounds.beginFill(0xff0000, 0.4);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _init() {
    this.game.input.maxPointers = 1;
    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());
    this._setBounds();
    // this._drawBounds();

    this._draw();
    this.setChild("cell", this._area);
  }

  _aimGun(mouseX, mouseY) {
    const angle = clamp(
      (Math.atan2(mouseY - this._gun.y, mouseX - this._gun.x) * 180) / Math.PI,
      -90,
      -15
    );
    this._draw(angle);
  }

  _draw(angle) {
    this.removeChild(this._gun);
    this._buildGun(angle);
    this._buildArc();
  }

  _buildGun(angle = -15) {
    const { innerWidth, innerHeight } = window;
    this._gun = this.game.add.graphics();
    this._gun.beginFill(0xbdbdbdb, 0.5);
    this._gun.drawRect(0, -25, 150, 50);
    this._gun.endFill();
    this._gun.angle = angle;
    this._gun.position.set(innerWidth / 2, innerHeight / 2);

    this.addChild(this._gun);
  }

  _buildArc(x = 0, y = 0) {
    const { innerWidth, innerHeight } = window;
    this._arc = this.game.add.graphics();
    this._arc.beginFill(0xa9a9a9a, 1);
    this._arc.drawCircle(0, 0, 150);
    this._arc.endFill();
    this._arc.position.set(innerWidth / 2, innerHeight / 2);

    this.addChild(this._arc);
  }
}
