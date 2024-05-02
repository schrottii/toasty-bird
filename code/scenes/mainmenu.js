var groundAnimation = 0;

scenes["mainmenu"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createImage("menuground2", 0, 0.9, 1, 0.1, "menuground2");

        createImage("menuground", 0, 0.8, 2, 0.1, "menuground");
        createImage("menuground3", 0, 0, 2, 0.1, "menuground");

        createImage("gameLogo", 0.5, 0.1, 0.4, 0.4, "gameLogo", true);



        createImage("logo", 0.5, 0.125, 0.4, 0.25, "logo", true);
        createText("version", 0.975, 0.8, "Version " + gameVersion, "black", 40, "right");

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
        createText("buttonText1", 0.5, 0.475, "Play", "black", 40);

        // Stats button
        createButton("statsbutton", 0.3, 0.525, 0.4, 0.1, "button", () => {
            loadScene("stats");
        });
        createText("buttonText2", 0.5, 0.6, "Stats", "black", 40);

        // Settings button
        createButton("settingsbutton", 0.3, 0.65, 0.4, 0.1, "button", () => {
            loadScene("settings");
        });
        createText("buttonText3", 0.5, 0.725, "Settings", "black", 40);

        // Skins button
        createButton("skinbutton", 0.3, 0.775, 0.4, 0.1, "button", () => {
            loadScene("skins");
        });
        createText("buttonText4", 0.5, 0.85, "Skins", "black", 40);
        
        // Left Icons
        createButton("serverbutton", 0.1, 0.4, 0.08, 0.08, "whiteDiscord", () => {
            window.open("https://discord.gg/CbBeJXKUrk");
        }, true);
        createText("wButtonText1", 0.14, 0.46, "Discord", "white", 32, "left");

        createButton("patchnotesbutton", 0.1, 0.5, 0.08, 0.08, "whiteNotes", () => {
            loadScene("patchnotes");
        }, true);
        createText("wButtonText2", 0.14, 0.56, "Patch notes", "white", 32, "left");

        createButton("websitebutton", 0.1, 0.6, 0.08, 0.08, "whiteWebsite", () => {
            window.open("https://schrottii.github.io/");
        }, true);
        createText("wButtonText3", 0.14, 0.66, "Website", "white", 32, "left");

        musicPlayer.src = "audio/menu-theme.mp3";
        musicPlayer.volume = game.settings.music ? 1 : 0;
        if (game.settings.music) musicPlayer.play();
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
        }
    }
);