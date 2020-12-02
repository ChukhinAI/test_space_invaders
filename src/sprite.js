export default class Sprite {
  constructor(img, x, y, w, h, scX, scY) {
    this.img = img;
  	// this.x = (x + x + 1) / 2 - 1/2; // +1
    this.x = x + 2;
  	this.y = y + 3;
  	this.w = w;
  	this.h = h;
    this.scaleX = scX;
    this.scaleY = scY;
  }
}
