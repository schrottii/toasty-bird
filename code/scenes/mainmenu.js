var groundAnimation = 0;

scenes["mainmenu"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createImage("menuground2", 0, 0.9, 1, 0.1, "menuground2");

        createImage("menuground", 0, 0.8, 2, 0.1, "menuground");
        createImage("menuground3", 0, 0, 2, 0.1, "menuground");

        // by tpot
        createImage("gameLogo", 0.5, 0.1, 0.4, 0.4, "gameLogo", { quadratic: true, centered: true });

        createImage("logo", 0.5, 0, 0.4, 0.25, "logo", { quadratic: true, centered: true });
        createText("version", 0.975, 0.8, "Version " + gameVersion, { size: 40, align: "right" });

        // Play button
        createButton("playbutton", 0.3, 0.4, 0.4, 0.1, "button", () => {
            game.stats.normalplays += 1;
            game.stats.totalplays += 1;

            pipes = [];
            pipeSpawnTime = 1;
            gameAcceleration = 1;
            points = 0;
            gameState = "running";
            loadScene("play");
        });
        createText("buttonText1", 0.5, 0.475, "Play", { size: 40 });

        // Stats button
        createButton("playerbutton", 0.3, 0.525, 0.4, 0.1, "button", () => {
            loadScene("player");
        });
        createText("buttonText2", 0.5, 0.6, "Player", { size: 40 });

        // Skins button
        createButton("shopbutton", 0.3, 0.65, 0.4, 0.1, "button", () => {
            loadScene("shop");
        });
        createText("buttonText3", 0.5, 0.725, "Shop", { size: 40 });

        // Settings button
        createButton("settingsbutton", 0.3, 0.775, 0.4, 0.1, "button", () => {
            loadScene("settings");
        });
        createText("buttonText4", 0.5, 0.85, "Settings", { size: 40 });
        
        // Left Icons
        createButton("serverbutton", 0.02, 0.35, 0.08, 0.08, "whiteDiscord", () => {
            window.open("https://discord.gg/CbBeJXKUrk");
        }, { quadratic: true });
        createText("wButtonText1", 0.06, 0.41, "Discord", { color: "white", size: 32, align: "left" });

        createButton("patchnotesbutton", 0.02, 0.45, 0.08, 0.08, "whiteNotes", () => {
            loadScene("patchnotes");
        }, { quadratic: true });
        createText("wButtonText2", 0.06, 0.51, "Patch notes", { color: "white", size: 32, align: "left" });

        createButton("websitebutton", 0.02, 0.55, 0.08, 0.08, "whiteWebsite", () => {
            window.open("https://schrottii.github.io/");
        }, { quadratic: true });
        createText("wButtonText3", 0.06, 0.61, "Website", { color: "white", size: 32, align: "left" });

        createButton("statsbutton", 0.02, 0.65, 0.08, 0.08, "whiteStats", () => {
            loadScene("stats");
        }, { quadratic: true });
        createText("wButtonText4", 0.06, 0.71, "Stats", { color: "white", size: 32, align: "left" });

        createButton("donateButton", 0.05, 0.875, 0.2, 0.1, "#8E003D", () => {
            window.open("https://ko-fi.com/Y8Y2XMZX1");
        })
        createText("donateText", 0.15, 0.875 + 0.1 * 2 / 3, "Donate", { color: "white", size: 40 });

        wggjAudio.src = "audio/menu-theme.mp3";
        wggjAudio.volume = game.settings.music ? 1 : 0;
        if (game.settings.music) wggjAudio.play();
    },
    (tick) => {
        // Loop
        groundAnimation += tick;
        objects["menuground"].x -= tick;
        objects["menuground3"].x -= tick;
        if (groundAnimation >= 1) {
            groundAnimation = 0;
            objects["menuground"].x = 0;
            objects["menuground3"].x = 0;
        }

        if (isMobile()) {
            objects["version"].y = 0.975;
            objects["wButtonText1"].y = 10;
            objects["wButtonText2"].y = 10;
            objects["wButtonText3"].y = 10;
            objects["wButtonText4"].y = 10;
        }
    }
);