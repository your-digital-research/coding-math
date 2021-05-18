export class Vector {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get angle() {
    return Math.atan2(this._y, this._x);
  }

  get length() {
    return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
  }

  set x(value) {
    this._x = value;
  }

  set y(value) {
    this._y = value;
  }

  set angle(angle) {
    const length = this.length;
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  set length(length) {
    const angle = this.angle;
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  add(vector) {
    return new Vector(this._x + vector.x, this._y + vector.y);
  }

  subtract(vector) {
    return new Vector(this._x - vector.x, this._y - vector.y);
  }

  multiply(scalar) {
    return new Vector(this._x * scalar, this._y * scalar);
  }

  divide(scalar) {
    return new Vector(this._x / scalar, this._y / scalar);
  }

  addTo(vector) {
    this._x += vector.x;
    this._y += vector.y;
  }

  subtractFrom(vector) {
    this._x -= vector.x;
    this._y -= vector.y;
  }

  multiplyBy(scalar) {
    this._x *= scalar;
    this._y *= scalar;
  }

  divideBy(scalar) {
    this._x /= scalar;
    this._y /= scalar;
  }
}
