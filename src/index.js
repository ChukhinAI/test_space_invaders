import
{
  preload,
  init,
  update,
  draw
} from './game'
//import {gameState} from "../../space-invaders-tefadivan-master-new/src/game";
//import {gameState} from "./space-invaders_last/src/game";

const canvas = document.getElementById("cnvs");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tickLength = 16; //ms
let lastTick;
let lastRender;
let stopCycle;

let audio = document.querySelector('audio');
audio.play().then(r => audio.play());

function run(tFrame)
{
    stopCycle = window.requestAnimationFrame(run);

    const nextTick = lastTick + tickLength;
    let numTicks = 0;

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - lastTick;
        numTicks = Math.floor(timeSinceTick / tickLength);
    }

    for (let i = 0; i < numTicks; i++) {
        lastTick = lastTick + tickLength;
        update(lastTick, stopGame);
    }

    draw(canvas, tFrame);
    lastRender = tFrame;
}

function stopGame()
{
    window.cancelAnimationFrame(stopCycle);
}

let boolStartGame = false;

//document.addEventListener('keypress', function (e)
//document.addEventListener('mousemove', function()
document.addEventListener('keypress', function (e)

{
    //if (e.key === 'Enter' && gameState.gameOver)
    // {
    //console.log("mouse");
    //if (e.key === 'Enter')
    //if (boolStartGame == false && e.key === 'm')
    if (e.key === 'm' || e.key === 'M' || e.key === 'ь')
    {
        //gameState.gameOver = false;
        //gameState.credit = 0;
        boolStartGame = true;
        StartAudioPlay(audio);
        //preload(onPreloadComplete);

    }
});

function StartAudioPlay(audio) {
    //let audio = document.querySelector('audio')
    if(audio.muted == false)
    {
        audio.muted = true;
        audio.pause();
        console.log("paused");
    }
    else
    {
        audio.muted = false;
        audio.play();
        console.log("played");
    }
    //audio.currentTime = 0;

}


//setTimeout(() => document.querySelector('audio').play(), 3000)
//setTimeout(() => {  console.log("World10!"); }, 1); // test 10 sec
//setTimeout(() => {StartAudioPlay(); }, 3000);

function onPreloadComplete()
{
  lastTick = performance.now();
  lastRender = lastTick;
  stopCycle = null;
  init(canvas);
  run();

}

//setTimeout(() => {  console.log("World10!"); }, 10000); // test 10 sec
//preload(onPreloadComplete); // without waiting

setTimeout(() => {  preload(onPreloadComplete); }, 44000); // with titles 47000

/*
setTimeout(function () {
    let audio = document.querySelector('audio')

    audio.muted = false
    audio.currentTime = 0
    audio.play()
}, 3000)

 */