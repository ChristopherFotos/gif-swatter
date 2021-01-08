export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  setX(value) {
    this.x = value;
  }

  getY() {
    return this.y;
  }

  setY(value) {
    this.y = value;
  }

  setAngle(angle) {
    var length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  setLength(length) {
    var angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

 

  addTo(v2) {
    this.x += v2.x;
    this.y += v2.y;
  }

  multiplyBy(value) {
    this.x *= value;
    this.y *= value;
  }
}
