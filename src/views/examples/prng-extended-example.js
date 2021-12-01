import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

// Pseudo Random Number Generator
export class PRNGExtendedExample extends Phaser2Grid {
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
    // Linear congruential generator
    // glibc (used by GCC) a = 1103515245 , c = 12345, m = 2^31
    this._multiplier = 1103515245;
    this._increment = 12345;
    this._modulus = Math.pow(2, 31);

    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());

    this._setBounds();
    this._drawBounds();

    this._cryptoExample();
    this._linesExample();
  }

  // Linear congruential generator
  _nextRand(seed) {
    return (this._multiplier * seed + this._increment) % this._modulus;
  }

  _nextRandFloat(seed) {
    return this._nextRand(seed) / this._modulus;
  }

  _cryptoExample() {
    const message = "hello world, what's up?";
    console.warn("Message : ", message);

    const encoded = this._encode(message, 5);
    console.warn("Encoded message : ", encoded);

    const decoded = this._decode(encoded, 5);
    console.warn("Decoded message : ", decoded);
  }

  _encode(message, seed) {
    let result = "";

    for (let i = 0; i < message.length; i += 1) {
      let char = message.charCodeAt(i);

      char += parseInt((seed = parseInt(this._nextRandFloat(seed) * 50)));
      result += String.fromCharCode(char);
    }

    return result;
  }

  _decode(message, seed) {
    let result = "";

    for (let i = 0; i < message.length; i += 1) {
      let char = message.charCodeAt(i);

      char -= parseInt((seed = parseInt(this._nextRandFloat(seed) * 50)));
      result += String.fromCharCode(char);
    }

    return result;
  }

  _linesExample() {
    this._buildRow(1, -250);
    this._buildRow(2, 0);
    this._buildRow(3, 250);
  }

  _buildRow(seed, height) {
    const gr = this.game.add.graphics();

    gr.lineStyle(2, 0x000000, 1);
    gr.moveTo(this._area.left, height);

    for (let x = this._area.left + 25; x < 375; x += 25) {
      const y = (seed = parseInt(this._nextRandFloat(seed) * 50)) + height;

      gr.lineTo(x, y);
    }

    gr.endFill();

    this._area.addChild(gr);
  }
}
