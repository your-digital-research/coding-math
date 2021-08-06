export class ParticleOptimized {
  constructor(x = 0, y = 0, speed = 0, direction = 0, gravity = 0) {
    this._x = x;
    this._y = y;
    this._mass = 1;
    this._radius = 0;
    this._bounce = -1;
    this._friction = 1;
    this._gravity = gravity;
    this._springs = [];
    this._gravitations = [];
    this._vx = Math.cos(direction) * speed;
    this._vy = Math.sin(direction) * speed;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get vx() {
    return this._vx;
  }

  get vy() {
    return this._vy;
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

  get gravity() {
    return this._gravity;
  }

  get springs() {
    return this._springs;
  }

  get gravitations() {
    return this._gravitations;
  }

  get speed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  get heading() {
    return Math.atan2(this.vy, this.vx);
  }

  set x(value) {
    this._x = value;
  }

  set y(value) {
    this._y = value;
  }

  set vx(value) {
    this._vx = value;
  }

  set vy(value) {
    this._vy = value;
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

  set gravity(value) {
    this._gravity = value;
  }

  set speed(value) {
    const heading = this.heading;
    this.vx = Math.cos(heading) * value;
    this.vy = Math.sin(heading) * value;
  }

  set heading(value) {
    const speed = this.speed;
    this.vx = Math.cos(value) * speed;
    this.vy = Math.sin(value) * speed;
  }

  addGravitation(point) {
    this.removeGravitation(point);
    this.gravitations.push(point);
  }

  removeGravitation(point) {
    this.gravitations.forEach((gravitation, index) => {
      if (gravitation === point) {
        this.gravitations.splice(index, 1);
        return;
      }
    });
  }

  addSpring(point, k, length) {
    this.removeSpring(point);
    this.springs.push({
      point: point,
      k: k,
      length: length
    });
  }

  removeSpring(point) {
    this.springs.forEach((spring, index) => {
      if (spring === point) {
        this.springs.slice(index, 1);
        return;
      }
    });
  }

  accelerate(ax, ay) {
    this._vx += ax;
    this._vy += ay;
  }

  rotate(angle) {
    this._position.angle = angle;
  }

  angleTo(particle) {
    return Math.atan2(particle.y - this._y, particle.x - this._x);
  }

  distanceTo(particle) {
    const dx = particle.x - this._x;
    const dy = particle.y - this._y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  gravityTo(particle) {
    const dx = particle.x - this._x;
    const dy = particle.y - this._y;
    const distSQ = dx * dx + dy * dy;
    const dist = Math.sqrt(distSQ);
    const force = particle.mass / distSQ;
    const ax = (dx / dist) * force;
    const ay = (dy / dist) * force;

    this._vx += ax;
    this._vy += ay;
  }

  springTo(point, k, length) {
    const dx = point.x - this.x;
    const dy = point.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const springForce = (distance - length || 0) * k;

    this.vx += (dx / distance) * springForce;
    this.vy += (dy / distance) * springForce;
  }

  handleSprings() {
    this.springs.forEach((spring) => {
      this.springTo(spring.point, spring.k, spring.length);
    });
  }

  handleGravitations() {
    this.gravitations.forEach((point) => {
      this.gravityTo(point);
    });
  }

  update() {
    this.handleSprings();
    this.handleGravitations();

    this._vx *= this._friction;
    this._vy *= this._friction;
    this._vy += this._gravity;
    this._x += this._vx;
    this._y += this._vy;
  }
}
