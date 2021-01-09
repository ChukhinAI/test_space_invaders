import Sprite from './sprite'
import Cannon from './cannon'
//import CannonShield from './cannon'
import Battleship from './battleship'
import Bullet from './bullet'
import Alien from './alien'
import Bunker from './bunker'
import InputHandler from './input-handler'

import assetPath from '../assets/14_3.png'
const canvas = document.getElementById("cnvs");


let assets;
const sprites = {
    aliens: [],
    cannon: null,
    bunker: null,
    cannonShield: null,
    Battleship: null
};

const gameState = {
    bullets: [],
    aliens: [],
    bunkers: [],
    alienBullets: [],
    cannon: null,
    cannonShield: null,
    Battleship: null,
    score: 0
};

const inputHandler = new InputHandler();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function preload(onPreloadComplete) {
    assets = new Image();
    assets.addEventListener("load", () => {
        let scaleX = 2;
        let scaleY = 2;
        sprites.cannon = new Sprite(assets, 63, 0, 20, 32, scaleX, scaleY); // оригинал
        //sprites.cannonShield = new Sprite(assets, 120, 3, 38, 42, scaleX, scaleY); // щиты
        //sprites.cannon = new Sprite(assets, 120, 3, 38, 42, scaleX, scaleY); // текущий
        sprites.battleship = new Sprite(assets, 5, 46, 127, 27, scaleX, scaleY);
        //sprites.cannon = new Sprite(assets, 5, 47, 102, 25, scaleX, scaleY); // для тестов

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
        for (let j = 0; j < 24; j++) { // 22
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


export function init(canvas) {
    classicFormation();
    for (let j = 0; j < 8; j++) {
        
        let bunkerX = 28 + j*90;
        
        gameState.bunkers.push(
            new Bunker(bunkerX, canvas.height - 250, sprites.bunker)
        );
    }
    
    gameState.cannon = new Cannon(
        //100, canvas.height - 100, // original
        100, 800, // norm
        sprites.cannon
    );
    //console.log(canvas.height)
    gameState.cannonShield = new Cannon(
        120, canvas.height - 120,
        sprites.cannonShield
    );

        gameState.battleship = new Battleship(
        //canvas.width - 300, canvas.height - 350,
        //Math.min(canvas.width / 2, 900), canvas.height - 400, // smaller, than new music
            1200, canvas.height - 400,
        sprites.battleship,
        console.log("battleship spawn in " + Math.min(canvas.width / 2, 600))
    );

}

function battleshipFire(bulletX, bulletY)
{
/*
    const bulletX = (gameState.battleship.x + gameState.battleship._sprite.w / 4.0) * // 4.5
    (gameState.battleship._sprite.scaleX + 2);
    const bulletY = gameState.battleship.y;
   */
    //gameState.bullets.push(new Bullet(bulletX, bulletY, -8, 2, 6, "#ffa"));
}

export function update(time, stopGame) {
    if (inputHandler.isDown(37)) { // Left
        if (gameState.cannon.x - 4 >= 0)
        {
            gameState.cannon.x -= 4;
            gameState.cannonShield.x -= 4;
        }
    }
    
    if (inputHandler.isDown(39)) { // Right
        if ((gameState.cannon.x + 4 + gameState.cannon._sprite.w) * gameState.cannon._sprite.scaleX <= canvas.width)
            {
            gameState.cannon.x += 4;
            gameState.cannonShield.x +=4;
            }
    }
    
    if (inputHandler.isPressed(32)) { // Space
        const bulletX = (gameState.cannon.x + gameState.cannon._sprite.w / 2) * gameState.cannon._sprite.scaleX;
        const bulletY = gameState.cannon.y;
        gameState.bullets.push(new Bullet(bulletX, bulletY, -8, 2, 6, "#fff"));
    }

    if (true) // потом булевскую переменную завести, типо поддержка с воздуха приехала
    {
        const bulletX = (gameState.battleship.x - 6 + gameState.battleship._sprite.w / 4.5) *
        (gameState.battleship._sprite.scaleX + 2); // + 2
        const bulletY = gameState.battleship.y;
        //console.log('bulletX position', Math.round(bulletX) % 2 )
        //console.log('battlesip pos', gameState.battleship.x)
        if (Math.round(bulletX) % 20 == 0)
        {
            let j = 0;
            let k = 100;
            for (let i = 0; i < 4; i++)
            {
                gameState.bullets.push(new Bullet(bulletX + j, bulletY, -5, 3, 7, "#ffa"));
                gameState.bullets.push(new Bullet(bulletX + k, bulletY, -5, 3, 7, "#ffa"));
                //console.log('bulletX in if', bulletX);
                j += 24;
                k += 24;
            }
        }
        //setInterval(function () {battleshipFire(bulletX, bulletY)}, 1000);

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
    ctx.fillText("Станция пала,", canvas.width / 2 - 100 * 4, canvas.height / 2 - 200);
    ctx.fillText("врага теперь не остановить", canvas.width / 2 - 100 * 7, canvas.height / 2 - 200 + 120);
    ctx.fillText("Ваши очки: " + gameState.score, canvas.width / 2 - 400, canvas.height / 2 + 120 * 2);
}

function showWinScreen()
{
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "100px Arial, sans-serif";
    ctx.fillText("Победа в руках человечества!", canvas.width / 2 - 200 * 4, canvas.height / 2 - 200);
    ctx.fillText("Ваши очки: " + gameState.score, canvas.width / 2 - 400, canvas.height / 2 + 120 - 200);
}


export let draw = function draw(canvas, time) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    gameState.aliens.forEach(a => a.draw(ctx, time));
    gameState.cannon.draw(ctx);
    //gameState.cannonShield.draw(ctx); // achtung! break game
    gameState.battleship.draw(ctx);
    gameState.bullets.forEach(b => b.draw(ctx));
    gameState.bunkers.forEach(b => b.draw(ctx));
    gameState.alienBullets.forEach(b => b.draw(ctx));
    drawInfo(ctx);
    let img = new Image();
    img.src = "./background.png";
    img.onload = function (ctx) {

        ctx.clip();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);//Первый 0=X
        ctx.restore();
    };
}

function drawInfo(ctx)
{
    //console.log("ctx.width = " + canvas.width);
    ctx.fillStyle = "#9FFF9F";
    ctx.fillRect(0, 50, ctx.width, 10);

    ctx.font = "24px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Очки: " + gameState.score + "    Щиты: " + gameState.cannon.lives +
        "    Дистанция до подкреплений: " +
        Math.max(0, (Math.round(gameState.battleship.x)) - 126 * 4),
        20, 20 );
    //ctx.fillText("time to reinforcements:" , gameState.battleship.x)

    gameState.battleship.x = gameState.battleship.x - 0.3 // achtung!!!

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

    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 50; // толщина линии

    //ctx.arc(cannon.x,cannon.y,300,0, Math.PI,true);
    ctx.arc(300, 700,200,0, Math.PI,true);
    //console.log('y=', cannon.y)
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
    let cannonShield = gameState.cannon;
    let battleship = gameState.battleship;
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

        
    alienBullets.forEach((alienBullet, i, alienBullets) =>
    {

        if (rectIntersection(alienBullet, battleship.getBoundingRect()))
        {
            alienBullets.splice(i, 1);
        }
        if (rectIntersection(alienBullet, cannon.getBoundingRect()))
        {
            alienBullets.splice(i, 1);
            cannon.lives--;

            //activateShield(); //  изменил стратегию

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
                console.log('n bumkers = ' + bunkers.length);
           }
        });
    });

    if (bunkers.length < 1)
    {
        console.log('bunkers len < 1');
        gameOver = true;
        //showLoseScreen();
    }

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
