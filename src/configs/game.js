import * as Phaser from "phaser-ce";
import { MainView } from "../views/main-view";

export class Game extends Phaser.Game {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
      parent: "coding-math",
      renderer: Phaser.AUTO,
      transparent: false,
      antialias: false, // true
      state: {
        preload,
        create,
        update
      }
    });

    window.addEventListener("resize", this._resize.bind(this));
    this._setScalingMode();
    this._loadAssets();

    setInterval(() => {
      console.warn("res");
      this._resize();
    }, 100);
  }

  _loadAssets() {
    this._build();
  }

  _build() {
    setTimeout(() => {
      this._mainView = new MainView(this);
      this.stage.addChild(this._mainView);
    }, 0);
  }

  _resize() {
    this._mainView.rebuild();
  }

  _setScalingMode() {
    setTimeout(() => {
      this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }, 0);
  }
}

function preload() {}

function create() {}

function update() {}
