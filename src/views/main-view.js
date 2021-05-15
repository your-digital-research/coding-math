import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getMainGridConfig } from "../configs/grid-config";
import { BoardView } from "./board-view";

export class MainView extends Phaser2Grid {
  constructor(game) {
    super(game);

    this._build();
  }

  getGridConfig() {
    return getMainGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
  }

  _build() {
    super.build(this.getGridConfig());

    this.setChild("main", (this._boardView = new BoardView(this.game)));
  }
}
