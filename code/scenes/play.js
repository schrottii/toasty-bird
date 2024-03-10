// Game made by Schrottii - don't steal or cheat

var pipes = [];
var pipeSpawnTime = 1;
var pipesAmount = 0;
var gameAcceleration = 1;
var gameState = "running"; // running / lost / paused
var points = 0;

scenes["play"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "lightblue");

        createImage("menuground2", 0, 0.95, 1, 0.1, "menuground2", false, true);
        createImage("menuground", 0, 0.85, 2, 0.1, "menuground");

        createText("pointsDisplay", 0.5, 0.1, "0 Points", "black", 40, "center", true);

        // Player
        createImage("player", 0.1, 0.25, 0.1, 0.1, "player", true, true);
        foregroundObjects.player.velocity = 0.003;
        foregroundObjects.player.rotatevelocity = 0.003;
        foregroundObjects.player.upTicks = 0;
        foregroundObjects.player.snip = [0, 0, 32, 32];

        createClickable("jump", 0, 0, 1, 1, () => {
            // Jump!
            if (foregroundObjects.player.upTicks == 0 && gameState == "running") {
                foregroundObjects.player.velocity = -0.008;
                foregroundObjects.player.upTicks = 24;
                foregroundObjects.player.snip = [0, 32, 32, 32];

                game.stats.totaljumps += 1;
                game.stats.normaljumps += 1;
            }
        });

        // Clouds
        createImage("cloud1", 1.2, 0.2, 0.2, 0.2, "clouds", true);
        objects["cloud1"].snip = [0, 0, 64, 32];
        createImage("cloud2", 1.6, 0.3, 0.2, 0.2, "clouds", true);
        objects["cloud2"].snip = [0, 32, 64, 32];
        createImage("cloud3", 2, 0.15, 0.2, 0.2, "clouds", true);
        objects["cloud3"].snip = [0, 64, 64, 32];
        createImage("cloud4", 2.4, 0.35, 0.2, 0.2, "clouds", true);
        objects["cloud4"].snip = [0, 96, 64, 32];

        musicPlayer.src = "audio/toasty-bird.mp3";
        musicPlayer.play();
    },
    (tick) => {
        // Loop
        if (gameState == "running") {
            gameAcceleration = Math.min(8, gameAcceleration * 1.0001);

            groundAnimation += tick;
            objects["menuground"].x -= tick / 4;
            if (groundAnimation >= 1) {
                groundAnimation = 0;
                objects["menuground"].x = 0;
            }
        }

        // Pipes spawning
        pipeSpawnTime -= tick;
        if (pipeSpawnTime <= 0) {
            pipeSpawnTime = 2 / gameAcceleration;
            let randomY = Math.random() * 0.3;
            let spawnY = (randomY + 0.3) + Math.min(gameAcceleration, 0.1);
            pipes.push(["pipe" + pipesAmount, 1.2, false]);
            createImage("pipe" + pipesAmount, 1.2, spawnY, 0.2, 0.6, "pipeUp", true);
            pipesAmount += 1;

            spawnY = (randomY - 0.3);
            pipes.push(["pipe" + pipesAmount, 1.2, false]);
            createImage("pipe" + pipesAmount, 1.2, spawnY, 0.2, 0.6, "pipeDown", true);
            pipesAmount += 1;
        }

        // Pipes movement & collision
        for (p = pipes.length - 12; p < pipes.length; p++) {
            if (pipes[p] == undefined) continue;

            let thisPipe = objects[pipes[p][0]];
            if (gameState == "running") {
                pipes[p][1] -= gameAcceleration * tick / 4 * (isMobile() ? 4 : 1);
                objects[pipes[p][0]].x -= gameAcceleration * tick / 4 * (isMobile() ? 4 : 1);
            }

            // Player-Pipe Collision

            /*
            ctx.fillStyle = "red"; // show hitboxes (disable bg as well)
            ctx.fillRect(width * thisPipe.x, height * thisPipe.y * 1.3, width * (thisPipe.w / 4), height * (thisPipe.h * 0.7 - thisPipe.y * 1.4 + thisPipe.y * 1));
            ctx.fillRect(width * foregroundObjects.player.x, height * foregroundObjects.player.y, width * foregroundObjects.player.w, height * foregroundObjects.player.h);
            ctx.fillStyle = "black";
            */

            if (gameState == "running" && foregroundObjects.player.x + (foregroundObjects.player.w / 2) >= thisPipe.x && foregroundObjects.player.x <= thisPipe.x + (thisPipe.w / 4)
                && foregroundObjects.player.y >= thisPipe.y * 1.3 && foregroundObjects.player.y <= thisPipe.y + (thisPipe.h * 0.7)) {
                gameState = "lost";

                createText("lostText", 0.5, 0.3, "You lost! Score: " + points, "red", 72);
                if (points > game.stats.highscore) createText("lostText2", 0.5, 0.42, "New Highscore!", "yellow", 42);
                createButton("lostButton", 0.3, 0.7, 0.4, 0.2, "button", () => {
                    if (points > game.stats.highscore) game.stats.highscore = points;
                    localStorage.setItem("TOASTYBIRD1", "toasty" + btoa(JSON.stringify(game)));

                    loadScene("mainmenu")
                })
                createText("lostButtonText", 0.5, 0.85, "Continue", "black", 64);
            }
            else if (gameState == "running" && pipes[p][2] == false && foregroundObjects.player.x + (foregroundObjects.player.w / 2) >= thisPipe.x && foregroundObjects.player.x <= thisPipe.x + (thisPipe.w / 4)) {
                points += 1;
                game.stats.totalpoints += 1;
                game.stats.normalpoints += 1;

                pipes[p][2] = true;
                pipes[p + 1][2] = true;
            }
        }

        // Player falling
        if (gameState == "running") {
            foregroundObjects.player.y = Math.max(0, Math.min(0.825, foregroundObjects.player.y + foregroundObjects.player.velocity));
            if (foregroundObjects.player.upTicks < 1) {
                foregroundObjects.player.velocity += 0.00015;
            }
            else {
                foregroundObjects.player.velocity -= 0.0003;
                foregroundObjects.player.upTicks -= 1;

                if (foregroundObjects.player.upTicks == 0) {
                    foregroundObjects.player.velocity = 0.003;
                    foregroundObjects.player.snip = [0, 0, 32, 32];
                }
            }
            foregroundObjects.player.rotatevelocity = (foregroundObjects.player.rotatevelocity * 0.9) + (foregroundObjects.player.velocity * 0.1);
            foregroundObjects.player.rotate = Math.max(-0.3, Math.min(0.3, -foregroundObjects.player.rotatevelocity * 15));
        }

        // Clouds
        if (gameState == "running") {
            for (i = 1; i < 5; i++) {
                objects["cloud" + i].x -= tick / 8;
                if (objects["cloud" + i].x < -0.2) {
                    objects["cloud" + i].x = 1.2;
                    objects["cloud" + i].y = Math.random() * 0.4;
                }
            }
        }

        foregroundObjects["pointsDisplay"].text = points + " Points";

        // ...
    }
);