// Game made by Schrottii

// variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var delta = 0;
var time = Date.now();

var width = 0;
var height = 0;

var images = {
    placeholder: "sosnog.png",
}

var scenes = {

}

var objects = {

}

var clickables = {

}

var loadingImages = 0;
var loadedImages = 0;

function loadImages() {
    for (let image in images) {
        let img = new Image();
        img.src = "images/" + images[image];
        img.onload = () => {
            loadedImages++;
            if (loadingImages == loadedImages) {
                console.log("all images loaded");
                loop(); // start game
            }
        }
        images[image] = img;
        loadingImages++;
    }
}
loadImages();

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

// object functions
class Square {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(width * this.x, height * this.y, width * this.w, height * this.h);
    }
}

class Picture {
    constructor(x, y, w, h, image) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
    }

    render() {
        ctx.drawImage(this.image, width * this.x, height * this.y, width * this.w, height * this.h);
    }
}

class Text {
    constructor(x, y, text, color, fontSize) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.fontSize = fontSize;
    }

    render() {
        ctx.fillStyle = this.color ? this.color : "black";
        ctx.font = (this.fontSize ? this.fontSize : 20) + "px serif";
        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";

        ctx.fillText(this.text, width * this.x, height * this.y);
    }
}

// create functions
function createSquare(name, x, y, w, h, color) {
    if (objects[name] == undefined) objects[name] = new Square(x, y, w, h, color);
}

function createImage(name, x, y, w, h, image) {
    if (objects[name] == undefined) objects[name] = new Picture(x, y, w, h, image);
}

function createText(name, x, y, text, color, fontSize) {
    if (objects[name] == undefined) objects[name] = new Text(x, y, text, color, fontSize);
}

function createClickable(clickableName, x, y, w, h, onClick) {
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

    for (o in objects) {
        objects[o].render();
    }

    // exmp
    createSquare("ex1", 0.4, 0.4, 0.2, 0.2, "white");

    createClickable("ex1", 0.4, 0.4, 0.2, 0.2, () => { objects.buddha.text = "Jesus is dead!" });
    createText("buddha", 0.5, 0.5, "Jesus is born!");

    // loop
    requestAnimationFrame(loop);
}