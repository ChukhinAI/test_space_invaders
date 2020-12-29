export default class Bunker {
  constructor(x, y, sprite) {
    this.x = x;
  	this.y = y;
    this._sprite = sprite;
    this.lives = 10;
  }

  getBoundingRect() {
    return {x: (this.x) * this._sprite.scaleX, y: this.y, w: this._sprite.w * this._sprite.scaleX,
      h: this._sprite.h * this._sprite.scaleY};
  }

  draw(ctx, time) {
    ctx.drawImage(
      this._sprite.img,
      this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h , //this._sprite.h + 10,this._sprite.y - 10
        this.x * this._sprite.scaleX, this.y, this._sprite.w *
        this._sprite.scaleX, this._sprite.h * this._sprite.scaleY
    );

    ctx.fillStyle = "yellow";
    ctx.font = "22px Arial, jet-brains mono";
    ctx.fillText(this.lives, 
                 this.x * this._sprite.scaleX + this._sprite.w * this._sprite.scaleX / 2 - 10,
                 this.y - 40);
  }
}
