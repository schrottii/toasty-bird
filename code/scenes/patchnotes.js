var gameVersion = "1.5.1";
var newestVersion = 11;
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
            "The Skins & Shop Update",
            "",
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
    "v1.2.1":
        [
            "The More Skin Update",
            "",
            "-> Skins:",
            "- Added 4 new skins (8 total)",
            "- Added a second row for the new skins",
            "- Added skin names",
            "- Skin names are visible in the selection",

            "-> Shop:",
            "- Skin names are also visible here",
            "- Skins in the shop are now animated to offer",
            "a better preview",
            "- Added a gray background",

            "-> Stats:",
            "- Added Total Coins stat",
            "- Added Skins stat (e. g. 1/8)",

            "-> Other:",
            "- Update names are now shown in patch notes",
            "(e. g. The More Skin Update)",
        ],
    "v1.3":
        [
            "The Inventory Skills Update",
            "",
            "-> Inventory:",
            "- Added a new scene for the player, inventory,",
            "skin selection and more",
            "- Current Skin and Skill are shown on the left",
            "- Export and import are also available here",
            "- The right side has the inventory",
            "- Here many Skins or Skills can be shown",
            "at once and be selected",

            "-> Skills:",
            "- New feature: Skills",
            "- They can provide passive boosts",
            "- 1 Skill can be equipped at once",
            "- Added 4 Skills, 1 of each rarity",

            "-> Shop:",
            "- Expanded shop, 2 -> 3 skins",
            "- Added 1 skill offer",

            "-> Main menu:",
            "- Changed the buttons:",
            "Play, Stats, Settings, Skins ->",
            "Play, Player, Shop, Settings",
            "- Centered game logos",
            "- Added a fourth white button for stats",
            "- Moved white buttons even more to the left",

            "-> Other:",
            "- Added 4 new skins",
            "- Buying a skin now saves the game",
            "- Menda skin: fixed missing glass",
            "- Changed shop background color",
            "- Code and rendering improvements",
        ],
    "v1.3.1":
        [
            "The Gifted Bird Update",
            "",
            "-> Daily Gift:",
            "- Added the daily gift",
            "- Can be claimed in the shop once per day",
            "- Contains 5 coins",

            "-> Skill Balance:",
            "- Gold Digger: Increased chance from 10% to 20%",
            "- Adjusted skill prices",

            "-> Skill prices:",
            "- Reduced prices:",
            "- Common: 50 -> 25",
            "- Uncommon: 100 -> 50",
            "- Rare: 250 -> 100",
            "- Epic: 400 -> 200",
            "- No refunds.",

            "-> Other:",
            "- Shop now displays skill description",
            "- Player: Added shop button in the top right",
            "- Shop: Added daily gift button",
        ],
    "v1.3.2":
        [
            "- Implemented WGGJ",
            "- Added a donate button",

            "-> Skins:",
            "- Added 4 new skins (16 total)",
            "- Medibird, 24 Coins",
            "- Sleepy Man, 30 Coins",
            "- Heart, 20 Coins",
            "- Diamond, 100 Coins",
        ],
    "v1.4":
        [
            "Stop The Cats Update",
            "",
            "-> Skins:",
            "- Added 4 new skins (20 total)",
            "- Cat 1, 20 Coins",
            "- Cat 2, 20 Coins",
            "- Cat 3, 20 Coins",
            "- Cat 4, 20 Coins",

            "-> Play:",
            "- Added a Pause button (top right)",
            "- Game can also be paused by pressing P",
            "- Equipped Skill is now shown (top left)",

            "-> Death Effect:",
            "- Added a death effect",
            "- Appears when the bird crashes",
            "- Is animated",

            "-> Other:",
            "- Updated WGGJ from v1.0 to v1.1",
            "- Improved text scaling/sizes",
            "- Minor improvements to the Player scene",
        ],
    "v1.4.1":
        [
            "-> Major:",
            "- Game now runs the same regardless of Hz/FPS",
            "- Coins gathered this run are now displayed",
            "- Increased the bird's fall speed",

            "-> Minor:",
            "- Stats: added amount of Skills",
            "- When no Skill is equipped, the background is",
            "no longer shown while playing",
            `- Selecting a skin/skill you don't have now says`,
            `"Locked!" rather than "Skin/Skill selected!"`,
        ],
    "v1.4.2":
        [
            "-> Buttons:",
            "- New design for normal buttons",
            "- New images for import and export buttons",

            "-> Gameplay:",
            "- Game is now saved the moment you die, instead",
            "of when you click Continue",
            "- Increased max. player name length from 8 to 12",

            "-> Other:",
            "- Coins this run learned what a singular is",
            "- Shop: Added Daily Gift text",
            "- Current version is now at the bottom on PC too",
        ],
    "v1.5":
        [
            `
Shopping Bird Update

-> Shop:
- Reworked the Shop design!
- It now has a scrollable container
- Sections: Skins, Tag Skins, Skills, Daily Gift
- Added buy confirmations for skins
- Skins: Reworked the semi-random skin selection
- Added a fourth skin to the normal selection
- Tagged Skins: Two skins of a certain tag
- They only change every third day

-> Skin Tags:
- Skins can now have tags
- For example Cat or Male
- Used for the Tagged Skins shop section

-> New Skins:
- Added 4 new skins (24 total)
- Flying Mouse, 20 Coins
- Robot Bird, 30 Coins
- Vampire, 30 Coins
- Hammer Time, 50 Coins

-> Other:
- Made it a bit easier for me to add patch notes
- Updated WGGJ from v1.1 to v1.2.1
            `
        ],
    "v1.5.1":
        [
            `
-> New Skins:
- Added 4 new skins (28 total)
- Snake, 29 Coins
- Queen Luna, 29 Coins
- Ghost, 40 Coins
- Cool Planet, 40 Coins

-> Other:
- Shop: Replaced coins text with image
- Player: Moved import button next to export button
- Patch notes: font size adjustments
- Fixed time not ticking up bug
            `
        ],
}

scenes["patchnotes"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createText("header", 0.5, 0.1, "Patch notes", { size: 64 });

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", { size: 40 });

        // Top navigation
        createSquare("topBgSquare", 0.1, 0.1, 0.8, 0.1, "darkgray");
        createSquare("midBgSquare", 0.1, 0.2, 0.8, 0.65, "gray");

        createButton("goLeft", 0.1, 0.1, 0.05, 0.1, "button", () => {
            if (selectedVersion > 0) selectedVersion -= 1;
            objects["versionText"].text = "Version " + Object.keys(patchnotes)[selectedVersion];
        });
        createText("goLeftText", 0.125, 0.185, "<", { size: 60 });

        createButton("goRight", 0.85, 0.1, 0.05, 0.1, "button", () => {
            if (selectedVersion < newestVersion) selectedVersion += 1;
            objects["versionText"].text = "Version " + Object.keys(patchnotes)[selectedVersion];
        });
        createText("goRightText", 0.875, 0.185, ">", { size: 60 });

        createText("versionText", 0.5, 0.185, "Version v" + gameVersion, { size: 40 });

        for (vtc = 0; vtc < 32; vtc++) {
            createText("text" + vtc, 0.1125, 0.225 + (0.021 * vtc), "", { size: 15, align: "left", noScaling: true });
        }
    },
    (tick) => {
        // Loop

        let currentVersionText = patchnotes[Object.keys(patchnotes)[selectedVersion]];
        if (currentVersionText.length == 1) {
            currentVersionText = currentVersionText[0].split("\n");
            currentVersionText.shift();
        }

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