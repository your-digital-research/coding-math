import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";
import { randomRange } from "../../utils";

export class PostcardsInSpaceExample extends Phaser2Grid {
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
    this._updateRectangles();
  }

  _updateRectangles() {
    this._rectangles.sort(this._zSort);
    this._rectanglesShapes.forEach((rectangle, index) => {
      const { x, y } = this._rectangles[index];
      const perspective =
        this._focalLength / (this._focalLength + this._rectangles[index].z);

      rectangle.scale.set(perspective);
      rectangle.position.set(
        innerWidth / 2 + x * perspective,
        innerHeight / 2 + y * perspective
      );

      // move backward
      this._rectangles[index].z -= 10;
      if (this._rectangles[index].z < 0) {
        this._rectangles[index].z = 10000;
      }

      // move toward:
      // this._rectangles[index].z += 10;
      // if (this._rectangles[index].z > 10000) {
      //   this._rectangles[index].z = 0;
      // }
    });
  }

  _init() {
    this._rectangles = [];
    this._focalLength = 300;
    this._rectanglesShapes = [];
    this._numberOfRectangles = 100;

    for (let i = 0; i < this._numberOfRectangles; i += 1) {
      const rectangle = {
        x: randomRange(-1000, 1000),
        y: randomRange(-1000, 1000),
        z: randomRange(0, 10000)
      };

      this._rectangles.push(rectangle);
    }
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildRectangles();
  }

  _buildRectangles() {
    const { innerWidth, innerHeight } = window;

    this._rectangles.forEach((rectangle) => {
      const { x, y } = rectangle;
      const perspective = this._focalLength / (this._focalLength + rectangle.z);
      // const size = randomRange(100, 200);
      const size = randomRange(100, 100);
      const gr = this.game.add.graphics();

      gr.lineStyle(5, 0x000000, 1);
      gr.beginFill(0xacacac, 1);
      // gr.beginFill(Phaser.Color.getRandomColor(0, 255, 1), 1);
      gr.drawRect(-size / 2, -size / 2, size, size);
      gr.endFill();

      gr.scale.set(perspective);
      gr.position.set(
        innerWidth / 2 + x * perspective,
        innerHeight / 2 + y * perspective
      );

      this._rectanglesShapes.push(gr);

      this.addChild(gr);
    });
  }

  _zSort(first, second) {
    return second.z - first.z;
  }
}
