const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

var main = document.getElementById("main");

let screenWidth;
let screenHeight;
let screenOffsetX;
let screenOffsetY;

const lockAsp = 16/9;

c.height = main.clientHeight;
c.width = main.clientWidth;

//console.log(c.height);
//console.log(c.width);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let backgroundX = 0;
let pipeCooldown = 0;
let Score = 0;

const birb = {}

birb.y = 50;
birb.speedY = 2;
birb.rotate = 0;

let pipes = []

function pipe(x, y) {
    this.x = x;
    this.y = y;
}

const keyPress = {}

keyPress.Space = false;

const TPU = 1000/60;
const TPF = 1000/60;
let frames = 0;
let updates = 0;
let d = new Date();
let previousTime = d.getTime();
let currentTime = 0;
let timeElapsed = 0;
let deltaUpdates = 0;
let deltaFrames = 0;
let deltaChecks = 0;

let {
    MouseX,
    MouseY
} = 0

function updateMouse(event) {
    MouseX = event.clientX;
    MouseY = event.clientY;
    //console.log(MouseX, MouseY);
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case " ":
            keyPress.Space = true;
            break;
    }
    event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case " ":
            keyPress.Space = false;
            break;
    }
    event.preventDefault();
}, true);

function getAsp(img) {return img.width / img.height;}

function pointTowards(x, y, tx, ty) {
    let delta_x = x - tx;
    let delta_y = ty - y;
    if (delta_y == 0) {
        if (delta_x < 0) {
            return -90;
        } else {
            return 90;
        }
    } else {
        if (delta_y < 0) {
            return 180 + Math.atan(delta_x / delta_y)/Math.PI*180;
        } else {
            return Math.atan(delta_x / delta_y)/Math.PI*180;
        }
    }
}

function stampImage(img, x, y, width, height, rotate = 0, cx = 0, cy = 0) {
    x += screenOffsetX
    y += screenOffsetY
    
    rotate = rotate*Math.PI/180;
    ctx.save();
    ctx.translate(x, y);
    ctx.translate(cx, cy);
    ctx.rotate(rotate);
    ctx.translate(-cx, -cy);
    ctx.scale(width/img.width, height/img.height);
    ctx.drawImage(img, -img.width/2, -img.height/2);
    ctx.restore();
}

const gameLoop = async () => {
    await sleep(50);
    while (true) {
        d = new Date();
        currentTime = d.getTime();
        timeElapsed = currentTime - previousTime;
        deltaUpdates += timeElapsed / TPU;
        deltaFrames += timeElapsed / TPF;
        deltaChecks += timeElapsed / 1000;
        previousTime = currentTime;

        if (deltaUpdates >= 1) {
            updateMain();
            deltaUpdates--;
            updates++;
        }
        if (deltaFrames >= 1) {
            renderMain();
            deltaFrames--;
            frames++;
        }
        if (deltaChecks >= 1) {
            console.log(updates, frames);
            updates = 0;
            frames = 0;
            deltaChecks--;
        }
        await sleep(1);
    }
}

gameLoop();



/*
c.height = main.clientHeight;
c.width = main.clientWidth;
ctx.clearRect(0, 0, c.width, c.height);
stampImage(img, 500, 500, 300*getAsp(img), 300, angle, 0, -50);
ctx.beginPath();
ctx.fillStyle = "red";
ctx.fillRect(495, 445, 10, 10);
ctx.fillText(MouseX + ", " + MouseY, 20, 20);
ctx.stroke();
//angle += angle/200;
//console.log(angle);
angle = pointTowards(500, 450, MouseX, MouseY);
console.log(angle);
*/