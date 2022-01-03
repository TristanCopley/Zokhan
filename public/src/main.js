let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let r = new Renderer();
let cam = new Camera();

let dt = 0.0;
let oldTimeStamp = 0.0;

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

// Game Loop
function gameLoop(timeStamp) {

    // Calculate the number of seconds passed since the last frame
    dt = timeStamp - oldTimeStamp;
    oldTimeStamp = timeStamp;

    ctx.clearRect(0 ,0, c.width, c.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 50, 50);

    window.requestAnimationFrame(gameLoop);

}

// Start gameLoop
gameLoop(0);

