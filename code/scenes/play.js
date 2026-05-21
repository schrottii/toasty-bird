// Game made by Schrottii - don't steal or cheat

var currentRun;

class GameRun {
    constructor() {
        this.pipes = [];
        this.coins = [];

        this.acceleration = 1;
        this.pipesSpawnTime = 1;
        this.pipesAmount = 0;

        this.playerPoints = 0;
        this.playerPipes = 0;
        this.playerCoins = 0;

        this.springTime = 0; // 0 - 1
        this.pipeResearchYs = [0.2, 0.8];
        this.pipeResearchWait = false;

        this.state = ""; // running / lost / paused
    }

    startRun(mode = undefined) {
        if (mode !== undefined) gamemode = mode;
        game.increaseStat("plays", 1);
        this.state = "running";
        loadScene("play");
    }

    getModeName() {
        switch (gamemode) {
            case "normal":
                return "Normal Mode";
            case "idlemode":
                return "Idle Mode";
            default:
                return "???";
        }
    }

    returnScene() {
        switch (gamemode) {
            case "normal":
                return "mainmenu";
            case "idlemode":
                return "idlemode";
            default:
                return "mainmenu";
        }
    }
}

var justUnpaused = false;
var mobilePipes = false;

function jump(source = "") {
    if (wggj.canvas.currentScene != "play") return false;
    if (source == "click" && justUnpaused == true) {
        justUnpaused = false;
        return false;
    }
    // Jump!
    if ((objects.player.upTicks <= 0.001 || source == "auto") && currentRun.state == "running") {
        if (!getSkill(5).isEquipped()) {
            objects.player.velocity = -0.01;
            objects.player.upTicks = getSkill(3).isEquipped() ? 10 : 20;
            objects.player.snip = [0, 32, 32, 32];

            if (source != "auto") game.increaseStat("jumps", 1);
            else game.increaseStat("totalimautojumps", 1);
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

    if (currentRun.state == "running") {
        // Pause!
        objects["pauseButtonA"].power = objects["pauseButtonAtxt"].power = objects["pauseButtonB"].power = objects["pauseButtonBtxt"].power = true;
        objects["pauseDisplay"].power = true;
        objects["pauseDisplay"].time = 0;

        currentRun.state = "paused";
    }
    else if (currentRun.state == "paused") {
        // Unpause
        if (source == "click") justUnpaused = true;

        objects["pauseButtonA"].power = objects["pauseButtonAtxt"].power = objects["pauseButtonB"].power = objects["pauseButtonBtxt"].power = false;
        objects["pauseDisplay"].power = false;
        currentRun.state = "running";
    }
}

scenes["play"] = new Scene(
    () => {
        // Init
        if (!game.settings.hitboxes) createSquare("bg", 0, 0, 1, 1, "lightblue");

        createImage("menuground2", 0, 0.95, 1, 0.1, "menuground2", { quadratic: false, foreground: true });
        createImage("menuground", 0, 0.85, 2, 0.1, "menuground");

        createText("pointsDisplay", 0.5, 0.1, "0 Points", { size: 40, align: "center", quadratic: true, foreground: true });
        createText("coinsDisplay", 0.5, 0.15, "0 Coins", { size: 24, align: "center", quadratic: true, foreground: true, power: false });

        // Pause "menu"
        createText("pauseDisplay", 0.5, 0.5, "Paused", { size: 40, align: "center", quadratic: true, foreground: true, power: false });

        createButton("pauseButtonA", 0.3, 0.777, 0.2, 0.1, "button", () => { pause("click"); }, { centered: true, foreground: true, power: false });
        createText("pauseButtonAtxt", 0.3, 0.777 + 0.067, "Resume", { size: 40, centered: true, foreground: true, power: false });
        createButton("pauseButtonB", 0.7, 0.777, 0.2, 0.1, "button", () => {
            game.setHighscore(currentRun.playerPoints);
            save();
            loadScene(currentRun.returnScene());
        }, { centered: true, foreground: true, power: false });
        createText("pauseButtonBtxt", 0.7, 0.777 + 0.067, "Return to main menu", { size: 20, centered: true, foreground: true, power: false });

        // Pause (right)
        createButton("pauseButton", 0.875, 0.05, 0.1, 0.1, "pause", () => { pause("click"); }, { quadratic: true, foreground: true, centered: true });

        // mode and player name (left)
        createSquare("top2", 0, 0, 0.12 - (0.05 * wggj.canvas.h / wggj.canvas.w), 0.0475 + 0.0125, "#005B00", { foreground: true });
        createSquare("top1", 0, 0, 0.175, 0.0475, "#006800", { foreground: true });
        createText("topPlayerName", 0.005, 0.03, game.name, { align: "left", size: 20, foreground: true });
        createText("topModeName", 0.005, 0.05, currentRun.getModeName(), { align: "left", size: 16, foreground: true });

        if (gamemode == "idlemode") {
            if (game.idlemode.pointupgrades.springs > 0) {
                createSquare("top_spring", 0, 0.1, 0.175, 0.02, "#006420", { foreground: true });
            }
            createSquare("top_piperesearch", 0.1, 0.15, 0.02, 0.02, "yellow", { foreground: true });
        }

        // Skill (left)
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

        if (gamemode == "normal") audioPlayMusic("playing");
        if (gamemode == "idlemode") audioPlayMusic("idlemode_playing");
        groundAnimation = 0;
    },
    (tick) => {
        // Loop
        let currentGameState = currentRun.state; // to avoid mid-tick changes

        if (currentGameState == "running") {
            // Active: Running / Playing
            currentRun.acceleration = Math.min(8, currentRun.acceleration * (1 + 0.0001 * (tick * 60)));

            groundAnimationLoop(tick / 2);

            // Pipes spawning
            if (!(getSkill(4).isEquipped() && objects.player.upTicks > 0)) currentRun.pipesSpawnTime -= tick;
            if (currentRun.pipesSpawnTime <= 0) {
                currentRun.pipesSpawnTime = 2 / currentRun.acceleration;
                let randomY = Math.random() * 0.3;
                let spawnY = (randomY + 0.3) + Math.min(currentRun.acceleration, 0.1);
                currentRun.pipes.push(["pipe" + currentRun.pipesAmount, 1.2, false]);
                createImage("pipe" + currentRun.pipesAmount, 1.2, spawnY, 0.2, 0.6, "pipeUp", { quadratic: true });
                currentRun.pipesAmount += 1;

                // coin spawning
                if (gamemode == "normal" && (currentRun.playerPoints + (getSkill(1).isEquipped() ? 10 : 0)) % 50 == 47) {
                    createImage("coin" + currentRun.pipesAmount, 1.2, spawnY - 0.15, 0.2, 0.2, "coin_animation", { quadratic: true });
                    objects["coin" + currentRun.pipesAmount].snip = [0, 0, 32, 32];
                    objects["coin" + currentRun.pipesAmount].aniTime = 0;
                    currentRun.coins.push(currentRun.pipesAmount);
                }
                if (gamemode == "idlemode" && Math.random() >= 0.9) {
                    createImage("coin" + currentRun.pipesAmount, 1.2, spawnY - 0.15, 0.2, 0.2, "feather", { quadratic: true });
                    //objects["coin" + currentRun.pipesAmount].snip = [0, 0, 32, 32];
                    //objects["coin" + currentRun.pipesAmount].aniTime = 0;
                    currentRun.coins.push(currentRun.pipesAmount);
                }

                spawnY = (randomY - 0.3);
                currentRun.pipes.push(["pipe" + currentRun.pipesAmount, 1.2, false]);
                createImage("pipe" + currentRun.pipesAmount, 1.2, spawnY, 0.2, 0.6, "pipeDown", { quadratic: true });
                currentRun.pipesAmount += 1;
            }

            if (gamemode == "normal") { // feathers not animated for now
                for (let c of currentRun.coins) {
                    if (objects["coin" + c] != undefined) {
                        objects["coin" + c].aniTime += tick;
                        if (objects["coin" + c].aniTime >= 0.25) {
                            objects["coin" + c].aniTime -= 0.25;
                            objects["coin" + c].snip[0] = (objects["coin" + c].snip[0] + 32) % 128;
                        }
                    }
                }
            }

            // Pipes movement & collision
            for (let p = currentRun.pipes.length - 12; p < currentRun.pipes.length; p++) {
                if (currentRun.pipes[p] == undefined) continue;

                let thisPipe = objects[currentRun.pipes[p][0]];
                if (currentGameState == "running" && !(getSkill(4).isEquipped() && objects.player.upTicks > 0)) {
                    currentRun.pipes[p][1] -= currentRun.acceleration * tick / 4 * mobilePipes;
                    thisPipe.x -= currentRun.acceleration * tick / 4 * mobilePipes;
                    if (objects["coin" + currentRun.pipes[p][0].substr(4)] != undefined) objects["coin" + currentRun.pipes[p][0].substr(4)].x -= currentRun.acceleration * tick / 4 * mobilePipes;
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
                    currentRun.state = "lost"; // causes this code area to be executed only once (as it requires "running")

                    let isHighscore = game.setHighscore(currentRun.playerPoints);
                    save();

                    // idle mode
                    if (gamemode == "idlemode") {
                        game.idlemode.pointprod = Math.max(game.idlemode.pointprod, currentRun.playerPoints);
                    }

                    // rotate animation
                    if (objects["player"].rotate > 0) createAnimation("deathRotation", "player", (t, d) => t.rotate = Math.max(0, t.rotate - 90 * d), 5, true);
                    else createAnimation("deathRotation", "player", (t, d) => t.rotate = Math.min(0, t.rotate + 90 * d), 5, true);

                    // game over text
                    createText("lostText", 0.5, 0.3, isMobile() ? "Score: " + currentRun.playerPoints : "You lost! Score: " + currentRun.playerPoints, { color: "red", size: 60 });
                    if (isHighscore) createText("lostText2", 0.5, 0.42, "New Highscore!", { color: "yellow", size: 42 });
                    createButton("lostButton", 0.3, 0.7, 0.4, 0.2, "button", () => {
                        loadScene(currentRun.returnScene());
                    }, { aText: { text: "Continue", size: 64 } });
                    return;
                }
                // use gameState here, not currentGameState, cuz screw you
                else if (currentRun.state == "running" && currentRun.pipes[p][2] == false && objects.player.x + (objects.player.w / 2) >= thisPipe.x && objects.player.x <= thisPipe.x + (thisPipe.w / 4)) {
                    // go through a hoop and gain ca$h
                    let pointAmount = 1;
                    if (gamemode == "idlemode" && currentRun.playerPoints == 0) pointAmount += upgrades.featherupgrades.fastStart.getEffect();

                    currentRun.playerPoints += pointAmount;
                    game.increaseStat("points", pointAmount);

                    currentRun.playerPipes += 2;

                    if (objects["coin" + (parseInt(currentRun.pipes[p][0].substr(4)) + 1)] != undefined) {
                        let amount = 1;
                        if (getSkill(2).isEquipped() && Math.random() >= 0.8) amount *= 2;

                        currentRun.playerCoins += amount;
                        game.increaseStat("coins", 1);

                        if (gamemode == "normal") game.coins += amount;
                        if (gamemode == "idlemode") game.idlemode.feathers += amount;
                        if (gamemode == "idlemode") game.stats.totalimfeathers += amount;
                    }

                    currentRun.pipes[p][2] = true;
                    currentRun.pipes[p + 1][2] = true;
                }
            }

            // despawn pipes
            if (currentRun.pipes.length > 50) currentRun.pipes.shift();

            // Player falling
            objects.player.y = Math.max(0, Math.min(0.81, objects.player.y + objects.player.velocity * (tick * 60)));

            if (gamemode == "idlemode" && objects.player.y < currentRun.pipeResearchYs[0] /*0.4*/) {
                objects.player.velocity += 0.00015 * (tick * 60) * (1 + game.idlemode.pointupgrades.pipeResearch * 0.2);
                objects["top_piperesearch"].color = "red";
            }
            else if (gamemode == "idlemode" && objects.player.y > currentRun.pipeResearchYs[1] /*0.6*/) {
                if (objects.player.upTicks > 0) objects.player.velocity -= 0.00015 * (tick * 60) * (1 + game.idlemode.pointupgrades.pipeResearch * 0.2);
                objects["top_piperesearch"].color = "blue";
            }
            else if (gamemode == "idlemode") {
                objects["top_piperesearch"].color = "yellow";
            }

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

            // rotation
            objects.player.rotatevelocity = (objects.player.rotatevelocity * 0.9) + (objects.player.velocity * 0.1);
            if (game.settings.birdRotation) objects.player.rotate = -365 * Math.max(-0.12, Math.min(0.0777, -objects.player.rotatevelocity * 7.77));

            if (gamemode == "idlemode" && game.idlemode.pointupgrades.springs > 0) {
                currentRun.springTime -= tick;
                if (currentRun.springTime < 0) {
                    //console.log(objects.player.y, currentRun.pipeResearchYs[1])
                    if (objects.player.y >= currentRun.pipeResearchYs[1] - (0.04 + game.idlemode.pointupgrades.pipeResearch * 0.003)) {
                        // auto jump
                        currentRun.springTime = 1 - 0.009 * game.idlemode.pointupgrades.springs;
                        jump("auto");
                    }

                    if (currentRun.pipeResearchWait == false
                        && currentRun.pipes.length >= currentRun.playerPipes + 2
                        && game.idlemode.pointupgrades.pipeResearch > 0) {
                        // 0 = lower pipe (higher Y), 1 = upper pipe (lower Y)
                        // get lower end of upper pipe ~ upper end of lower pipe
                        currentRun.pipeResearchWait = true;
                        setTimeout(() => {
                            currentRun.pipeResearchYs =
                                [objects[currentRun.pipes[currentRun.playerPipes + 1][0]].y + (objects[currentRun.pipes[currentRun.playerPipes + 1][0]].h * 0.7),
                                objects[currentRun.pipes[currentRun.playerPipes][0]].y * 1.3];
                            currentRun.pipeResearchWait = false;
                        }, 100);

                    }
                }
            }

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
        objects["pointsDisplay"].text = currentRun.playerPoints + " Point" + (currentRun.playerPoints != 1 ? "s" : "");
        if (gamemode == "idlemode") objects["coinsDisplay"].text = currentRun.playerCoins + " Feather" + (currentRun.playerCoins != 1 ? "s" : "");
        else objects["coinsDisplay"].text = currentRun.playerCoins + " Coin" + (currentRun.playerCoins != 1 ? "s" : "");
        objects["coinsDisplay"].power = currentRun.playerCoins > 0;

        if (gamemode == "idlemode" && game.idlemode.pointupgrades.springs > 0) {
            objects["top_spring"].w = 0.175 * currentRun.springTime;
        }
    }
);