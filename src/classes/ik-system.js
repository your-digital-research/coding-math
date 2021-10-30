import { Arm } from "./arm";

export class IKSystem {
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
    this._arms = [];
    this._lastArm = null;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get arms() {
    return this._arms;
  }

  get lastArm() {
    return this._lastArm;
  }

  set lastArm(value) {
    this._lastArm = value;
  }

  set x(value) {
    this._x = value;
  }

  set y(value) {
    this._y = value;
  }

  addArm(length) {
    const arm = new Arm(0, 0, length, 0);

    if (this._lastArm) {
      arm.x = this._lastArm.endXForIK;
      arm.y = this._lastArm.endYForIK;
      arm.parent = this._lastArm;
    } else {
      arm.x = this._x;
      arm.y = this._y;
    }

    this.lastArm = arm;

    this._arms.push(arm);
  }

  drag(x, y) {
    this._lastArm.drag(x, y);
  }
}
