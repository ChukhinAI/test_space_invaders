import Bullet from './bullet'

export default class Alien {
  constructor(x, y, [spriteA, spriteB]) {
    this.x = x;
  	this.y = y;
    this._spriteA = spriteA;
    this._spriteB = spriteB;
    //this.moveDir = false; // left
    this.mooving = false;
    this.steps = 1;
    this.lastSecondMove = 0;
  }

    shoot(count) {
        let shouldShoot = Math.random() < 1 / count / 6;
        if (shouldShoot)
        {
            return new Bullet((this.x + this._spriteA.w / 2) * this._spriteA.scaleX,
             (this.y + this._spriteA.h) * this._spriteA.scaleY, -2, 2, 2, "yellow")
        }
        return undefined;
    }

  draw(ctx, time) {
    let sp = (Math.ceil(time / 1000) % 2 === 0) ? this._spriteA : this._spriteB;

    ctx.drawImage(
      sp.img,
      sp.x, sp.y, sp.w, sp.h,
      this.x * sp.scaleX, this.y * sp.scaleY, sp.w * sp.scaleX, sp.h * sp.scaleY
    );
  }
    move(time) {
        let second = Math.ceil(time / 1000)
        if (second == this.lastSecondMove)
            return;
        this.lastSecondMove = second
        let shouldMoveHorizontal = (second % 2 === 0);
        let shouldMoveDown = (second % 5 === 0);
        if (shouldMoveHorizontal)
        {
            //if (this.moveDir) // mooving
            if (this.mooving)
            {
                this.x += 20;
            }
            else
            {
                this.x -= 20;
            }
            this.steps--;
            if (this.steps == 0)
            {
                //this.moveDir = !this.moveDir
                this.mooving = !this.mooving
                this.steps = 2
            }
        }
        if (shouldMoveDown)
        {
            this.y += 10;
        }
    }

  getBoundingRect()
  {
    let sp = this._spriteA;
    return {x: this.x * sp.scaleX, y: this.y * sp.scaleY, w: sp.w * sp.scaleX, h: sp.h * sp.scaleY};
  }
}
