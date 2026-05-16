scenes["idlemode"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createImage("menuground2", 0, 0.9, 1, 0.1, "menuground2");

        createImage("menuground", 0, 0.8, 2, 0.1, "menuground");
        createImage("menuground3", 0, 0, 2, 0.1, "menuground");

        // Header
        createImage("header", 0.01, 0.01, 0.2, 0.1, "title", { aText: { text: "Idle Mode", size: 48, color: "darkgreen" } });
        objects["header"].init();

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            audioPlaySound("click");
            createAnimation("transOut", "fade", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("mainmenu"); save();', 300);
        }, { aText: { text: "Back", size: 40 } });



        // run info
        createText("runInfo1", 0.1, 0.15, "Run #150", { align: "left", size: 24 });
        createText("runInfo2", 0.3, 0.15, "Points: 15548", { align: "left", size: 24 });
        createText("runInfo3", 0.5, 0.15, "155", { align: "left", size: 24 });
        createText("runInfo4", 0.7, 0.15, "??", { align: "left", size: 24 });
        createSquare("runInfoEpicRect", 0.09, 0.16, 0.82, 0.005, "red");
        createSquare("runInfoEpicRect2", 0.89, 0.16, 0.02, 0.01, "red");

        // upgrades
        createText("upgradesHeader", 0.1, 0.4, "Upgrades", { size: 40 });
        createSmartText("pointDisplay", 0.3, 0.4, "1 i{coin}", { size: 32, images: { coin: createImage("coinImage", 0.925, 0.05, 0.05, 0.05, "coin") }});


        // transition fade
        createImage("fade", 0, 0, 1, 1, "fade");
        createAnimation("transIn", "fade", (t, d) => { t.alpha -= d * 4 }, 0.3, true);
        groundAnimation = 0;
    },
    (tick) => {
        // Loop
        groundAnimationLoop(tick);

    }
);