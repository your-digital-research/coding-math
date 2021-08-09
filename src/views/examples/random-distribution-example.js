import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { randomDist } from "../../utils";

export class RandomDistribution extends Phaser2Grid {
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
    this._addResult();
    this._buildRect();
  }

  _init() {
    this._results = [];
    this._resultsCount = 50;
    for (let i = 0; i < this._resultsCount; i += 1) {
      this._results[i] = 0;
    }
  }

  _build() {
    super.build(this.getGridConfig());
  }

  _addResult() {
    const result = randomDist(0, this._resultsCount, 3);

    this._results[result] += 1;
  }

  _buildRect() {
    const width = window.innerWidth / this._resultsCount;
    for (let i = 0; i < this._resultsCount; i += 1) {
      const height = this._results[i] * -10;
      const gr = this.game.add.graphics();
      gr.beginFill(0x000000, 1);
      gr.drawRect(width * i, window.innerHeight, width, height);
      gr.endFill();
      this.addChild(gr);
    }
  }
}
