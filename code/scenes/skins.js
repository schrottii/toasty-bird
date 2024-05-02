var skins = [
    ["player", 0],
    ["bald", 20],
    ["female", 20],
    ["elmenda", 45],
]

function getSkin(skinID) {
    // 0 is default
    return skins[skinID][0];
}
function getSkinPrice(skinID) {
    // 0 is default
    return skins[skinID][1];
}

function hasSkin(skinID) {
    return game.skins.includes(parseInt(skinID));
}

function clickSkin(skinID) {
    if (hasSkin(parseInt(skinID))) {
        game.skin = skinID;
    }
}

scenes["skins"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createText("header", 0.5, 0.1, "Skins", "black", 80);

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", "black", 40);

        // Shop button
        createButton("shopbutton", 0.9, 0.1, 0.1, 0.1, "whiteShop", () => {
            loadScene("shop");
        }, true);

        createSquare("underyourskin", 0, 0.2, 1, 0.2, "lightgray");

        for (ski = 0; ski < 4; ski++) {
            createButton("skin" + ski, 0.1 + (0.77 / 3 * ski), 0.2, 0.15, 0.15, hasSkin(ski) ? "skins/" + getSkin(ski) : "unknown", (me) => {
                clickSkin(me.substr(4));
            }, true);
            objects["skin" + ski].snip = [0, 0, 32, 32];
        }

        createSquare("underyourskin2", 0.4, 0.7, 0.2, 0.1, "lightgray");

        createImage("player", 0.5, 0.7, 0.1, 0.1, "skins/" + getSkin(game.skin), true);
        objects["player"].snip = [0, 0, 32, 32];

        musicPlayer.src = "audio/menu-theme.mp3";
        musicPlayer.volume = game.settings.music ? 1 : 0;
        if (game.settings.music) musicPlayer.play();
    },
    (tick) => {
        // Loop
        groundAnimation += tick;
        if (groundAnimation > 2) groundAnimation = 0;
        objects["player"].snip = [0, groundAnimation >= 1 ? 32 : 0, 32, 32];

        objects["player"].image = "skins/" + getSkin(game.skin);
    }
);