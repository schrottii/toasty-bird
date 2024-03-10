var groundAnimation = 0;

scenes["mainmenu"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createImage("menuground2", 0, 0.9, 1, 0.1, "menuground2");

        createImage("menuground", 0, 0.8, 2, 0.1, "menuground");
        createImage("menuground3", 0, 0, 2, 0.1, "menuground");



        createImage("logo", 0.5, 0.125, 0.4, 0.25, "logo", true);
        createText("version", 0.975, 0.8, "Version 1.0", "black", 60, "right");

        // Play button
        createButton("playbutton", 0.4, 0.4, 0.2, 0.1, "button", () => {
            game.stats.normalplays += 1;
            game.stats.totalplays += 1;

            pipes = [];
            pipeSpawnTime = 1;
            points = 0;
            gameState = "running";
            loadScene("play");
        });
        createText("buttonText1", 0.5, 0.475, "Play", "black", 40);

        // Stats button
        createButton("statsbutton", 0.4, 0.525, 0.2, 0.1, "button", () => {
            loadScene("stats");
        });
        createText("buttonText2", 0.5, 0.6, "Stats", "black", 40);

        // Server button
        createButton("serverbutton", 0.4, 0.65, 0.2, 0.1, "button", () => {
            window.open("https://discord.gg/CbBeJXKUrk");
        });
        createText("buttonText3", 0.5, 0.725, "Discord Server", "black", 40);

        musicPlayer.src = "audio/menu-theme.mp3";
        musicPlayer.play();
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
            objects["buttonText3"].text = "Discord";
        }
    }
);