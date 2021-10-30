import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class WeightedRandomExample extends Phaser2Grid {
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
    this._prizes = [
      { prize: "bronze coin", chance: 60 },
      { prize: "silver coin", chance: 20 },
      { prize: "gold coin", chance: 15 },
      { prize: "platinum coin", chance: 5 }
    ];

    this._area = new Phaser.Group(this.game);
  }

  _build() {
    super.build(this.getGridConfig());

    this._setBounds();
    this._drawBounds();

    this._setListenerForRandom();
  }

  _setListenerForRandom() {
    this._bounds.inputEnabled = true;
    this._bounds.events.onInputDown.add(this._onClick, this);
  }

  _onClick() {
    const prize = this._getPrize();

    console.warn(prize);
  }

  _getPrize() {
    let total = 0;

    for (let i = 0; i < this._prizes.length; i += 1) {
      total += this._prizes[i].chance;
    }

    let rand = Math.random() * total;

    for (let i = 0; i < this._prizes.length; i += 1) {
      const prize = this._prizes[i];

      if (rand < prize.chance) {
        return prize.prize;
      }
      rand -= prize.chance;
    }
  }
}
