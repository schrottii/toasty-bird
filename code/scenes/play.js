// Game made by Schrottii - don't steal or cheat

var pipes = [];
var pipeSpawnTime = 1;
var pipesAmount = 0;
var gameAcceleration = 1;
var gameState = "running"; // running / lost / paused
var points = 0;
var coinsThisRun = 0;
var justUnpaused = false;
var mobilePipes = false;

function jump(source = "") {
    if (wggj.canvas.currentScene != "play") return false;
    if (source == "click" && justUnpaused == true) {
        justUnpaused = false;
        return false;
    }
    // Jump!
    if (objects.player.upTicks <= 0.001 && gameState == "running") {
        if (!getSkill(5).isEquipped()) {
            objects.player.velocity = -0.01;
            objects.player.upTicks = getSkill(3).isEquipped() ? 10 : 20;
            objects.player.snip = [0, 32, 32, 32];

            game.stats.totaljumps += 1;
            game.stats.normaljumps += 1;
        }
        else {
            if (objects.player.velocity > 0) {
                objects.player.velocity = -0.01;
                objects.player.upTicks = 0.001;
            }
            else {
                objects.player.velocity = 0.01;
                objects.player.upTicks = 0;
            }
            objects.player.snip[1] = (objects.player.snip[1] == 0) ? 32 : 0;
        }
    }
}

function pause(source = "") {
    if (wggj.canvas.currentScene != "play") return false;
    // Pause!
    if (gameState == "running") {
        objects["pauseDisplay"].power = true;
        objects["pauseDisplay"].time = 0;
        gameState = "paused";
    }
    else if (gameState == "paused") {
        if (source == "click") justUnpaused = true;

        objects["pauseDisplay"].power = false;
        gameState = "running";
    }
}

