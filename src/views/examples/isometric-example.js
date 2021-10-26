import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class IsometricExample extends Phaser2Grid {
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
    this._area.removeChildren();
    this._xOffset > this._row ? (this._xOffset += 0.1) : (this._xOffset -= 0.1);
    this._yOffset > this._col ? (this._yOffset += 0.1) : (this._yOffset -= 0.1);
    this._draw();
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
    this._bounds.beginFill(0xff0000, 0);
    this._bounds.drawRect(x, y, width, height);
    this._bounds.endFill();

    this.setChild("cell", this._bounds);
  }

  _init() {
    this._tW = 50;
    this._tH = 25;
    this._row = 10;
    this._col = 10;

    this._board = [
      [5, 1, 1, 1, 1, 2, 1, 1, 1, 5],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [2, 0, 0, 0, 10, 10, 0, 0, 0, 2],
      [1, 0, 0, 0, 10, 10, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [5, 1, 1, 1, 1, 2, 1, 1, 1, 5]
    ];

    this._xOffset = 0;
    this._yOffset = 0;

    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());

    this._setBounds();
    this._drawBounds();

    // this._draw();
    // this._drawBoard();
  }

  _draw() {
    for (let i = 0; i < this._row; i += 1) {
      for (let j = 0; j < this._col; j += 1) {
        const color = Phaser.Color.getRandomColor(0, 255, 1);

        const dx = this._xOffset - i;
        const dy = this._yOffset - j;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const z = Math.cos(dist * 0.75) * 2 + 2;

        // this._drawTile(i, j, color);
        this._drawBlock(i, j, z);
      }
    }
  }

  _drawBoard() {
    for (let i = 0; i < this._board.length; i += 1) {
      const row = this._board[i];
      for (let j = 0; j < row.length; j += 1) {
        this._drawBlock(i, j, row[j]);
      }
    }
  }

  _drawTile(x, y, color) {
    const gr = this.game.add.graphics();
    gr.lineStyle(2, 0x000000, 1);
    gr.beginFill(color, 1);
    gr.moveTo(0, 0);
    gr.lineTo(this._tW / 2, this._tH / 2);
    gr.lineTo(0, this._tH);
    gr.lineTo(-this._tW / 2, this._tH / 2);

    gr.position.set(((x - y) * this._tW) / 2, ((x + y) * this._tH) / 2);

    this._area.addChild(gr);
  }

  _drawBlock(x, y, z) {
    const top = 0xeeeeee;
    const left = 0x999999;
    const right = 0xcccccc;

    // draw top
    const topGr = this.game.add.graphics();
    topGr.beginFill(top, 1);
    // topGr.lineStyle(1, 0x000000, 1);

    topGr.moveTo(0, -z * this._tH);
    topGr.lineTo(this._tW / 2, this._tH / 2 - z * this._tH);
    topGr.lineTo(0, this._tH - z * this._tH);
    topGr.lineTo(-this._tW / 2, this._tH / 2 - z * this._tH);

    topGr.position.set(((x - y) * this._tW) / 2, ((x + y) * this._tH) / 2);

    this._area.addChild(topGr);

    // draw left
    const leftGr = this.game.add.graphics();
    leftGr.beginFill(left, 1);
    // leftGr.lineStyle(1, 0x000000, 1);

    leftGr.moveTo(-this._tW / 2, this._tH / 2 - z * this._tH);
    leftGr.lineTo(0, this._tH - z * this._tH);
    leftGr.lineTo(0, this._tH);
    leftGr.lineTo(-this._tW / 2, this._tH / 2);

    leftGr.position.set(((x - y) * this._tW) / 2, ((x + y) * this._tH) / 2);

    this._area.addChild(leftGr);

    // draw right
    const rightGr = this.game.add.graphics();
    rightGr.beginFill(right, 1);
    // rightGr.lineStyle(1, 0x000000, 1);

    rightGr.moveTo(this._tW / 2, this._tH / 2 - z * this._tH);
    rightGr.lineTo(0, this._tH - z * this._tH);
    rightGr.lineTo(0, this._tH);
    rightGr.lineTo(this._tW / 2, this._tH / 2);

    rightGr.position.set(((x - y) * this._tW) / 2, ((x + y) * this._tH) / 2);

    this._area.addChild(rightGr);
  }
}
