import {
  preload,
  init,
  update,
  draw
} from './game'

const canvas = document.getElementById("cnvs");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tickLength = 16; //ms
let lastTick;
let lastRender;
let stopCycle;

function run(tFrame) {
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

function stopGame() {
    window.cancelAnimationFrame(stopCycle);
}

function onPreloadComplete() {
  lastTick = performance.now();
  lastRender = lastTick;
  stopCycle = null;
  init(canvas);
  run();
}

//setTimeout(() => {  console.log("World10!"); }, 10000);
preload(onPreloadComplete); // without waiting
//setTimeout(() => {  preload(onPreloadComplete); }, 69000); // with titles
