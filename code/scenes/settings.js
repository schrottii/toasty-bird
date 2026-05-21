scenes["settings"] = new Scene(
    () => {
        // Init
        function updateSettings() {
            objects["settingText1"].text = "Music: " + (game.settings.music ? "ON" : "OFF");
            objects["settingText2"].text = "Sounds: " + (game.settings.sounds ? "ON" : "OFF");
            objects["settingText3"].text = "Device: " + game.settings.device.substr(0, 1).toUpperCase() + game.settings.device.substr(1);
            objects["settingText4"].text = "Bird Rotation: " + (game.settings.birdRotation ? "ON" : "OFF");
        }

        createSquare("bg", 0, 0, 1, 1, "green");

        createImage("menuground2", 0, 0.9, 1, 0.1, "menuground2");

        createImage("menuground", 0, 0.8, 2, 0.1, "menuground");
        createImage("menuground3", 0, 0, 2, 0.1, "menuground");

        // Header
        createImage("header", 0.01, 0.01, 0.2, 0.1, "title", { aText: { text: "Settings", size: 48, color: "darkgreen" } });
        objects["header"].init();

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            audioPlaySound("click");
            createAnimation("transOut", "fade", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("mainmenu"); save();', 300);
        }, { aText: { text: "Save", size: 40 } });

        // Settings
        createButton("setting1", 0.3, 0.2, 0.4, 0.1, "button", () => {
            audioPlaySound("click");
            game.settings.music = !game.settings.music;
            audioChangeVolume("music", game.settings.music);
            updateSettings();
        });
        createText("settingText1", 0.5, 0.275, "?", { size: 40 });

        createButton("setting2", 0.3, 0.35, 0.4, 0.1, "button", () => {
            audioPlaySound("click");
            game.settings.sounds = !game.settings.sounds;
            audioChangeVolume("sounds", game.settings.sounds);
            updateSettings();
        });
        createText("settingText2", 0.5, 0.425, "?", { size: 40 });

        createButton("setting3", 0.3, 0.5, 0.4, 0.1, "button", () => {
            audioPlaySound("click");
            switch (game.settings.device) {
                case "automatic":
                    game.settings.device = "pc";
                    break;
                case "pc":
                    game.settings.device = "mobile";
                    break;
                case "mobile":
                    game.settings.device = "automatic";
                    break;
            }
            updateSettings();
        });
        createText("settingText3", 0.5, 0.575, "?", { size: 40 });

        createButton("setting4", 0.3, 0.65, 0.4, 0.1, "button", () => {
            audioPlaySound("click");
            game.settings.birdRotation = !game.settings.birdRotation;
            updateSettings();
        });
        createText("settingText4", 0.5, 0.725, "?", { size: 40 });

        // legal blurb
        createButton("legal1", 0, 0.7, 0.2, 0.1, "button", () => {
            audioPlaySound("click");
            window.open("LICENSE.md");
        }, { aText: { text: "LICENSE", size: 24 } });
        createButton("legal2", 0, 0.8, 0.2, 0.1, "button", () => {
            audioPlaySound("click");
            window.open("TOS.md");
        }, { aText: { text: "TERMS OF SERVICE", size: 16 } });
        createButton("legal3", 0, 0.9, 0.2, 0.1, "button", () => {
            audioPlaySound("click");
            window.open("PRIVACY.md");
        }, { aText: { text: "PRIVACY POLICY", size: 16 } });

        // Init
        updateSettings();

        // transition fade
        createImage("fade", 0, 0, 1, 1, "fade");
        createAnimation("transIn", "fade", (t, d) => { t.alpha -= d * 4 }, 0.3, true);
        groundAnimation = 0;

        if (isMobile()) {
            objects["buttonExport"].w = objects["buttonExport"].h = 0.05;
            objects["buttonImport"].w = objects["buttonImport"].h = 0.05;
        }
    },
    (tick) => {
        // Loop
        groundAnimationLoop(tick);

    }
);