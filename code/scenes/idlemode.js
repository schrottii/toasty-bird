var idleModeHowToPlay = `
Press play to start a run like normal.
You get one feather for every pipe passed.
Based on your attempt that got furthest,
points are generated every second.
Both can be spent on upgrades.
Prestige to get real coins and
golden feathers.`;

scenes["idlemode"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createImage("menuground2", 0, 0.9, 1, 0.1, "menuground2");

        createImage("menuground", 0, 0.8, 2, 0.1, "menuground");
        createImage("menuground3", 0, 0, 2, 0.1, "menuground");

        // Header
        createImage("header", 0.01, 0.01, 0.2, 0.1, "title", { aText: { text: "Idle Bird", size: 48, color: "darkgreen" } });
        objects["header"].init();

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            audioPlaySound("click");
            createAnimation("transOut", "fade", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("mainmenu"); save();', 300);
        }, { aText: { text: "Back", size: 40 } });



        // run info
        let siz = isMobile() ? 16 : 24;
        createText("runInfo1", 0.1, 0.15, "Run #150", { align: "left", size: siz });
        createText("runInfo2", 0.3, 0.15, "Points: 15548", { align: "left", size: siz });
        createText("runInfo3", 0.5, 0.15, "155/s", { align: "left", size: siz });
        createSmartText("runInfo4", 0.7, 0.15, "??", { align: "left", size: siz, images: { goldenfeather: createImage("goldenfeather", 0.925, 0.05, 0.05, 0.05, "goldenfeather") } });
        createSquare("runInfoEpicRect", 0.09, 0.16, 0.82, 0.005, "red");
        createSquare("runInfoEpicRect2", 0.89, 0.16, 0.02, 0.01, "red");

        // upgrades
        createText("upgradesHeader", 0.1, 0.4, "Upgrades", { size: isMobile() ? 24 : 40 });
        createSmartText("pointDisplay", 0.3, 0.4, "1 i{coin}", { size: 32, images: { coin: createImage("featherImage", 0.925, 0.05, 0.05, 0.05, "feather") }});
        createSquare("upgradesUnderLine", 0.025, 0.4, 0.3, 0.005, "red");
        let imgsiz = isMobile() ? 0.05 : 0.1;

        for (let u = 0; u < 2; u++) {
            createSquare("upg" + u + "bg3", 0.02, 0.45 + u * 0.15, 0.3 + 0.005, 0.125 + 0.01, "black");
            createSquare("upg" + u + "bg", 0.02, 0.45 + u * 0.15, 0.3, 0.125, "#007F0E");
            createSquare("upg" + u + "bg2", 0.02, 0.45 + (0.125 / 2) + u * 0.15, 0.3, 0.125 / 2, "#006B00");

            createText("upg" + u + "name", 0.025, 0.475 + u * 0.15, "upgrade name", { align: "left", size: 24, color: "white" });
            createText("upg" + u + "lvl", 0.025, 0.575 + u * 0.15, "lvl 0/50", { align: "left", size: 20, color: "white" });
            createSmartText("upg" + u + "cost", 0.275, 0.575 + u * 0.15, "10i{coin}", { align: "right", size: 20, color: "white", images: { coin: "featherImage" } });

            createImage("upg" + u + "img", 0.27, 0.45 + u * 0.15, imgsiz, imgsiz, "gameLogo", { centered: true, quadratic: true });
        }

        // point upgrades
        createText("pupgradesHeader", 0.525, 0.4, "Point Upgrades", { size: isMobile() ? 24 : 40 });
        createSquare("pupgradesUnderLine", 0.375, 0.4, 0.3, 0.005, "red");

        for (let u = 0; u < 2; u++) {
            createSquare("pupg" + u + "bg3", 0.37, 0.45 + u * 0.15, 0.3 + 0.005, 0.125 + 0.01, "black");
            createSquare("pupg" + u + "bg", 0.37, 0.45 + u * 0.15, 0.3, 0.125, "#007F0E");
            createSquare("pupg" + u + "bg2", 0.37, 0.45 + (0.125 / 2) + u * 0.15, 0.3, 0.125 / 2, "#006B00");

            createText("pupg" + u + "name", 0.375, 0.475 + u * 0.15, "upgrade name", { align: "left", size: 24, color: "white" });
            createText("pupg" + u + "lvl", 0.375, 0.575 + u * 0.15, "lvl 0/50", { align: "left", size: 20, color: "white" });
            createText("pupg" + u + "cost", 0.625, 0.575 + u * 0.15, "10P", { align: "right", size: 20, color: "white" });

            createImage("pupg" + u + "img", 0.62, 0.45 + u * 0.15, imgsiz, imgsiz, "gameLogo", { centered: true, quadratic: true });
        }

        // buttons
        createButton("button1", 0.1, 0.2, 0.2, 0.1, "button", () => { }, { aText: { text: "Play", size: 40 }});
        //createButton("button2", 0.4, 0.2, 0.2, 0.1, "button", () => { }, { aText: { text: "Play", size: 40 }});
        createButton("button3", 0.7, 0.2, 0.2, 0.1, "button", () => { }, { aText: { text: "Prestige", size: 40 }});

        // how it works
        createText("howToPlayHeader", 0.83, 0.4, "how to play", { size: isMobile() ? 16 : 24 });
        createSquare("howToPlayBG", 0.68, 0.4, 0.3, 0.39, "gray");
        createSmartText("howToPlayText", 0.68, 0.425, idleModeHowToPlay, { align: "left", size: 20, color: "white", /*autoLinebreak: isMobile() ? 15 : 32,*/ maxW: 0.3 });

        audioPlayMusic("idlemode");

        // transition fade
        createImage("fade", 0, 0, 1, 1, "fade");
        createAnimation("transIn", "fade", (t, d) => { t.alpha -= d * 4 }, 0.3, true);
        groundAnimation = 0;
    },
    (tick) => {
        // Loop
        groundAnimationLoop(tick);

        objects["runInfo1"].text = "Run #" + game.stats.totalimruns;
        objects["runInfo2"].text = "Points: " + game.idlemode.points;
        objects["runInfo3"].text = game.idlemode.pointprod + "/s";
        objects["runInfo4"].text = game.idlemode.goldenfeathers + " i{goldenfeather}";
    }
);