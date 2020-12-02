import Sprite from './sprite'
import Cannon from './cannon'
import Bullet from './bullet'
import Alien from './alien'
import Bunker from './bunker'
import InputHandler from './input-handler'


//import assetPath from '../assets/invaders_m_4.png'
import assetPath from '../assets/14_2.png'
const canvas = document.getElementById("cnvs");

//let ctx = canvas.getContext('2d'); // ACHTUNG!

let assets;
const sprites = {
    aliens: [],
    cannon: null,
    bunker: null,
    cannonShield: null
};
const gameState = {
    bullets: [],
    aliens: [],
    bunkers: [],
    alienBullets: [],
    cannon: null,
    score: 0
};
const inputHandler = new InputHandler();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function preload(onPreloadComplete) {
    //  It was at this moment I knew: I fckd up

     // sleep(2000);
    //setTimeout(() => {  console.log("World!"); }, 20000);

    assets = new Image();
    assets.addEventListener("load", () => {
        let scaleX = 2;
        let scaleY = 2;
        sprites.cannon = new Sprite(assets, 63, 0, 20, 32, scaleX, scaleY); // оригинал
        sprites.cannonShield = new Sprite(assets, 120, 3, 38, 42, scaleX, scaleY);

        sprites.bunker = new Sprite(assets, 84, 8, 35, 24, scaleX, scaleY);
        sprites.aliens = [
            [new Sprite(assets,  0, 0, 22, 16, scaleX, scaleY),
             new Sprite(assets,  0, 16, 22, 16, scaleX, scaleY)],

            [new Sprite(assets, 23, 0, 14, 16, scaleX, scaleY),
             new Sprite(assets, 23, 16, 14, 16, scaleX, scaleY)],

            [new Sprite(assets, 38, 0, 24, 16, scaleX, scaleY),
             new Sprite(assets, 38, 16, 24, 16, scaleX, scaleY)]
        ]
        
        onPreloadComplete();
    });
    assets.src = assetPath;
}

function classicFormation()
{
    const alienTypes = [0, 1, 2];
    for (let i = 0, len = alienTypes.length; i < len; i++) {
        for (let j = 0; j < 22; j++) {
            const alienType = alienTypes[i];
            
            let alienX = 28 + j*28;
            let alienY = 28 + i*28; // 30 + i*30;
            
            if (alienType === 1) {
                alienX += 3; // aliens of this type is a bit thinner
            }
            
            gameState.aliens.push(
                new Alien(alienX, alienY, sprites.aliens[alienType])
            );
        }
    }
}

function svinfylkingFormation()
{
    const alienTypes = [0, 1, 2];
    let split = 2; //2
    for (let i = 0; i < 5; i++) {
        for (let j = -2 + split; j < 22 - split; j++) {
            const alienType = alienTypes[i % 3];
            
            let alienX = 28 + j*28;
            let alienY = 28 + i*28;
            
            if (alienType === 1) {
                alienX += 3; // aliens of this type is a bit thinner
            }
            
            gameState.aliens.push(
                new Alien(alienX, alienY, sprites.aliens[alienType])
            );
        }
        split+=2;
    }
}

export function init(canvas) {
    if (Math.random() < 0.5)
        svinfylkingFormation();
    else
        classicFormation();
    
    for (let j = 0; j < 8; j++) {
        
        let bunkerX = 28 + j*90;
        
        gameState.bunkers.push(
            new Bunker(bunkerX, canvas.height - 250, sprites.bunker)
        );
    }
    
    gameState.cannon = new Cannon(
        100, canvas.height - 100,
        sprites.cannon
    );
}

export function update(time, stopGame) {
    if (inputHandler.isDown(37)) { // Left
        if (gameState.cannon.x - 4 >= 0) // somehow works
            gameState.cannon.x -= 4; 
    }
    
    if (inputHandler.isDown(39)) { // Right
        if ((gameState.cannon.x + 4 + gameState.cannon._sprite.w) * gameState.cannon._sprite.scaleX <= canvas.width)
            gameState.cannon.x += 4;
    }
    
    if (inputHandler.isPressed(32)) { // Space
        const bulletX = (gameState.cannon.x + gameState.cannon._sprite.w / 2) * gameState.cannon._sprite.scaleX
        const bulletY = gameState.cannon.y;
        gameState.bullets.push(new Bullet(bulletX, bulletY, -8, 2, 6, "#fff"));
    }

    gameState.bullets.forEach((b, i, self) => {
        if (b.update(true, canvas.height))
            self.splice(i, 1);
        
    })
    
    gameState.alienBullets.forEach((b, i, self) => {
        if (b.update(false, canvas.height))
            self.splice(i, 1);
    })
    
    gameState.aliens.forEach((alien, index, self) => {
        let bullet = alien.shoot(self.length);
        if (bullet !== undefined)
            gameState.alienBullets.push(bullet)
        alien.move(time)
    });
    
    if (collisionCheck())
    {
        draw = showLoseScreen; // aliens win(
        stopGame();
    }
    
    if (gameState.aliens.length == 0)
    {
        draw = showWinScreen; // humans win))
        stopGame();
    } 
}

