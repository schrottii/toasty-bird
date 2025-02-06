scenes["shop"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createText("header", 0.5, 0.1, "Shop", { size: 80 });

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            save();
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", { size: 40 });

        createText("coinText", 0.9, 0.1, "0 Coins", { color: "orange", size: 40, align: "right" });

        // Calculate Skins
        let bob = new Date();
        let today = bob.getUTCFullYear() + "0" + (bob.getUTCMonth() < 10 ? "0" + bob.getUTCMonth() : bob.getUTCMonth()) + (bob.getUTCDate() < 10 ? "0" + bob.getUTCDate() : bob.getUTCDate());

        // the containerrrrrrr
        createContainer("shopScroll", 0, 0.1, 1, 0.7, {
            color: "#006800", limitEffect: true,
            XScroll: true, XScrollMod: 2, XLimit: [0.00001, 1.4]
        }, [
            // scrosec = scroll section
            createSquare("scrosecSkinsBG", 0.05, 0.15, 0.6, 0.6, "#048B04"),
            createText("scrosecSkinsTXT", 0.05 + 0.6 / 2, 0.15, "Skins", { size: 40 }),

            createSquare("scrosecTagSkinsBG", 0.7, 0.15, 0.6, 0.6, "#048B04"),
            createText("scrosecTagSkinsTXT", 0.7 + 0.6 / 2, 0.15, "Tagged Skins", { size: 40 }),
            createText("scrosecTagSkinsCurrentTagIntro", 0.7 + 0.6 / 2, 0.2, "Current Tag:", { size: 24 }),
            createText("scrosecTagSkinsCurrentTag", 0.7 + 0.6 / 2, 0.25, "...", { size: 40 }),

            createSquare("scrosecSkillsBG", 1.35, 0.15, 0.6, 0.6, "#048B04"),
            createText("scrosecSkillsTXT", 1.35 + 0.6 / 2, 0.15, "Skills", { size: 40 }),
            "skill0", "skillname0", "skillinfo0", "skilltext0", "skilldesc0", "skilldesc0b",

            createSquare("scrosecGiftBG", 2, 0.15, 0.3, 0.6, "#048B04"),
            createText("scrosecGiftTXT", 2 + 0.3 / 2, 0.15, "Daily Gift", { size: 40 }),
            "dailygift", "dailyGiftText",
        ]);

        // the offers

        // skins
        let ski = new Date().getUTCDate() % skins.length;

        for (let iS = 0; iS < 4; iS++) {
            createButton("skin" + iS, 0.2 + (Math.floor(iS / 2) * 0.3), 0.2 + ((iS % 2) * 0.3), 0.15, 0.15, "unknown", (me) => {
                getSkin(objects[me].config.id).buySkin();
            }, { quadratic: true, centered: true, id: 1 + Math.ceil(Math.PI * ski * Math.pow(ski + 4, iS)) % (skins.length - 1) });

            objects["skin" + iS].snip = [0, 0, 32, 32];

            createText("skinname" + iS, 0.2 + (Math.floor(iS / 2) * 0.3), 0.4 + ((iS % 2) * 0.3), "...", { size: 32 });
            createText("skintext" + iS, 0.2 + (Math.floor(iS / 2) * 0.3), 0.433 + ((iS % 2) * 0.3), "...", { size: 24 });

            objects["shopScroll"].children.push("skin" + iS, "skinname" + iS, "skintext" + iS);
        }

        let currentTag = Object.keys(tags)[Math.ceil(new Date().getUTCDate() / 3) % Object.keys(tags).length];
        objects["scrosecTagSkinsCurrentTag"].text = tags[currentTag];

        let possibleSkins = getAllSkinsOfTag(currentTag);
        ski = Math.ceil(new Date().getUTCDate() / 3) % possibleSkins.length;

        for (let iS = 4; iS < 6; iS++) {
            createButton("skin" + iS, 0.85 + ((iS - 4) * 0.3), 0.35, 0.15, 0.15, "unknown", (me) => {
                getSkin(objects[me].config.id).buySkin();
            }, { quadratic: true, centered: true, id: possibleSkins[Math.ceil(Math.PI * ski * Math.pow(ski + 4, iS)) % possibleSkins.length] });
            if (possibleSkins.length > 1) possibleSkins.splice(Math.ceil(Math.PI * ski * Math.pow(ski + 4, iS)) % possibleSkins.length, 1); // avoid duplicates
            objects["skin" + iS].snip = [0, 0, 32, 32];

            createText("skinname" + iS, 0.85 + ((iS - 4) * 0.3), 0.4 + 0.15, "...", { size: 32 });
            createText("skintext" + iS, 0.85 + ((iS - 4) * 0.3), 0.433 + 0.15, "...", { size: 24 });

            objects["shopScroll"].children.push("skin" + iS, "skinname" + iS, "skintext" + iS);
        }

        // skill
        ski = ski % skills.length;
        createButton("skill0", 1.45, 0.35, isMobile() ? 0.1 : 0.2, isMobile() ? 0.1 : 0.2, "unknown", (me) => {
            getSkill(objects[me].config.id).buy();
        }, { quadratic: true, centered: true, id: skills[ski].ID });

        createText("skillname0", 1.6, 0.3, "...", { size: isMobile() ? 20 : 40, align: "left" });
        createText("skillinfo0", 1.6, 0.34, "...", { size: 20, align: "left" });
        createText("skilltext0", 1.65, 0.725, "...", { size: 24 });
        createText("skilldesc0", 1.55, 0.5, "...", { size: 20, align: "left" });
        createText("skilldesc0b", 1.55, 0.54, "...", { size: 20, align: "left" });

        // Daily Gift
        createButton("dailygift", 2.15, 0.3, 0.15, 0.15, "whiteGift", () => {
            let bob = new Date();
            let today = bob.getUTCFullYear() + "0" + (bob.getUTCMonth() < 10 ? "0" + bob.getUTCMonth() : bob.getUTCMonth()) + (bob.getUTCDate() < 10 ? "0" + bob.getUTCDate() : bob.getUTCDate());
            if (parseInt(game.lastGift) < parseInt(today)) {
                game.lastGift = today;

                let amount = 5;

                game.coins += amount;
                game.stats.totalcoins += amount;
                game.stats.totalgifts += 1;
                objects["dailygift"].image = "claimedGift";
                objects["dailyGiftText"].text = "Come back tomorrow!";
            }
        }, { quadratic: true, centered: true });
        createText("dailyGiftText", 2.15, 0.7, "Click to claim!", { color: "yellow", size: isMobile() ? 16 : 24 });
        if (parseInt(game.lastGift) == parseInt(today)) {
            objects["dailygift"].image = "claimedGift";
            objects["dailyGiftText"].text = "Come back tomorrow!";
        }

        // buy confirmation
        createSquare("confirmBuyBg", 0.1, 0.2, 0.8, 0.6, "brown");
        createText("confirmBuyHeader", 0.5, 0.3, "Do you want to buy this?", { size: 32 });
        createImage("confirmBuyImage", 0.5, 0.4, 0.15, 0.15, "skins/default", { centered: true, quadratic: true });
        objects["confirmBuyImage"].snip = [0, 0, 32, 32];

        createButton("confirmBuyButton", 0.25, 0.7, 0.2, 0.1, "button", () => {
            objects["confirmBuyBg"].power = objects["confirmBuyHeader"].power = objects["confirmBuyButton"].power = objects["confirmBuyButtonText"].power = objects["confirmBuyCancelButton"].power = objects["confirmBuyCancelButtonText"].power = objects["confirmBuyImage"].power = false;
            skins[objects["confirmBuyButton"].config.skinID].buySkin(true);
        });
        createText("confirmBuyButtonText", 0.35, 0.775, "YES", { size: 20 });
        createButton("confirmBuyCancelButton", 0.55, 0.7, 0.2, 0.1, "button", () => {
            objects["confirmBuyBg"].power = objects["confirmBuyHeader"].power = objects["confirmBuyButton"].power = objects["confirmBuyButtonText"].power = objects["confirmBuyCancelButton"].power = objects["confirmBuyCancelButtonText"].power = objects["confirmBuyImage"].power = false;
        });
        createText("confirmBuyCancelButtonText", 0.65, 0.775, "NO", { size: 20 });

        objects["confirmBuyBg"].power = objects["confirmBuyHeader"].power = objects["confirmBuyButton"].power = objects["confirmBuyButtonText"].power = objects["confirmBuyCancelButton"].power = objects["confirmBuyCancelButtonText"].power = objects["confirmBuyImage"].power = false;

        // music
        wggjAudio.src = "audio/toasty-shop.mp3";
        wggjAudio.volume = game.settings.music ? 1 : 0;
        if (game.settings.music) wggjAudio.play();
    },
    (tick) => {
        // Loop
        groundAnimation += tick;
        if (groundAnimation > 2) groundAnimation = 0;

        objects["coinText"].text = game.coins + " Coins";

        for (i = 0; i < 6; i++) {
            let thisSkin = objects["skin" + i].config.id;

            objects["skin" + i].image = !getSkin(thisSkin).isOwned() ? "skins/" + getSkin(thisSkin).getImage() : "unknown";
            objects["skin" + i].snip = [0, groundAnimation >= 1 ? 32 : 0, 32, 32];

            if (getSkin(thisSkin).isOwned()) objects["skintext" + i].text = "Bought!";
            else objects["skintext" + i].text = getSkin(thisSkin).getPrice() + " Coins";
            objects["skinname" + i].text = getSkin(thisSkin).getName();
        }

        let thisSkill = getSkill(objects["skill0"].config.id);

        objects["skill0"].image = !thisSkill.isOwned() ? "skills/" + thisSkill.getImage() : "unknown";

        if (thisSkill.isOwned()) objects["skilltext0"].text = "Already bought!";
        else objects["skilltext0"].text = thisSkill.getPrice() + " Coins";
        objects["skillname0"].text = thisSkill.getName();
        objects["skillinfo0"].text = thisSkill.getRarityName() + " - Infinite Uses";
        objects["skilldesc0"].text = thisSkill.getDesc().substr(0, isMobile() ? 24 : 32);
        objects["skilldesc0b"].text = thisSkill.getDesc().substr(isMobile() ? 24 : 32);
        objects["skillname0"].color = thisSkill.getRarityColor();
    }
);