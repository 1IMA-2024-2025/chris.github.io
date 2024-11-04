let m = true;

function death() {
    window.alert("Game Over! \nScore: " + Score + "!");
    birb.y = 9999;
    pipes = [];
    location.reload();
}

function birbMain() {
    birb.speedY -= 0.1;
    birbJump();
    birb.rotate = -birb.speedY*10;
    birb.y += birb.speedY;
    if (birb.y < 0) {
        death();
    }

}

function birbJump() {
      
    if (birb.y >= 85) {
        return;
    }


    if (keyPress.Space) {
        if (m) {
            m = false;
            birb.speedY = 1.6;
        }
    } else {
        m = true;
    }

}

function box(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function btbCollision(box1, box2) {

    if (box1.x + box1.width >= box2.x - box2.width) {
        if (box1.x - box1.width <= box2.x + box2.width) {
            if (box1.y + box1.height >= box2.y - box2.height) {
                if (box1.y - box1.height <= box2.y + box2.height) {
                    return true;
                }
            }
        }
    }
    return false;
}

function newPipe() {
    let y = Math.round(Math.random()*70)+15;
    let x = 120;
    pipes.push(new pipe(x, y));
}

function pipesMain() {

    if (pipeCooldown < 0) {
        pipeCooldown = 100;
        newPipe();
    } else {
        pipeCooldown--
    }

    let item;
    let pipeBox;
    let pipeWidth;
    let birbSize = birbImg.height/90

    for (let i = 0; i < pipes.length; i++) {
        item = pipes[i];

        item.x -= 0.7;

        if (item.x < -20) {
            pipes.splice(i, 1);
            Score++
            i--
            continue;
        }

        pipeWidth = pipe1Img.height/20
        
        pipeBox = new box(item.x, (item.y - 15)/2, pipeWidth/2, (item.y - 15)/2);

        if (btbCollision(new box(20, birb.y, birbSize/2, birbSize/2), pipeBox)) {
            death(); 
        }

        pipeBox = new box(item.x, (item.y + 115)/2, pipeWidth/2, (100 - (item.y + 15))/2);

        if (btbCollision(new box(20, birb.y, birbSize/2, birbSize/2), pipeBox)) {
            death(); 
        }
    }
}



function updateMain() {
    birbMain();
    pipesMain();
    backgroundX -= screenWidth/300;
}
