import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class StarsIntersectionExample extends Phaser2Grid {
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
    this._updateStars();
  }

  _updateStars() {
    const { x, y } = this.game.input.activePointer;
    this._firstStar.x = x;
    this._firstStar.y = y;
    this._firstStarShape.position.set(x, y);

    if (this._checkStarCollision(this._firstStar, this._secondStar)) {
      this._secondStarShape.alpha = 0.5;
    } else {
      this._secondStarShape.alpha = 1;
    }

    if (this._firstStarShape) {
      this._firstStarShape.destroy();
      this._buildFirstStar();
    }
  }

  _checkStarCollision(starA, starB) {
    for (let i = 0; i < starA.points.length; i += 1) {
      const p1 = starA.points[i];
      const p2 = starA.points[(i + 1) % starA.points.length];

      for (let j = 0; j < starB.points.length; j += 1) {
        const p3 = starB.points[j];
        const p4 = starB.points[(j + 1) % starB.points.length];

        if (this._segmentIntersect(p1, p2, p3, p4)) {
          return true;
        }
      }
    }
    return false;
  }

  _updateStarPosition(star) {
    for (let i = 0; i < star.points.length; i += 1) {
      star.points[i].x = star.x + star.offset[i].x;
      star.points[i].y = star.y + star.offset[i].y;
    }
  }

  _init() {
    const { innerWidth, innerHeight } = window;

    this._firstStar = {
      x: 0,
      y: 0,
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ],
      offset: [
        { x: 100, y: 0 },
        { x: 40, y: 29 },
        { x: 31, y: 95 },
        { x: -15, y: 48 },
        { x: -81, y: 59 },
        { x: -50, y: 0 },
        { x: -81, y: -59 },
        { x: -15, y: -48 },
        { x: 31, y: -95 },
        { x: 40, y: -29 }
      ]
    };

    this._secondStar = {
      x: innerWidth / 2,
      y: innerHeight / 2,
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ],
      offset: [
        { x: 100, y: 0 },
        { x: 40, y: 29 },
        { x: 31, y: 95 },
        { x: -15, y: 48 },
        { x: -81, y: 59 },
        { x: -50, y: 0 },
        { x: -81, y: -59 },
        { x: -15, y: -48 },
        { x: 31, y: -95 },
        { x: 40, y: -29 }
      ]
    };
  }

  _build() {
    super.build(this.getGridConfig());

    this._buildFirstStar();
    this._buildSecondStar();
  }

  _buildFirstStar() {
    this._updateStarPosition(this._firstStar);

    const gr = this.game.add.graphics();

    gr.beginFill(0x000000, 1);
    gr.moveTo(this._firstStar.points[0].x, this._firstStar.points[0].y);

    for (let i = 1; i < this._firstStar.points.length; i += 1) {
      gr.lineTo(this._firstStar.points[i].x, this._firstStar.points[i].y);
    }

    gr.endFill();

    this.addChild((this._firstStarShape = gr));
  }

  _buildSecondStar() {
    this._updateStarPosition(this._secondStar);

    const gr = this.game.add.graphics();

    gr.beginFill(0x000000, 1);
    gr.moveTo(this._secondStar.points[0].x, this._secondStar.points[0].y);

    for (let i = 1; i < this._secondStar.points.length; i += 1) {
      gr.lineTo(this._secondStar.points[i].x, this._secondStar.points[i].y);
    }

    gr.endFill();

    this.addChild((this._secondStarShape = gr));
  }

  _segmentIntersect(p1, p2, p3, p4) {
    const A1 = p2.y - p1.y;
    const B1 = p1.x - p2.x;
    const C1 = A1 * p1.x + B1 * p1.y;

    const A2 = p4.y - p3.y;
    const B2 = p3.x - p4.x;
    const C2 = A2 * p3.x + B2 * p3.y;

    const denominator = A1 * B2 - A2 * B1;

    if (denominator === 0) {
      return null;
    }

    const intersectX = (B2 * C1 - B1 * C2) / denominator;
    const intersectY = (A1 * C2 - A2 * C1) / denominator;
    const rx1 = (intersectX - p1.x) / (p2.x - p1.x);
    const ry1 = (intersectY - p1.y) / (p2.y - p1.y);
    const rx2 = (intersectX - p3.x) / (p4.x - p3.x);
    const ry2 = (intersectY - p3.y) / (p4.y - p3.y);

    if (
      ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1)) &&
      ((rx2 >= 0 && rx2 <= 1) || (ry2 >= 0 && ry2 <= 1))
    ) {
      return {
        x: intersectX,
        y: intersectY
      };
    } else {
      return null;
    }
  }
}
