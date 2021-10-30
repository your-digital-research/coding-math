export class Arm {
  constructor(x = 0, y = 0, length = 50, angle = 0, parent = null) {
    this._x = x;
    this._y = y;
    this._length = length;
    this._angle = angle;
    this._parent = parent;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get length() {
    return this._length;
  }

  get angle() {
    return this._angle;
  }

  get parent() {
    return this._parent;
  }

  set x(value) {
    this._x = value;
  }

  set y(value) {
    this._y = value;
  }

  set length(value) {
    this._length = value;
  }

  set angle(value) {
    this._angle = value;
  }

  set parent(value) {
    this._parent = value;
  }

  get endXForFK() {
    let angle = this._angle;
    let parent = this._parent;

    while (parent) {
      angle += parent.angle;
      parent = parent.parent;
    }

    return this._x + Math.cos(angle) * this._length;
  }

  get endYForFK() {
    let angle = this._angle;
    let parent = this._parent;

    while (parent) {
      angle += parent.angle;
      parent = parent.parent;
    }

    return this._y + Math.sin(angle) * this._length;
  }

  get endXForIK() {
    return this._x + Math.cos(this._angle) * this._length;
  }

  get endYForIK() {
    return this._y + Math.sin(this._angle) * this._length;
  }

  pointAt(x, y) {
    const dx = x - this._x;
    const dy = y - this._y;

    this._angle = Math.atan2(dy, dx);
  }

  drag(x, y) {
    this.pointAt(x, y);

    this._x = x - Math.cos(this._angle) * this._length;
    this._y = y - Math.sin(this._angle) * this._length;

    if (this._parent) {
      this._parent.drag(this._x, this._y);
    }
  }
}
