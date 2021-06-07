import { Vector } from "./vector";

export class Particle {
  constructor(x = 0, y = 0, radius = 0, speed = 0, direction = 0, gravity = 0) {
    this._mass = 1;
    this._bounce = -1;
    this._friction = 1;
    this._radius = radius;
    this._position = new Vector(x, y);
    this._velocity = new Vector(0, 0);

    this._velocity.length = speed;
    this._velocity.angle = direction;
    this._gravity = gravity ? new Vector(0, gravity) : new Vector(0, 0);
  }

  get mass() {
    return this._mass;
  }

  get bounce() {
    return this._bounce;
  }

  get friction() {
    return this._friction;
  }

  get radius() {
    return this._radius;
  }

  get position() {
    return this._position;
  }

  get velocity() {
    return this._velocity;
  }

  set mass(value) {
    this._mass = value;
  }

  set bounce(value) {
    this._bounce = value;
  }

  set friction(value) {
    this._friction = value;
  }

  set radius(value) {
    this._radius = value;
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

  angleTo(particle) {
    return Math.atan2(
      particle.position.y - this._position.y,
      particle.position.x - this._position.x
    );
  }

  distanceTo(particle) {
    const dx = particle.position.x - this._position.x;
    const dy = particle.position.y - this._position.y;

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  gravityTo(particle) {
    const gravity = new Vector(0, 0);
    const distance = this.distanceTo(particle);

    gravity.length = particle.mass / Math.pow(distance, 2);
    gravity.angle = this.angleTo(particle);

    this._velocity.addTo(gravity);
  }

  update() {
    this._velocity.multiplyBy(this._friction);
    this._velocity.addTo(this._gravity);
    this._position.addTo(this._velocity);
  }
}
