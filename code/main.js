// Game made by Schrottii

// variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var delta = 0;
var time = Date.now();

var width = 0;
var height = 0;

var scenes = {

}

var objects = {

}

var clickables = {

}

function loadScene(sceneName) {
    objects = {};
    clickables = {};

    console.log("loaded scene: " + sceneName)
}

// event listeners and their functions
canvas.addEventListener("pointerdown", onClick);

function onClick(e) {
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    for (c in clickables) {
        //console.log(mouseX > clickables[c][0], mouseY > clickables[c][1]
        //    , mouseX < clickables[c][0] + clickables[c][2], mouseY < clickables[c][1] + clickables[c][3])

        if (mouseX > clickables[c][0] && mouseY > clickables[c][1]
            && mouseX < clickables[c][0] + clickables[c][2] && mouseY < clickables[c][1] + clickables[c][3]) {
            // is in the hitbox
            clickables[c][4]();
        }
    }
}



// draw functions
function drawSquare(x, y, w, h, color = "black") {
    ctx.fillStyle = color;
    ctx.fillRect(width * x, height * y, width * w, height * h);
}

function drawImage(x, y, w, h, image) {
    ctx.fillStyle = color;
    ctx.drawImage(image, width * x, height * y, width * w, height * h);
}

function drawText(x, y, text, color = "black", fontSize = 20) {
    ctx.fillStyle = color;
    ctx.font = fontSize + "px serif";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";

    ctx.fillText(text, width * x, height * y);
}

function addButton(x, y, w, h, clickableName, onClick) {
    // onclick = ["name", () => { function }]

    if (clickables[clickableName] == undefined) {
        clickables[clickableName] = [width * x, height * y, width * w, height * h, onClick];
        // example: myButton: 100, 100, 300, 300, () => { ... }
    }

}

// loop
function loop() {
    // The game's main loop

    // Tick time
    delta = Date.now() - time;
    time = Date.now();

    // Resize the canvas
    canvas.style.width = (canvas.width = window.innerWidth) + "px";
    canvas.style.height = (canvas.height = window.innerHeight) + "px";

    width = window.innerWidth;
    height = window.innerHeight;

    // exmp
    drawSquare(0.4, 0.4, 0.2, 0.2, "white");
    addButton(0.4, 0.4, 0.2, 0.2, "ex1", () => { console.log("heyo") });
    drawText(0.5, 0.5, "Jesus is born!");

    // loop
    requestAnimationFrame(loop);
}
loop();