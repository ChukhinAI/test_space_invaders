export default class Cannon {
  constructor(x, y, sprite) {
    this.x = x;
  	this.y = y;
    this._sprite = sprite;
    this.lives = 3;
  }

  draw(ctx, time) {
    ctx.drawImage(
      this._sprite.img,
      this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h,
      this.x * this._sprite.scaleX, this.y, this._sprite.w * this._sprite.scaleX, this._sprite.h * this._sprite.scaleY
    );
  }
  
  getBoundingRect()
  {
    return {x: this.x * this._sprite.scaleX, y: this.y, w: this._sprite.w * this._sprite.scaleX,
            h: this._sprite.h * this._sprite.scaleY};
  }
}
