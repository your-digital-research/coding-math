import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class VerletIntegrationExample extends Phaser2Grid {
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
    this.removeChildren();

    this._updatePoints();

    for (let i = 0; i < 2; i += 1) {
      this._constrainPoints();
      this._updateSticks();
    }

    // this._renderPoints();
    this._renderForms();
    this._renderSticks();
  }

  _updatePoints() {
    for (let i = 0; i < this._points.length; i += 1) {
      const point = this._points[i];
      if (!point.pinned) {
        const vx = (point.x - point.oldX) * this._friction;
        const vy = (point.y - point.oldY) * this._friction;

        point.oldX = point.x;
        point.oldY = point.y;
        point.x += vx;
        point.y += vy;
        point.y += this._gravity;
      }
    }

    // CONTROL PINNED POINT
    this._points[6].x = this.game.input.activePointer.x;
    this._points[6].y = this.game.input.activePointer.y;
  }

  _updateSticks() {
    for (let i = 0; i < this._sticks.length; i += 1) {
      const stick = this._sticks[i];
      const dx = stick.p2.x - stick.p1.x;
      const dy = stick.p2.y - stick.p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const difference = stick.length - distance;
      const percent = difference / distance / 2;
      const offsetX = dx * percent;
      const offsetY = dy * percent;

      if (!stick.p1.pinned) {
        stick.p1.x -= offsetX;
        stick.p1.y -= offsetY;
      }

      if (!stick.p2.pinned) {
        stick.p2.x += offsetX;
        stick.p2.y += offsetY;
      }
    }
  }

  _constrainPoints() {
    const { innerWidth, innerHeight } = window;

    for (let i = 0; i < this._points.length; i++) {
      const point = this._points[i];
      if (!point.pinned) {
        const vx = (point.x - point.oldX) * this._friction;
        const vy = (point.y - point.oldY) * this._friction;

        if (point.x > innerWidth) {
          point.x = innerWidth;
          point.oldX = point.x + vx * this._bounce;
        } else if (point.x < 0) {
          point.x = 0;
          point.oldX = point.x + vx * this._bounce;
        }

        if (point.y > innerHeight) {
          point.y = innerHeight;
          point.oldY = point.y + vy * this._bounce;
        } else if (point.y < 0) {
          point.y = 0;
          point.oldY = point.y + vy * this._bounce;
        }
      }
    }
  }

  _renderPoints() {
    for (let i = 0; i < this._points.length; i += 1) {
      const point = this._points[i];

      const gr = this.game.add.graphics();
      gr.beginFill(0x000000, 1);
      gr.drawCircle(0, 0, 20);
      gr.endFill();

      gr.position.set(point.x, point.y);

      this.addChild(gr);
    }
  }

  _renderSticks() {
    for (let i = 0; i < this._sticks.length; i += 1) {
      const stick = this._sticks[i];
      if (stick.visible) {
        const gr = this.game.add.graphics();
        gr.lineStyle(stick.width, stick.color, 1);
        gr.moveTo(stick.p1.x, stick.p1.y);
        gr.lineTo(stick.p2.x, stick.p2.y);
        gr.endFill();
        this.addChild(gr);
      }
    }
  }

  _renderForms() {
    for (let i = 0; i < this._forms.length; i += 1) {
      const form = this._forms[i];
      const gr = this.game.add.graphics();
      gr.beginFill(form.color, 1);
      gr.moveTo(form.path[0].x, form.path[0].y);

      for (let j = 0; j < form.path.length; j += 1) {
        gr.lineTo(form.path[j].x, form.path[j].y);
      }

      gr.endFill();
      this.addChild(gr);
    }
  }

  _init() {
    this._points = [];
    this._sticks = [];
    this._forms = [];
    this._bounce = 0.9;
    this._gravity = 0.5;
    this._friction = 0.99;

    this._initPoints();
    this._initSticks();
    this._initForms();
  }

  _initPoints() {
    // RECTANGLE
    this._points.push({
      x: 100,
      y: 100,
      oldX: 50,
      oldY: 100,
      pinned: false
    });
    this._points.push({
      x: 200,
      y: 100,
      oldX: 200,
      oldY: 100,
      pinned: false
    });
    this._points.push({
      x: 200,
      y: 200,
      oldX: 200,
      oldY: 200,
      pinned: false
    });
    this._points.push({
      x: 100,
      y: 200,
      oldX: 100,
      oldY: 200,
      pinned: false
    });

    // ROPE
    this._points.push({
      x: 300,
      y: 100,
      oldX: 300,
      oldY: 100,
      pinned: false
    });
    this._points.push({
      x: 400,
      y: 100,
      oldX: 300,
      oldY: 100,
      pinned: false
    });
    this._points.push({
      x: 500,
      y: 100,
      oldX: 500,
      oldY: 100,
      pinned: true
    });
  }

  _initSticks() {
    // RECTANGLE
    this._sticks.push({
      p1: this._points[0],
      p2: this._points[1],
      length: this._distance(this._points[0], this._points[1]),
      visible: true,
      color: 0x000000,
      width: 2
    });
    this._sticks.push({
      p1: this._points[1],
      p2: this._points[2],
      length: this._distance(this._points[1], this._points[2]),
      visible: true,
      color: 0x000000,
      width: 2
    });
    this._sticks.push({
      p1: this._points[2],
      p2: this._points[3],
      length: this._distance(this._points[2], this._points[3]),
      visible: true,
      color: 0x000000,
      width: 2
    });
    this._sticks.push({
      p1: this._points[3],
      p2: this._points[0],
      length: this._distance(this._points[3], this._points[0]),
      visible: true,
      color: 0x000000,
      width: 2
    });

    // RECTANGLE INNER STICK
    this._sticks.push({
      p1: this._points[0],
      p2: this._points[2],
      length: this._distance(this._points[0], this._points[2]),
      visible: true,
      color: 0xff0000,
      width: 2
    });

    // ROPE
    this._sticks.push({
      p1: this._points[1],
      p2: this._points[4],
      length: this._distance(this._points[1], this._points[4]),
      visible: true,
      color: 0x000000,
      width: 2
    });
    this._sticks.push({
      p1: this._points[4],
      p2: this._points[5],
      length: this._distance(this._points[4], this._points[5]),
      visible: true,
      color: 0x000000,
      width: 2
    });
    this._sticks.push({
      p1: this._points[5],
      p2: this._points[6],
      length: this._distance(this._points[5], this._points[6]),
      visible: true,
      color: 0x000000,
      width: 2
    });
  }

  _initForms() {
    this._forms.push({
      path: [
        this._points[0],
        this._points[1],
        this._points[2],
        this._points[3]
      ],
      color: 0x00ff00
    });
  }

  _distance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  _build() {
    super.build(this.getGridConfig());
    //
  }
}
