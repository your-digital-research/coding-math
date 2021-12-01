import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getBasicGridConfig } from "../../configs/grid-config";

export class ArrayMathExample extends Phaser2Grid {
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
    this._updateNodes();
  }

  _updateNodes() {
    const { innerWidth, innerHeight } = window;
    this.removeChild(this._lines);
    this.removeChild(this._points);

    for (let i = 0; i < this._nodes.length; i += 1) {
      const node = this._nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x > innerWidth) {
        node.x = 0;
      } else if (node.x < 0) {
        node.x = innerWidth;
      }

      if (node.y > innerHeight) {
        node.y = 0;
      } else if (node.y < 0) {
        node.y = innerHeight;
      }
    }

    this._buildPoints();
    this._buildLines();
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
    this._nodes = [];

    this._lines;
    this._points;
    this._nodesCount = 100;
    this._maxDistance = 100;

    this._area = new Phaser.Group(this.game);
  }

  _getFromGrid(row, col) {
    return this._grid[row * this._numberOfCol + col];
  }

  _getToGrid(row, col) {
    this._grid[row * this._numberOfCol + col] = value;
  }

  _getPixelFromImageData(x, y, imageDate) {
    const index = (y * imageDate.width + x) * 4;
    const red = imageDate[index];
    const green = imageDate[index + 1];
    const blue = imageDate[index + 2];
    const alpha = imageDate[index + 3];

    return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
  }

  _build() {
    super.build(this.getGridConfig());

    this._setBounds();
    this._drawBounds();

    this._buildNodes();
    this._buildPoints();
    this._buildLines();
  }

  _buildNodes() {
    const { innerWidth, innerHeight } = window;

    for (let i = 0; i < this._nodesCount; i += 1) {
      this._nodes.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        vx: Math.random() * 10 - 5,
        vy: Math.random() * 10 - 5
      });
    }
  }

  _buildPoints() {
    const gr = this.game.add.graphics();

    for (let i = 0; i < this._nodes.length; i += 1) {
      const node = this._nodes[i];
      const { x, y } = node;

      gr.beginFill(0x000000, 1);
      gr.drawCircle(x, y, 10);
      gr.endFill();
    }

    this.addChild((this._points = gr));
  }

  _buildLines() {
    const gr = this.game.add.graphics();

    for (let i = 0; i < this._nodes.length - 1; i += 1) {
      const nodeA = this._nodes[i];
      for (let j = i + 1; j < this._nodes.length; j += 1) {
        const nodeB = this._nodes[j];
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this._maxDistance) {
          gr.lineStyle(2 - dist / this._maxDistance, 0xbebebe, 1);
          gr.moveTo(nodeA.x, nodeA.y);
          gr.lineTo(nodeB.x, nodeB.y);
          gr.endFill();
        }
      }
    }

    this.addChild((this._lines = gr));
  }
}
