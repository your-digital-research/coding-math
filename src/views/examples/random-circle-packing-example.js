import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { loopRunnable, removeRunnable } from "../../utils";

export class RandomCirclePackingExample extends Phaser2Grid {
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
    //
  }

  _setBounds() {
    this._area.getBounds = () => {
      return new Phaser.Rectangle(-375, -375, 750, 750);
    };

    this.setChild("cell", this._area);
  }

  _drawBounds() {
    const { x, y, width, height } = this._area.getBounds();

    this._bounds = this.game.add.graphics();
    this._bounds.beginFill(0xbebebe, 1);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _init() {
    this._circles = [];
    this._minRadius = 5;
    this._maxRadius = 50;
    this._maxCircles = 1000;

    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());

    this._setBounds();
    this._drawBounds();

    this._draw();
  }

  _draw() {
    const { innerWidth, innerHeight } = window;
    const circle = this._createCircle();

    let counter = 0;
    while (!this._isValid(circle)) {
      circle.x = innerWidth / 2 + Math.random() * 750 - 375;
      circle.y = innerHeight / 2 + Math.random() * 750 - 375;

      counter += 1;

      if (counter > 1000) {
        console.log("Break from loop");
        return;
      }
    }

    while (this._isValid(circle)) {
      circle.radius += 1;
    }

    // Offset
    circle.radius -= 2;

    this._circles.push(circle);
    console.log(this._circles.length);
    this._drawCircle(circle);

    this._drawRunnable = loopRunnable(
      this.game,
      100,
      () => {
        if (this._circles.length < this._maxCircles) {
          this._draw();
        } else {
          removeRunnable(this.game, this._drawRunnable);
        }
      },
      this
    );
  }

  _createCircle() {
    const { innerWidth, innerHeight } = window;

    return {
      x: innerWidth / 2 + Math.random() * 750 - 375,
      y: innerHeight / 2 + Math.random() * 750 - 375,
      radius: this._minRadius
    };
  }

  _drawCircle(circle) {
    const { x, y, radius } = circle;
    const gr = this.game.add.graphics();
    gr.beginFill(0x000000, 1);
    gr.drawCircle(0, 0, radius * 2);
    gr.beginFill(0x000000, 0.2);
    gr.drawCircle(5, 5, radius * 2);
    gr.endFill();

    // if (radius > this._maxRadius * 0.5) {
    //   gr.alpha = 0;
    // }

    gr.position.set(x, y);

    this.addChild(gr);
  }

  _isValid(newCircle) {
    if (newCircle.radius > this._maxRadius) {
      return false;
    }

    for (let i = 0; i < this._circles.length; i += 1) {
      const circle = this._circles[i];
      const dx = circle.x - newCircle.x;
      const dy = circle.y - newCircle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < circle.radius + newCircle.radius) {
        return false;
      }
    }

    return true;
  }
}
