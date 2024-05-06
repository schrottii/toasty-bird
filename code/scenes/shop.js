function buySkin(skinID) {
    skinID = parseInt(skinID);
    if (!hasSkin(skinID) & game.coins >= getSkinPrice(skinID)) {
        game.coins -= getSkinPrice(skinID);
        game.skins.push(skinID);
    }
}

var skinsInShop = [];

scenes["shop"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createText("header", 0.5, 0.1, "Shop", "black", 80);

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            loadScene("skins");
        });
        createText("buttonText", 0.5, 0.95, "Back", "black", 40);

        createText("coinText", 0.5, 0.15, "0 Coins", "orange", 40);



        createSquare("underyourskin", 0.3, 0.2, 0.4, 0.6, "lightgray");
        skinsInShop = [];

        // the offer

        // skin 1
        let ski = (new Date().getUTCDate() /** new Date().getUTCMonth()*/) % skins.length;
        createButton("skin" + ski, 0.5, 0.2, 0.15, 0.15, "unknown", (me) => {
            buySkin(me.substr(4));
        }, true);
        objects["skin" + ski].snip = [0, 0, 32, 32];
        skinsInShop.push(ski);

        createText("skinname1", 0.5, 0.4, "...", "black", 32, "center");
        createText("skintext1", 0.5, 0.433, "...", "black", 32, "center");

        // skin 2
        ski = (ski + 1) % skins.length;
        createButton("skin" + ski, 0.5, 0.5, 0.15, 0.15, "unknown", (me) => {
            buySkin(me.substr(4));
        }, true);
        objects["skin" + ski].snip = [0, 0, 32, 32];
        skinsInShop.push(ski);

        createText("skinname2", 0.5, 0.7, "...", "black", 32, "center");
        createText("skintext2", 0.5, 0.733, "...", "black", 32, "center");

        // music
        musicPlayer.src = "audio/toasty-shop.mp3";
        musicPlayer.volume = game.settings.music ? 1 : 0;
        if (game.settings.music) musicPlayer.play();
    },
    (tick) => {
        // Loop
        groundAnimation += tick;
        if (groundAnimation > 2) groundAnimation = 0;

        objects["coinText"].text = game.coins + " Coins";

        for (i = 0; i < 2; i++) {
            objects["skin" + skinsInShop[i]].image = !hasSkin(skinsInShop[i]) ? "skins/" + getSkin(skinsInShop[i]) : "unknown";
            objects["skin" + skinsInShop[i]].snip = [0, groundAnimation >= 1 ? 32 : 0, 32, 32];

            if (hasSkin(skinsInShop[i])) objects["skintext" + (i + 1)].text = "Already bought!";
            else objects["skintext" + (i + 1)].text = getSkinPrice(skinsInShop[i]) + " Coins";
            objects["skinname" + (i + 1)].text = getSkinName(skinsInShop[i]);
        }
    }
);