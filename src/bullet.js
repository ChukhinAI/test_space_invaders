export default class Bullet {
  constructor(x, y, vy, w, h, color) {
    this.x = x;
  	this.y = y;
  	this.vy = vy;
  	this.w = w;
  	this.h = h;
  	this.color = color;
  }

  update(dir, cnvsHeight) {
      if (dir)
        this.y += this.vy;
      else
        this.y -= this.vy;
      if (this.y > cnvsHeight || this.y + this.w < 0)
          return true;
      return false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
  	ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  
  getBoundingRect()
  {
    return {x: this.x, y: this.y, w: this.w, h: this.h};
  }
}
