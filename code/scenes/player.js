var inventoryMode = "skins";
var playerUpdate = "";

function togglePlayerConfirm(state) {
    setTimeout(() => objects["confirmBuyBg"].power = objects["confirmBuyHeader"].power = objects["confirmBuyButton"].power = objects["confirmBuyButtonText"].power = objects["confirmBuyText"].power = objects["confirmBuyText2"].power = objects["confirmBuyCancelButton"].power = objects["confirmBuyCancelButtonText"].power = objects["confirmBuyImage"].power = objects["confirmBuyImageBG"].power = state, 20);
}

scenes["player"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createImage("menuground2", 0, 0.9, 1, 0.1, "menuground2");

        createImage("menuground", 0, 0.8, 2, 0.1, "menuground");
        createImage("menuground3", 0, 0, 2, 0.1, "menuground");

        // Header
        createImage("headerBg", 0.01, 0.01, 0.2, 0.1, "title");
        createText("header", 0.11, 0.09, "Player", { size: 48, color: "darkgreen" });

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            audioPlaySound("click");
            createAnimation("transOut", "fade", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("mainmenu"); save();', 300);
        });
        createText("buttonText", 0.5, 0.95, "Back", { size: 40 });

        // Shop
        createButton("shopbutton", 0.95, 0, 0.1, 0.1, "whiteShop", () => {
            audioPlaySound("click");
            createAnimation("transOut", "fade", (t, d, a) => { t.alpha = a.dur * 3.33 }, 0.3, true);
            setTimeout('loadScene("shop")', 300);
        }, { quadratic: true });

        // Meeeeeeeee
        createSquare("meBg", 0.05, 0.16, 0.2, 0.615, "#006800");
        createText("meText", 0.15, 0.15, "Your skin", { color: "lightgray", size: 24 });

        createImage("playerskin", 0.15, 0.175, 0.4, 0.4, "skins/" + getSkin(game.skin), { quadratic: true, centered: true });
        objects["playerskin"].snip = [0, 0, 32, 32];
        createText("playerskinName", 0.15, 0.65, "", { color: "white", size: 20 });

        // Bottom
        createText("playerUpdate", 0.05, 0.95, "", { color: "white", size: 16, align: "left" });

        // Skills
        createSquare("skillsBg", 0.275, 0.16, 0.08, 0.615, "#006800");
        createText("skillsText", 0.315, 0.15, "Skills", { color: "lightgray", size: 24 });

        createImage("skillsListBg0", 0.315, 0.225, 0.1, 0.1, "invBg", { quadratic: true, centered: true });
        createImage("skillsListPic0", 0.315, 0.225, 0.1, 0.1, "", { quadratic: true, centered: true, power: false });

        // Inventory
        createSquare("invBg", 0.4, 0.16, 0.55, 0.615, "#25571a");

        for (inv = 0; inv < 35; inv++) {
            createImage("inv" + inv + "Bg", 0.45 + 0.075 * (inv % 7), 0.175 + 0.12 * Math.floor(inv / 7), 0.1, 0.1, "invBg", { quadratic: true, centered: true });
            createButton("inv" + inv + "Con", 0.45 + 0.075 * (inv % 7), 0.175 + 0.12 * Math.floor(inv / 7), 0.1, 0.1, "invBg", (me) => {
                if (inventoryMode == "skins") {
                    let ID = parseInt(me.split("inv")[1].split("Con")[0]);
                    getSkin(ID).selectSkin();

                    if (getSkin(ID).isOwned()) {
                        playerUpdate = "Skin selected!";
                    }
                    else playerUpdate = "Locked!";
                }
                if (inventoryMode == "skills") {
                    let ID = parseInt(me.split("inv")[1].split("Con")[0]) + 1;
                    if (getSkill(ID).isOwned()) {
                        playerUpdate = "Skill selected!";
                        getSkill(ID).select();
                    }
                    else playerUpdate = "Locked!";
                }
            }, { quadratic: true, centered: true, power: false, inv: inv });
            createText("inv" + inv + "Txt", 0.45 + 0.075 * (inv % 7), 0.175 + 0.12 * Math.floor(inv / 7), "", { color: "white", size: 10 });
        }

        createButton("invSel1", 0.4, 0.11, 0.15, 0.05, "#25571a", () => {
            inventoryMode = "skins";
        })
        createText("invSelText1", 0.475, 0.135, "Skins", { color: "white", size: 20 });
        
        createButton("invSel2", 0.6, 0.11, 0.15, 0.05, "#25571a", () => {
            inventoryMode = "skills";
        })
        createText("invSelText2", 0.675, 0.135, "Skills", { color: "white", size: 20 });

        // equip confirmation
        createSquare("confirmBuyBg", 0.1, 0.2, 0.8, 0.6, "brown", { power: false });
        createText("confirmBuyHeader", 0.5, 0.3, "Do you want to equip this?", { size: 32, power: false });
        createImage("confirmBuyImageBG", 0.5, 0.4, 0.15, 0.15, "fade", { centered: true, quadratic: true, power: false });
        createImage("confirmBuyImage", 0.5, 0.4, 0.15, 0.15, "skins/default", { centered: true, quadratic: true, power: false });
        objects["confirmBuyImage"].snip = [0, 0, 32, 32];
        createText("confirmBuyText", 0.5, 0.35, "", { size: 24, power: false });
        createText("confirmBuyText2", 0.5, 0.6, "", { size: 20, power: false });

        createButton("confirmBuyButton", 0.25, 0.7, 0.2, 0.1, "button", () => {
            togglePlayerConfirm(false);
            if (objects["confirmBuyButton"].config.skinID != -1) getSkin(objects["confirmBuyButton"].config.skinID).selectSkin(true);
            else if (objects["confirmBuyButton"].config.skillID != -1) getSkill(objects["confirmBuyButton"].config.skillID).select(true);
        }, { power: false });
        createText("confirmBuyButtonText", 0.35, 0.775, "YES", { size: 20, power: false });
        createButton("confirmBuyCancelButton", 0.55, 0.7, 0.2, 0.1, "button", () => {
            togglePlayerConfirm(false);
        }, { power: false });
        createText("confirmBuyCancelButtonText", 0.65, 0.775, "NO", { size: 20, power: false });

        audioPlayMusic("menu");

        // transition fade
        createImage("fade", 0, 0, 1, 1, "fade");
        createAnimation("transIn", "fade", (t, d) => { t.alpha -= d * 4 }, 0.3, true);

        if (isMobile()) {
            objects["playerskin"].w = objects["playerskin"].h = 0.1;
            objects["playerskin"].y = 0.4;

            objects["skillsListBg0"].w = objects["skillsListBg0"].h = 0.033;
            objects["skillsListPic0"].w = objects["skillsListPic0"].h = 0.033;
        }

        if (isMobile()) {
            for (let inv = 0; inv < 35; inv++) {
                objects["inv" + inv + "Bg"].w = objects["inv" + inv + "Bg"].h = 0.033;
                objects["inv" + inv + "Con"].w = objects["inv" + inv + "Con"].h = 0.033;
            }
        }
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

        // Updates
        objects["playerUpdate"].text = playerUpdate;

        objects["playerskinName"].text = getSkin(game.skin).getName();
        objects["playerskin"].image = "skins/" + getSkin(game.skin).getImage();
        objects["playerskin"].snip = [0, groundAnimation >= 0.5 ? 32 : 0, 32, 32];

        if (game.selSkills[0] != 0) objects["skillsListPic0"].image = "skills/" + getSkill(game.selSkills[0]).getImage();
        objects["skillsListPic0"].power = game.selSkills[0] != 0;

        if (inventoryMode == "skins") {
            objects["invSel1"].color = "#25571a";
            objects["invSel2"].color = "#45c129";
        }
        if (inventoryMode == "skills") {
            objects["invSel1"].color = "#45c129";
            objects["invSel2"].color = "#25571a";
        }

        for (let inv = 0; inv < 35; inv++) {
            objects["inv" + inv + "Con"].power = false;
            objects["inv" + inv + "Txt"].text = "";
            objects["inv" + inv + "Txt"].color = "white";

            if (inventoryMode == "skins") {
                if (inv < skins.length) {
                    objects["inv" + inv + "Con"].power = true;
                    objects["inv" + inv + "Con"].image = getSkin(inv).isOwned() ? "skins/" + getSkin(inv).getImage() : "unknown";
                    objects["inv" + inv + "Con"].snip = [0, groundAnimation >= 0.5 && getSkin(inv).isOwned() ? 32 : 0, 32, 32];
                    objects["inv" + inv + "Txt"].text = getSkin(inv).isOwned() ? getSkin(inv).getName() : "locked";
                }
                else {
                    objects["inv" + inv + "Con"].power = false;
                }
            }

            if (inventoryMode == "skills") {
                if (inv < skills.length) {
                    let thisSkill = skills[inv];
                    objects["inv" + inv + "Con"].power = true;
                    objects["inv" + inv + "Con"].image = game.skills.includes(thisSkill.ID) ? "skills/" + thisSkill.getImage() : "unknown";
                    objects["inv" + inv + "Con"].snip = false;
                    objects["inv" + inv + "Txt"].text = game.skills.includes(thisSkill.ID) ? thisSkill.getName() : "locked";
                    objects["inv" + inv + "Txt"].color = thisSkill.getRarityColor();
                }
                else {
                    objects["inv" + inv + "Con"].power = false;
                }
            }
        }
    }
);