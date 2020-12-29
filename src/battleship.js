export default class Battleship {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this._sprite = sprite;
        this.lives = 1300;
    }

    draw(ctx, time) {
        ctx.drawImage(
            this._sprite.img,
            this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h,
            this.x * (this._sprite.scaleX + 2), this.y, this._sprite.w * (this._sprite.scaleX + 2),
            this._sprite.h * (this._sprite.scaleY + 2)
        );
    }

    getBoundingRect()
    {
        return {x: this.x * (this._sprite.scaleX + 2), y: this.y, w: this._sprite.w * (this._sprite.scaleX + 2),
            h: this._sprite.h * (this._sprite.scaleY + 2)};
    }
}