scenes["play"] = new Scene(
    () => {
        // Init
        if (!game.settings.hitboxes) createSquare("bg", 0, 0, 1, 1, "lightblue");

        createImage("menuground2", 0, 0.95, 1, 0.1, "menuground2", { quadratic: false, foreground: true });
        createImage("menuground", 0, 0.85, 2, 0.1, "menuground");

        createText("pointsDisplay", 0.5, 0.1, "0 Points", { size: 40, align: "center", quadratic: true, foreground: true });
        createText("coinsDisplay", 0.5, 0.15, "0 Coins", { size: 24, align: "center", quadratic: true, foreground: true });
        objects["coinsDisplay"].power = false;
        createText("pauseDisplay", 0.5, 0.5, "Paused", { size: 40, align: "center", quadratic: true, foreground: true, power: false });
        objects["pauseDisplay"].power = false;

        // Pause
        createButton("pauseButton", 0.875, 0.05, 0.1, 0.1, "pause", () => { pause("click"); }, { quadratic: true, foreground: true, centered: true });

        // Skill
        createImage("skillsListBg0", 0.125, 0.05, 0.1, 0.1, "invBg", { quadratic: true, centered: true, foreground: true });
        createImage("skillsListPic0", 0.125, 0.05, 0.1, 0.1, "", { quadratic: true, centered: true, power: false, foreground: true });
        objects["skillsListBg0"].power = game.selSkills[0] != 0;
        objects["skillsListPic0"].power = game.selSkills[0] != 0;
        if (game.selSkills[0] != 0) {
            objects["skillsListPic0"].image = "skills/" + getSkill(game.selSkills[0]).getImage();
        }

        // Player
        createImage("player", 0.1, 0.25, 0.1, 0.1, "skins/" + getSkin(game.skin).getImage(), { quadratic: true, foreground: true });
        objects.player.velocity = 0.01;
        objects.player.rotatevelocity = 0.003;
        objects.player.upTicks = 0;
        objects.player.snip = [0, 0, 32, 32];

        createClickable("jump", 0, 0, 1, 1, () => {
            jump("click");
        });
        createImage("playerDeath", -1, -1, 0.1, 0.1, "boom", { quadratic: true, foreground: true });
        objects["playerDeath"].time = 0;

        // Clouds
        createImage("cloud1", 1.2, 0.2, 0.2, 0.2, "clouds", { quadratic: true });
        objects["cloud1"].snip = [0, 0, 64, 32];
        createImage("cloud2", 1.6, 0.3, 0.2, 0.2, "clouds", { quadratic: true });
        objects["cloud2"].snip = [0, 32, 64, 32];
        createImage("cloud3", 2, 0.15, 0.2, 0.2, "clouds", { quadratic: true });
        objects["cloud3"].snip = [0, 64, 64, 32];
        createImage("cloud4", 2.4, 0.35, 0.2, 0.2, "clouds", { quadratic: true });
        objects["cloud4"].snip = [0, 96, 64, 32];

        mobilePipes = isMobile() ? 2 : 1;

        audioPlayMusic("playing");
    },
    (tick) => {
        // Loop
        let currentGameState = gameState; // to avoid mid-tick changes

        if (currentGameState == "running") {
            // Active: Running / Playing
            gameAcceleration = Math.min(8, gameAcceleration * (1 + 0.0001 * (tick * 60)));

            groundAnimation += tick;
            objects["menuground"].x -= tick / 4;
            if (groundAnimation >= 1) {
                groundAnimation = 0;
                objects["menuground"].x = 0;
            }


            // Pipes spawning
            if (!(getSkill(4).isEquipped() && objects.player.upTicks > 0)) pipeSpawnTime -= tick;
            if (pipeSpawnTime <= 0) {
                pipeSpawnTime = 2 / gameAcceleration;
                let randomY = Math.random() * 0.3;
                let spawnY = (randomY + 0.3) + Math.min(gameAcceleration, 0.1);
                pipes.push(["pipe" + pipesAmount, 1.2, false]);
                createImage("pipe" + pipesAmount, 1.2, spawnY, 0.2, 0.6, "pipeUp", { quadratic: true });
                pipesAmount += 1;

                if ((points + (getSkill(1).isEquipped() ? 10 : 0)) % 50 == 47) createImage("coin" + pipesAmount, 1.2, spawnY - 0.15, 0.2, 0.2, "coin", { quadratic: true });

                spawnY = (randomY - 0.3);
                pipes.push(["pipe" + pipesAmount, 1.2, false]);
                createImage("pipe" + pipesAmount, 1.2, spawnY, 0.2, 0.6, "pipeDown", { quadratic: true });
                pipesAmount += 1;
            }

            // Pipes movement & collision
            for (let p = pipes.length - 12; p < pipes.length; p++) {
                if (pipes[p] == undefined) continue;

                let thisPipe = objects[pipes[p][0]];
                if (currentGameState == "running" && !(getSkill(4).isEquipped() && objects.player.upTicks > 0)) {
                    pipes[p][1] -= gameAcceleration * tick / 4 * mobilePipes;
                    thisPipe.x -= gameAcceleration * tick / 4 * mobilePipes;
                    if (objects["coin" + pipes[p][0].substr(4)] != undefined) objects["coin" + pipes[p][0].substr(4)].x -= gameAcceleration * tick / 4 * mobilePipes;
                }

                // show hitboxes (disable bg as well)
                if (game.settings.hitboxes) {
                    wggjCTX.fillStyle = "red";
                    wggjCTX.fillRect(wggj.canvas.w * thisPipe.x, wggj.canvas.h * thisPipe.y * 1.3, wggj.canvas.w * (thisPipe.w / 4), wggj.canvas.h * (thisPipe.h * 0.7 - thisPipe.y * 1.4 + thisPipe.y * 1));
                    wggjCTX.fillRect(wggj.canvas.w * objects.player.x, wggj.canvas.h * objects.player.y, wggj.canvas.w * objects.player.w / 2, wggj.canvas.h * objects.player.h);
                    wggjCTX.fillStyle = "black";
                }
                
                // Player-Pipe Collision
                if (currentGameState == "running" && objects.player.x + (objects.player.w / 2) >= thisPipe.x && objects.player.x <= thisPipe.x + (thisPipe.w / 4)
                    && objects.player.y >= thisPipe.y * 1.3 && objects.player.y <= thisPipe.y + (thisPipe.h * 0.7)) {
                    // you hit it and DIED
                    gameState = "lost";

                    if (points > game.stats.highscore) game.stats.highscore = points;
                    save();

                    if (objects["player"].rotate > 0) createAnimation("deathRotation", "player", (t, d) => t.rotate = Math.max(0, t.rotate - 0.1 * d), 2, true);
                    else createAnimation("deathRotation", "player", (t, d) => t.rotate = Math.min(0, t.rotate + 0.1 * d), 2, true);
                    
                    createText("lostText", 0.5, 0.3, isMobile() ? "Score: " + points : "You lost! Score: " + points, { color: "red", size: 60 });
                    if (points > game.stats.highscore) createText("lostText2", 0.5, 0.42, "New Highscore!", { color: "yellow", size: 42 });
                    createButton("lostButton", 0.3, 0.7, 0.4, 0.2, "button", () => {
                        loadScene("mainmenu")
                    });
                    createText("lostButtonText", 0.5, 0.85, "Continue", { size: 64 });
                    return;
                }
                // use gameState here, not currentGameState, cuz screw you
                else if (gameState == "running" && pipes[p][2] == false && objects.player.x + (objects.player.w / 2) >= thisPipe.x && objects.player.x <= thisPipe.x + (thisPipe.w / 4)) {
                    // go through a hoop and gain ca$h
                    points += 1;
                    game.stats.totalpoints += 1;
                    game.stats.normalpoints += 1;

                    if (objects["coin" + (parseInt(pipes[p][0].substr(4)) + 1)] != undefined) {
                        let amount = 1;
                        if (getSkill(2).isEquipped() && Math.random() >= 0.8) amount *= 2;

                        coinsThisRun += amount;
                        game.coins += amount;
                        game.stats.totalcoins += amount;
                        game.stats.normalcoins += amount;
                    }

                    pipes[p][2] = true;
                    pipes[p + 1][2] = true;
                }
            }

            // despawn pipes
            if (pipes.length > 50) pipes.shift();

            // Player falling
            objects.player.y = Math.max(0, Math.min(0.81, objects.player.y + objects.player.velocity * (tick * 60)));
            if (objects.player.upTicks < 0) {
                // fall
                objects.player.velocity += 0.00015 * (tick * 60);
            }
            else {
                // jump
                objects.player.velocity -= 0.0003 * (tick * 60);
                if (!getSkill(5).isEquipped()) objects.player.upTicks -= 1 * (tick * 60);

                if (objects.player.upTicks <= 0) {
                    objects.player.velocity = 0.01;
                    objects.player.snip = [0, 0, 32, 32];
                }
            }
            objects.player.rotatevelocity = (objects.player.rotatevelocity * 0.9) + (objects.player.velocity * 0.1);
            if (game.settings.birdRotation) objects.player.rotate = Math.max(-0.2, Math.min(0.2, -objects.player.rotatevelocity * 12));

            // Clouds
            for (i = 1; i < 5; i++) {
                objects["cloud" + i].x -= tick / 8;
                if (objects["cloud" + i].x < -0.2) {
                    objects["cloud" + i].x = 1.2;
                    objects["cloud" + i].y = Math.random() * 0.4;
                }
            }

        }
        else if (currentGameState == "lost") {
            // Active: Lost
            objects["playerDeath"].x = objects.player.x + 0.025;
            objects["playerDeath"].y = objects.player.y;

            objects["playerDeath"].time += tick;
            if (objects["playerDeath"].time > 0.5) {
                objects["playerDeath"].time = 0;
                objects["playerDeath"].image = objects["playerDeath"].image == "boom" ? "boom2" : "boom";
            }
        }
        else if (currentGameState == "paused") {
            // Active: Paused
            objects["pauseDisplay"].time += tick;
            if (objects["pauseDisplay"].time > 0.5) {
                objects["pauseDisplay"].time = 0;
                objects["pauseDisplay"].power = !objects["pauseDisplay"].power;
            }
        }

        // Active no matter what
        objects["pointsDisplay"].text = points + " Points";
        objects["coinsDisplay"].text = coinsThisRun + " Coin" + (coinsThisRun > 1 ? "s" : "");
        objects["coinsDisplay"].power = coinsThisRun > 0;
    }
);