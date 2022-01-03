let socket = io();

let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let r = new Renderer();
let cam = new Camera();
//let sc = new SimpleCollision2D();
let a = new Assets(); // SO HACKY
a.cacheAllAssets();

let dt = 0.0;
let oldTimeStamp = 0.0;

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

let player = {

    x: 0,
    y: 100

}

let UUID;
let positions = [];

socket.on('identify', (id) => {

    UUID = id

    console.log(UUID)

})

socket.on('positionData', (p) => {

    positions = p

})

// Event listeners for input manager ( Can fire before main.js loads )
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', e => { updateMouse(e) } )
document.addEventListener('mouseup', function(){ mouse.leftClick = false; });
document.addEventListener('mousedown', function(){ mouse.leftClick = true; });
document.addEventListener('mouseenter', function(){ mouse.idle = false; });
document.addEventListener('mouseleave', function(){ mouse.idle = true; });

// Game Loop
function gameLoop(timeStamp) {

    // Calculate the number of seconds passed since the last frame
    dt = timeStamp - oldTimeStamp;
    oldTimeStamp = timeStamp;

    ctx.clearRect(0 ,0, c.width, c.height);

    ctx.fillStyle = 'red';

    if(getKeyState('up')) player.y -= 1
    if(getKeyState('down')) player.y += 1
    if(getKeyState('left')) player.x -= 1
    if(getKeyState('right')) player.x += 1

    if (UUID) {

        socket.emit('updatePosition', [player.x, player.y]);

    }

    for (let i = 0; i < positions.length; i++) {

        if (positions[i] !== null) {

            ctx.fillRect(positions[i][0] - 10, positions[i][1] - 10, 20, 20)

        }

    }

    // Draws cursor ( You should make cursor its own function with custom draw call bc rotation and flip and camera position do not affect it )
    if (mouse.idle === false) drawElement(a['misc']['cursor'], mouse.position.x + 12, mouse.position.y + 12, 24, 24);

    window.requestAnimationFrame(gameLoop);

}

// Start gameLoop
gameLoop(0);

