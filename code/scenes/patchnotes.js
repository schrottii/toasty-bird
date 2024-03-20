var gameVersion = "1.1";
var newestVersion = 1;
var selectedVersion = newestVersion;

const patchnotes = {
    "v1.0":
        [
            "- Game release",
        ],
    "v1.1":
        [
            "-> New content:",
            "- Added retro font!",
            "- Added the patch notes menu!",
            "- Added the settings menu!",
            "- Added 3 white buttons in the main menu",
            "  (server, patch notes, website)",
            "- Replaced the server button with settings",
            "-> Settings:",
            "- New Setting: Music (ON/OFF)",
            "- New Setting: Device (Automatic/Mobile/Pc)",
            "-> Other:",
            "- Added game logo made by tpot",
            "- Halfed pipe speed on mobile",
            "- Reduced swing speed & max. swing",
        ]
}

scenes["patchnotes"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createText("header", 0.5, 0.1, "Patch notes", "black", 80);

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", "black", 40);

        // Top navigation
        createSquare("topBgSquare", 0.2, 0.1, 0.6, 0.1, "darkgray");
        createSquare("midBgSquare", 0.2, 0.2, 0.6, 0.65, "gray");

        createButton("goLeft", 0.2, 0.1, 0.05, 0.1, "button", () => {
            if (selectedVersion > 0) selectedVersion -= 1;
            objects["versionText"].text = "Version " + Object.keys(patchnotes)[selectedVersion];
        });
        createText("goLeftText", 0.225, 0.185, "<", "black", 60);

        createButton("goRight", 0.75, 0.1, 0.05, 0.1, "button", () => {
            if (selectedVersion < newestVersion) selectedVersion += 1;
            objects["versionText"].text = "Version " + Object.keys(patchnotes)[selectedVersion];
        });
        createText("goRightText", 0.775, 0.185, ">", "black", 60);

        createText("versionText", 0.5, 0.185, "Version v1.1", "black", 40);

        createText("text1", 0.21, 0.26, "", "black", 20, "left");
        createText("text2", 0.21, 0.30, "", "black", 20, "left");
        createText("text3", 0.21, 0.34, "", "black", 20, "left");
        createText("text4", 0.21, 0.38, "", "black", 20, "left");
        createText("text5", 0.21, 0.42, "", "black", 20, "left");
        createText("text6", 0.21, 0.46, "", "black", 20, "left");
        createText("text7", 0.21, 0.50, "", "black", 20, "left");
        createText("text8", 0.21, 0.54, "", "black", 20, "left");
        createText("text9", 0.21, 0.58, "", "black", 20, "left");
        createText("text10", 0.21, 0.62, "", "black", 20, "left");
        createText("text11", 0.21, 0.66, "", "black", 20, "left");
        createText("text12", 0.21, 0.70, "", "black", 20, "left");
        createText("text13", 0.21, 0.74, "", "black", 20, "left");
        createText("text14", 0.21, 0.78, "", "black", 20, "left");
        createText("text15", 0.21, 0.82, "", "black", 20, "left");
        createText("text16", 0.21, 0.86, "", "black", 20, "left");
    },
    (tick) => {
        // Loop

        let currentVersionText = patchnotes[Object.keys(patchnotes)[selectedVersion]];
        for (vt = 1; vt < 17; vt++) {
            if (vt < currentVersionText.length + 1) objects["text" + vt].text = currentVersionText[vt - 1];
            else objects["text" + vt].text = "";
        }
    }
);