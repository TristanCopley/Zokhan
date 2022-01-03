// Dynamic key handler
let key = {

    bind: {

        up: [87, 32],
        down: [83, null],
        left: [65, null],
        right: [68, null],

    },

    state: {

        right: [false, false],
        left: [false, false],
        up: [false, false],
        down: [false, false]

    }

}

// Declare mouse object
const mouse = {

    position: {

        x: 0,
        y: 0

    },

    locked: false,

    leftClick: false,

    idle: true

};

function getKeyDownState(e, name) {

    if (e.keyCode ===  key.bind[name][0]) {
        key.state[name][0] = true;
    }

    if (e.keyCode ===  key.bind[name][1]) {
        key.state[name][1] = true;
    }

}

function getKeyUpState(e, name) {

    if (e.keyCode ===  key.bind[name][0]) {
        key.state[name][0] = false;
    }

    if (e.keyCode ===  key.bind[name][1]) {
        key.state[name][1] = false;
    }

}

function getKeyState(name) {

    return (key.state[name][0] || key.state[name][1]);

}

// Detects key down
function keyDownHandler(e) {

    getKeyDownState(e, 'right');
    getKeyDownState(e, 'left');
    getKeyDownState(e, 'up');
    getKeyDownState(e, 'down');

}

function keyUpHandler(e) {

    getKeyUpState(e, 'right');
    getKeyUpState(e, 'left');
    getKeyUpState(e, 'up');
    getKeyUpState(e, 'down');

}

function updateMouse(e) {

    // Quite possibly redundant if I don't utilize cursor lock
    if (document.pointerLockElement === c) {

        mouse.locked = true;
        mouse.position.x += e.movementX;
        mouse.position.y += e.movementY;

        if (mouse.position.x < 0) mouse.position.x = 0
        if (mouse.position.x > c.width) mouse.position.x = c.width
        if (mouse.position.y < 0) mouse.position.y = 0
        if (mouse.position.y > c.height) mouse.position.y = c.height

    } else {

        mouse.locked = false;
        mouse.position.x = e.offsetX / r.scale;
        mouse.position.y = e.offsetY / r.scale;

    }

}