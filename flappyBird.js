let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// load Image

let bird = new Image();
let bg = new Image();
let earth = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "Image/bird.png";
bg.src = "Image/bg.png";
earth.src = "Image/fg.png";
pipeNorth.src = "Image/pipeNorth.png";
pipeSouth.src = "Image/pipeSouth.png";


// một số giá trị biến

let gap = 90;
let constant;

let bX = 10;
let bY = 150;

let gravity = 1.5;

let score = 0;

// file âm thanh
let fly = new Audio();
let scor = new Audio();

fly.src = "Sound/fly.mp3";
scor.src = "Sound/score.mp3";

// sự kiện bàn phím

document.addEventListener("keydown", moveUp);

function moveUp() {
    bY -= 25;
    fly.play();
}

// tọa độ ống

let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

// hàm vẽ

function draw() {

    ctx.drawImage(bg, 0, 0);


    for (let i = 0; i < pipe.length; i++) {

        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // check va chạm

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= canvas.height - earth.height) {
            location.reload(); // reload map
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }


    }

    ctx.drawImage(earth, 0, canvas.height - earth.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);

}

draw();

