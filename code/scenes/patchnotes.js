var gameVersion = "1.2";
var newestVersion = 2;
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
        ],
    "v1.2":
        [
            "-> Skins:",
            "- Added skins and coins!",
            "- Added the skins menu!",
            "- Added 4 skins (default + 3 new)",
            "- Coins are used to buy skins",
            "- One coin appears every 50th pipe",
            "-> Shop:",
            "- Added the shop menu!",
            "- Here two skins can be bought per day",
            "- Offers rotate every day UTC midnight",
            "- Added a new song (shop theme)",
            "-> Main menu:",
            "- Added skins button",
            "- Increased width of buttons",
            "- Update version is now lower on mobile",
            "- Moved tpot's logo",
            "-> Patch notes menu:",
            "- Reduced space between lines to increase",
            "lines per page from 16 to a whopping 32",
            "- Increased width for mobile readability",
            "- Sections are now bigger",
            "- Normal text is now indented",
            "-> Space support:",
            "- Space bar can now also be used to jump",
            "- It can be held to keep jumping",
        ],
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
        createSquare("topBgSquare", 0.1, 0.1, 0.8, 0.1, "darkgray");
        createSquare("midBgSquare", 0.1, 0.2, 0.8, 0.65, "gray");

        createButton("goLeft", 0.1, 0.1, 0.05, 0.1, "button", () => {
            if (selectedVersion > 0) selectedVersion -= 1;
            objects["versionText"].text = "Version " + Object.keys(patchnotes)[selectedVersion];
        });
        createText("goLeftText", 0.125, 0.185, "<", "black", 60);

        createButton("goRight", 0.85, 0.1, 0.05, 0.1, "button", () => {
            if (selectedVersion < newestVersion) selectedVersion += 1;
            objects["versionText"].text = "Version " + Object.keys(patchnotes)[selectedVersion];
        });
        createText("goRightText", 0.875, 0.185, ">", "black", 60);

        createText("versionText", 0.5, 0.185, "Version v" + gameVersion, "black", 40);

        for (vtc = 0; vtc < 32; vtc++) {
            createText("text" + vtc, 0.1125, 0.225 + (0.02 * vtc), "", "black", 20, "left");
        }
    },
    (tick) => {
        // Loop

        let currentVersionText = patchnotes[Object.keys(patchnotes)[selectedVersion]];
        for (vt = 0; vt < 32; vt++) {
            if (vt < currentVersionText.length) {
                objects["text" + vt].text = currentVersionText[vt];
                if (objects["text" + vt].text.substr(0, 2) == "->") {
                    objects["text" + vt].fontSize = 24;
                    objects["text" + vt].x = 0.1125;
                }
                else {
                    objects["text" + vt].fontSize = 20;
                    objects["text" + vt].x = 0.125;
                }
            }
            else {
                objects["text" + vt].text = "";
            }
        }
    }
);