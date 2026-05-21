var groundAnimation = 0;

function groundAnimationLoop(tick) {
    if (tick > 0.1) tick = 0.1;

    groundAnimation += 0.5 * tick;
    objects["menuground"].x -= 0.5 * tick;
    if (objects["menuground3"]) objects["menuground3"].x -= 0.5 * tick;

    if (groundAnimation >= 0.5) {
        if (groundAnimation > 5) groundAnimation = 0.5;
        groundAnimation -= 0.25;
        objects["menuground"].x += 0.25;
        if (objects["menuground3"]) objects["menuground3"].x += 0.25;
    }
}

scenes["mainmenu"] = new Scene(
    () => {
        // Init
        gamemode = "";

        createSquare("bg", 0, 0, 1, 1, "green");

        createImage("menuground2", 0, 0.9, 1, 0.1, "menuground2");

        createImage("menuground", 0, 0.8, 2, 0.1, "menuground");
        createImage("menuground3", 0, 0, 2, 0.1, "menuground3");

        // by tpot
        createImage("gameLogo", 0.4, 0, 0.2, 0.2, "gameLogo", { quadratic: true, centered: true });
        createImage("logo", 0.6, 0, 0.2, 0.2, "logo", { quadratic: true, centered: true });

        createText("version", 0.975, isMobile() ? 0.95 : 0.8, "Version " + gameVersion, { size: 40, align: "right" });

        // Play button
        createButton("playbutton", 0.3, 0.2, 0.4, 0.1, "button", () => {
            audioPlaySound("click");

            currentRun = new GameRun();
            currentRun.startRun("normal");
        }, { aText: { text: "Play", size: 40 } });

        // Idle mode button
        createButton("idlebirdbuttonbutton", 0.3, 0.325, 0.4, 0.1, "button", () => {
            audioPlaySound("click");
            createAnimation("transOut", "fade", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);

            if (game.idlemode.active == false) {
                // starts a new run!
                game.newIdleMode(game.idlemode.goldenfeathers);
                game.idlemode.active = true;
                game.stats.totalimruns++;
            }

            setTimeout('loadScene("idlemode")', 300);
        }, { aText: { text: "Idle Bird", size: 40 } });

        // Stats button
        createButton("playerbutton", 0.3, 0.45, 0.4, 0.1, "button", () => {
            audioPlaySound("click");
            createAnimation("transOut", "fade", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("player")', 300);
        }, { aText: { text: game.name, size: 40 } });

        // Skins button
        createButton("shopbutton", 0.3, 0.575, 0.4, 0.1, "button", () => {
            audioPlaySound("click");
            createAnimation("transOut", "fade", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("shop")', 300);
        }, { aText: { text: "Shop", size: 40 } });

        // Settings button
        createButton("settingsbutton", 0.3, 0.7, 0.4, 0.1, "button", () => {
            audioPlaySound("click");
            createAnimation("transOut", "fade", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("settings")', 300);
        }, { aText: { text: "Settings", size: 40 } });


        
        // Left Icons
        createButton("statsbutton", 0.02, 0.2, 0.08, 0.08, "whiteStats", () => {
            audioPlaySound("click");
            createAnimation("transOut", "fade", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("stats")', 300);
        }, { quadratic: true });
        createText("wButtonText1", 0.075, 0.25, "Stats", { color: "white", size: 32, align: "left" });

        createButton("patchnotesbutton", 0.02, 0.325, 0.08, 0.08, "whiteNotes", () => {
            audioPlaySound("click");
            createAnimation("transOut", "fade", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("patchnotes")', 300);
        }, { quadratic: true });
        createText("wButtonText2", 0.075, 0.375, "Patch notes", { color: "white", size: 32, align: "left" });

        createButton("serverbutton", 0.02, 0.575, 0.08, 0.08, "whiteDiscord", () => {
            audioPlaySound("click");
            window.open("https://discord.gg/CbBeJXKUrk");
        }, { quadratic: true });
        createText("wButtonText3", 0.075, 0.625, "Discord", { color: "white", size: 32, align: "left" });

        createButton("websitebutton", 0.02, 0.7, 0.08, 0.08, "whiteWebsite", () => {
            audioPlaySound("click");
            window.open("https://schrottii.github.io/");
        }, { quadratic: true });
        createText("wButtonText4", 0.075, 0.75, "Website", { color: "white", size: 32, align: "left" });



        // bottom icons
        /*
        createButton("bottomButton1", 0.01, 0.91, 0.18, 0.08, "whiteWebsite", () => {
            audioPlaySound("click");
            window.open("https://ko-fi.com/Y8Y2XMZX1");
        }, { aText: { text: "Website", size: 24 } });

        createButton("bottomButton2", 0.21, 0.91, 0.18, 0.08, "whiteDiscord", () => {
            audioPlaySound("click");
            window.open("https://ko-fi.com/Y8Y2XMZX1");
        }, { aText: { text: "Discord", size: 24 } });

        createButton("bottomButton3", 0.41, 0.91, 0.18, 0.08, "button", () => {
            audioPlaySound("click");
            window.open("https://ko-fi.com/Y8Y2XMZX1");
        }, { aText: { text: "YouTube", size: 24 } });

        createButton("bottomButton4", 0.61, 0.91, 0.18, 0.08, "button", () => {
            audioPlaySound("click");
            window.open("https://ko-fi.com/Y8Y2XMZX1");
        }, { aText: { text: "Social media", size: 16 } });

        createButton("bottomButton5", 0.81, 0.91, 0.18, 0.08, "button", () => {
            audioPlaySound("click");
            window.open("https://ko-fi.com/Y8Y2XMZX1");
        }, { aText: { text: "Donate", size: 24 } });
        */



        audioChangeVolume("music", game.settings.music);
        audioChangeVolume("sounds", game.settings.sounds);
        audioPlayMusic("menu");

        // transition fade
        createImage("fade", 0, 0, 1, 1, "fade");
        createAnimation("transIn", "fade", (t, d) => { t.alpha -= d * 4 }, 0.3, true);
        groundAnimation = 0;

        if (isMobile()) {
            objects["wButtonText1"].y = 10;
            objects["wButtonText2"].y = 10;
            objects["wButtonText3"].y = 10;
            objects["wButtonText4"].y = 10;
        }
    },
    (tick) => {
        // Loop
        groundAnimationLoop(tick);
    }
);