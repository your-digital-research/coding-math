import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

// Pseudo Random Number Generator
export class PRNGExample extends Phaser2Grid {
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
    this._bounds.beginFill(0xff0000, 0.5);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _init() {
    // Middle square method
    // this._seed = 1234;
    this._digits = 4;
    this._results = [];

    // Linear congruential generator
    // glibc (used by GCC) a = 1103515245 , c = 12345, m = 2^31
    this._seed = 1;
    this._multiplier = 1103515245;
    this._increment = 12345;
    this._modulus = Math.pow(2, 31);

    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());

    this._setBounds();
    this._drawBounds();

    // this._middleSquareMethod();
    this._linearCongruentialGenerator();
  }

  // Middle square method
  _middleSquareMethod() {
    // for (let i = 0; i < 20; i+=1) {
    //   console.warn(this._nextRandMSMFloat());
    // }

    for (let i = 0; i < 100; i += 1) {
      const rand = this._nextRandMSM();

      if (this._results[rand]) {
        console.warn("Duplicate at : ", i);
        break;
      }

      this._results[rand] = true;
    }
  }

  _nextRandMSM() {
    let n = (this._seed * this._seed).toString();

    while (n.length < this._digits * 2) {
      n = "0" + n;
    }

    const start = Math.floor(this._digits / 2);
    const end = start + this._digits;

    this._seed = parseInt(n.substring(start, end));

    return this._seed;
  }

  _nextRandMSMFloat() {
    return this._nextRandMSM() / 9999;
  }

  // Linear congruential generator
  _linearCongruentialGenerator() {
    for (let i = 0; i < 20; i += 1) {
      console.warn(this._nextRandLCG());
    }
  }

  _nextRandLCG() {
    this._seed =
      (this._multiplier * this._seed + this._increment) % this._modulus;

    return this._seed;
  }

  _nextRandLCGFloat() {
    return this._nextRandLCG() / this._modulus;
  }
}
