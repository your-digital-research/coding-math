import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class IFSExample extends Phaser2Grid {
  constructor(game) {
    super(game);

    // Barnsley Fern fractal example

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
    this._iterate();
  }

  _init() {
    this._plotX = Math.random();
    this._plotY = Math.random();

    this._rules = [
      {
        a: 0.85,
        b: 0.04,
        c: -0.04,
        d: 0.85,
        tx: 0,
        ty: 1.6,
        weight: 0.85
      },
      {
        a: -0.15,
        b: 0.28,
        c: 0.26,
        d: 0.24,
        tx: 0,
        ty: 0,
        weight: 0.07
      },
      {
        a: 0.2,
        b: -0.26,
        c: 0.23,
        d: 0.22,
        tx: 0,
        ty: 1.6,
        weight: 0.07
      },
      {
        a: 0,
        b: 0,
        c: 0,
        d: 0.16,
        tx: 0,
        ty: 0,
        weight: 0.01
      }
    ];
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildContext();

    for (let i = 0; i < 10000; i += 1) {
      this._iterate();
    }
  }

  _buildContext() {
    const { innerWidth, innerHeight } = window;
    const bmd = this.game.add.bitmapData(innerWidth, innerHeight);
    const blocker = this.game.add.sprite(0, 0, bmd);

    this._ctx = bmd.context;
    this._ctx.translate(innerWidth / 2, innerHeight);
  }

  _iterate() {
    const rule = this._getRule();
    const x1 = this._plotX * rule.a + this._plotY * rule.b + rule.tx;
    const y1 = this._plotX * rule.c + this._plotY * rule.d + rule.ty;

    this._plotX = x1;
    this._plotY = y1;

    this._plot(this._plotX, this._plotY);
  }

  _getRule() {
    let rand = Math.random();

    for (let i = 0; i < this._rules.length; i += 1) {
      const rule = this._rules[i];

      if (rand < rule.weight) {
        return rule;
      }

      rand -= rule.weight;
    }
  }

  _plot(x, y) {
    this._ctx.fillRect(x * 50, -y * 50, 2, 2);
  }
}
