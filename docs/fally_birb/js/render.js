const pipe1Img = new Image();
const pipe2Img = new Image();
const backgroundImg = new Image();
const birbImg = new Image();

pipe1Img.src = './images/pipe1.png';
pipe2Img.src = './images/pipe2.png'
backgroundImg.src = './images/background_and_road.png';
birbImg.src = 'images/birb.png';

function updateAsp(targetAsp) {
    let currentAsp = c.width/c.height

    if (currentAsp == targetAsp || targetAsp == 0) {
        screenWidth = c.width;
        screenHeight = c.height;
        screenOffsetX = 0;
        screenOffsetY = 0;
        return;
    }

    if (currentAsp > targetAsp) {
        screenWidth = c.height*targetAsp
        screenHeight = c.height
    } else {
        screenWidth = c.width
        screenHeight = c.width/targetAsp
    }

    screenOffsetX = (c.width - screenWidth)/2
    screenOffsetY = (c.height - screenHeight)/2
}

function stampAsp() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, screenOffsetX, c.height);
    ctx.fillRect(screenOffsetX+screenWidth, 0, screenOffsetX, c.height);
    ctx.fillRect(0, 0, c.width, screenOffsetY);
    ctx.fillRect(0, screenOffsetY+screenHeight, c.width, screenOffsetY);
}

function stampBackground() {

    let backWidth = screenHeight*getAsp(backgroundImg);

    for (let i = 0; i < Math.ceil(screenWidth/backWidth)+1; i++) {
        stampImage(backgroundImg, backWidth/2 + backWidth*i + backgroundX % backWidth, screenHeight/2, backWidth, screenHeight);
    }
}



function stampBirb() {
    let size = birbImg.height/7000*(screenHeight+screenWidth)/2;
    let dx = screenWidth*20/100;
    let dy = screenHeight*(100-birb.y)/100;
    stampImage(birbImg, dx, dy, size*getAsp(birbImg), size, birb.rotate);
}

function stampPipe(size, x, length, rotation) {

    let dx = screenWidth*x/100;
    let dy;

    let amount = Math.ceil((screenHeight*length/100)/size);

    if (rotation) {
        amount = Math.ceil((screenHeight*(100-length)/100)/size);
        for (let i = 0; i < amount; i++) {

            dy = screenHeight*length/100 + size/2 + i*size

            stampImage(pipe1Img, dx, dy, size*getAsp(pipe1Img), size);

        }

        size = pipe2Img.height/2000*(screenHeight+screenWidth)/2;

        stampImage(pipe2Img, dx, screenHeight*length/100 + size/2, size*getAsp(pipe2Img), -size)
    } else {
        for (let i = 0; i < amount; i++) {

            dy = screenHeight*length/100 - size/2 - i*size

            stampImage(pipe1Img, dx, dy, size*getAsp(pipe1Img), size);

        }

        size = pipe2Img.height/2000*(screenHeight+screenWidth)/2;

        stampImage(pipe2Img, dx, screenHeight*length/100 - size/2, size*getAsp(pipe2Img), size)
    }
}

function stampPipes() {

    let item;
    let size;

    for (let i = 0; i < pipes.length; i++) {
        item = pipes[i]

        size = pipe1Img.height/2000*(screenHeight+screenWidth)/2;
        stampPipe(size, item.x, 85-item.y, false);
        stampPipe(size, item.x, 115-item.y, true);
    }
}


function renderMain() {
    if (c.height != main.clientHeight || c.width != main.clientWidth) {
        c.height = main.clientHeight;
        c.width = main.clientWidth;
        updateAsp(lockAsp);
    }
    ctx.clearRect(0, 0, c.width, c.height);
    stampBackground();
    stampBirb();
    stampPipes();
    stampAsp();
}

updateAsp(lockAsp);