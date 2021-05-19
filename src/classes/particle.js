import { Vector } from "./vector";

export class Particle {
  constructor(x, y, speed, direction, gravity) {
    this._position = new Vector(x, y);
    this._velocity = new Vector(0, 0);

    this._velocity.length = speed;
    this._velocity.angle = direction;
    this._gravity = gravity ? new Vector(0, gravity) : new Vector(0, 0);
  }

  get position() {
    return this._position;
  }

  get velocity() {
    return this._velocity;
  }

  set position(value) {
    this._position = value;
  }

  set velocity(value) {
    this._velocity = value;
  }

  accelerate(accel) {
    this._velocity.addTo(accel);
  }

  rotate(angle) {
    this._position.angle = angle;
  }

  update() {
    this._velocity.addTo(this._gravity);
    this._position.addTo(this._velocity);
  }
}
