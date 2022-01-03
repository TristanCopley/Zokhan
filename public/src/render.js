class Renderer {

    constructor() {

        this.center = {

            x: window.innerWidth / 2,
            y: window.innerHeight / 2

        };

        this.adjust = {

            x: 0,
            y: 0

        }

        this.scale = (c.width / 1920) > (c.height / 1080) ? c.width / 1920 : c.height / 1080;

        this.aspectRatio = c.width / c.height / (16 / 9)

        this.screen = null;

        this.zoom = 0.8;

    };

}

function resizeCanvas() {

    // Find aspect ratio
    r.aspectRatio = window.innerWidth / window.innerHeight / (16 / 9)

    // Resizes canvas to window size
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    // Finds center of screen
    r.center.x = c.width / 2;
    r.center.y = c.height / 2;

    // Finds the scale required to maintain FOV (Player sees no more than a 1920x1080 screen)
    r.scale = (c.width / 1920) > (c.height / 1080) ? c.width / 1920 : c.height / 1080;

    // Correct adjust so everything is centered
    if (r.aspectRatio > 1) {

        r.adjust.x = 0;
        r.adjust.y = r.center.y - r.center.y / r.aspectRatio;

    } else {

        r.adjust.x = r.center.x - r.center.x / r.aspectRatio;
        r.adjust.y = 0;

    }

    // Disable anti-aliasing
    ctx.imageSmoothingEnabled = false;

}

function renderPoint(point) {

    return [point[0] * r.scale * r.zoom - cam.position.current.x * r.scale * r.zoom + r.adjust.x, point[1] * r.scale * r.zoom - cam.position.current.y * r.scale * r.zoom - r.adjust.y];

}

function drawSprite(image, rotation, flip, x, y, width, height) {

    let newPoint = renderPoint([x,y]);

    x = flip * newPoint[0];
    y = newPoint[1];

    ctx.save();
    ctx.rotate(rotation);
    ctx.scale(flip , 1);
    ctx.drawImage(image, -width / 2 * r.scale * r.zoom + Math.cos(rotation) * x + Math.sin(flip * rotation) * y, -height / 2 * r.scale * r.zoom + Math.sin(flip * -rotation) * x + Math.cos(rotation) * y, width * r.scale * r.zoom, height * r.scale * r.zoom);
    ctx.restore();

}

function drawElement(image, x, y, width, height) {

    ctx.save();
    ctx.drawImage(image, -width / 2 * r.scale + x * r.scale, -height / 2 * r.scale + y * r.scale, width * r.scale, height * r.scale);
    ctx.restore();

}