function showLoseScreen()
{
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "100px Arial, sans-serif";
    ctx.fillText("Gameover!", canvas.width / 2 - 300, canvas.height / 2 - 200);
    ctx.fillText("Final score: " + gameState.score, canvas.width / 2 - 300, canvas.height / 2 + 120 - 200);
}

function showWinScreen()
{
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "100px Arial, sans-serif";
    ctx.fillText("You win!", canvas.width / 2 - 300, canvas.height / 2 - 200);
    ctx.fillText("Your score: " + gameState.score, canvas.width / 2 - 300, canvas.height / 2 + 120 - 200);
}

export let draw = function draw(canvas, time) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    gameState.aliens.forEach(a => a.draw(ctx, time));
    gameState.cannon.draw(ctx);
    gameState.cannonShield.draw(ctx);
    gameState.bullets.forEach(b => b.draw(ctx));
    gameState.bunkers.forEach(b => b.draw(ctx));
    gameState.alienBullets.forEach(b => b.draw(ctx));
    drawInfo(ctx)
}

function drawInfo(ctx)
{
    ctx.fillStyle = "#9FFF9F";
    ctx.fillRect(0, 50, ctx.width, 10);
    
    
    ctx.font = "24px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + gameState.score + "    Shields: " + gameState.cannon.lives, 20, 20 );
}

function rectIntersection(r1, r2)
{
     const leftX = Math.max(r1.x, r2.x);
     const rightX = Math.min(r1.x + r1.w, r2.x + r2.w);
     const topY = Math.max(r1.y,r2.y);
     const botY =  Math.min(r1.y + r1.h, r2.y + r2.h);
     if ((rightX > leftX) && (botY > topY)) {
         return true;
     }
     return false;
}

function activateShield() // в данный момент выпилена
{
    const ctx = canvas.getContext('2d');

    let cannon = gameState.cannon;

    //ctx.clearRect(0, 0, canvas.width, canvas.height); // achtung

    ctx.lineWidth = 50; // толщина линии

    //ctx.arc(cannon.x,cannon.y,300,0, Math.PI,true);
    ctx.arc(300, 700,200,0, Math.PI,true);
    console.log('y=', cannon.y)
    ctx.strokeStyle = 'red';
    ctx.fillStyle = "orange";
    ctx.stroke();
    console.log('est probitie');
}

function collisionCheck()
{
    let bullets = gameState.bullets;
    let alienBullets = gameState.alienBullets;
    let bunkers = gameState.bunkers;
    let aliens = gameState.aliens;
    let cannon = gameState.cannon;
    let gameOver = false;


    bullets.forEach((bullet, i, bullets) => {
        aliens.forEach((alien, j, aliens) => {
           if (rectIntersection(bullet, alien.getBoundingRect()))
           {
                bullets.splice(i, 1);
                aliens.splice(j, 1);
                gameState.score += 50;
           }
        });
    });
        
    alienBullets.forEach((alienBullet, i, alienBullets) => {
        if (rectIntersection(alienBullet, cannon.getBoundingRect()))
        {
            alienBullets.splice(i, 1);
            cannon.lives--;

            //activateShield(); // пусть хоть 1-2 секунды будет активирован, найти как это сделать// изменил стратегию

            if (cannon.lives <= 0)
            {
                gameOver = true;
            }
        }
        
        bunkers.forEach((bunker, j, bunkers) => {
           if (rectIntersection(bunker.getBoundingRect(), alienBullet.getBoundingRect()))
           {
                alienBullets.splice(i, 1);
                bunker.lives--;
                if (bunker.lives <= 0)
                {
                    bunkers.splice(j, 1);
                }
           }
        });
    });
    
    aliens.forEach((alien, i, aliens) => {
        let cB = cannon.getBoundingRect()
        let aB = alien.getBoundingRect()
        if (aB.y + aB.h > cB.y)
        {
            gameOver = true;
        }
        
        bunkers.forEach((bunker, j, bunkers) => {
            if (rectIntersection(bunker.getBoundingRect(), aB))
            {
                aliens.splice(i, 1);
                bunker.lives -= 8;
                if (bunker.lives <= 0)
                {
                    bunkers.splice(j, 1);
                }
            }
        });
    });
    return gameOver;
}
