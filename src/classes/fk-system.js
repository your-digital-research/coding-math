import { Arm } from "./arm";

export class FKSystem {
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

    this._arms.push(arm);

    if (this._lastArm) {
      arm.parent = this._lastArm;
    }
    this._lastArm = arm;

    this.update();
  }

  rotateArm(index, angle) {
    this._arms[index].angle = angle;
  }

  update() {
    for (let i = 0; i < this.arms.length; i += 1) {
      const arm = this._arms[i];

      if (arm.parent) {
        arm.x = arm.parent.endXForFK;
        arm.y = arm.parent.endYForFK;
      } else {
        arm.x = this._x;
        arm.y = this._y;
      }
    }
  }
}
