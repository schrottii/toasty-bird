var idleModeHowToPlay = `
Press play to start a run like normal.
You get one feather for every pipe passed.
Based on your attempt that got furthest,
points are generated every second.
Both can be spent on upgrades.
Prestige to get real coins and
golden feathers.`;

var idleModeProdTime = 1;

class Upgrade {
    constructor(id, name, img, description, price, effect, config) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.description = description;
        this.price = price;
        this.effect = effect;

        this.currency = "";

        this.config = config;
        this.maxLevel = config.maxLevel;
    }

    getLevel() {
        return game.idlemode.upgrades[this.id] != undefined ? Math.min(this.maxLevel == 0 ? 1e9 : this.maxLevel, game.idlemode.upgrades[this.id]) : 0;
    }

    setLevel() {

    }

    getMaxLevel() {
        if (this.maxLevel == undefined) return 1e9;
        return this.maxLevel;
    }

    getEffect() {
        return this.effect(this.getLevel());
    }

    getCurrentPrice() {
        return Math.ceil(this.price(this.getLevel()));
    }

    buy() {
        let cost = this.getCurrentPrice();
        if (game.idlemode[this.currency] >= cost) {
            game.idlemode[this.currency] -= cost;
            this.setLevel(this.getLevel() + 1);
        }
    }

    createObjects(u, x) {
        let n = "upg" + this.id;
        let imgsiz = isMobile() ? 0.05 : 0.1;

        createSquare(n + "bg3", 0.02 + x, 0.45 + u * 0.15, 0.3 + 0.005, 0.125 + 0.01, "black");
        createSquare(n + "bg", 0.02 + x, 0.45 + u * 0.15, 0.3, 0.125, "#007F0E");
        createSquare(n + "bg2", 0.02 + x, 0.45 + (0.125 / 2) + u * 0.15, 0.3, 0.125 / 2, "#006B00");

        createText(n + "name", 0.025 + x, 0.475 + u * 0.15, "upgrade name", { align: "left", size: 24, color: "white" });
        createText(n + "description", 0.025 + x, 0.5 + u * 0.15, "", { align: "left", size: 18, color: "white", maxW: 0.2 });
        createText(n + "lvl", 0.025 + x, 0.575 + u * 0.15, "lvl 0/50", { align: "left", size: 20, color: "white" });
        createSmartText(n + "price", 0.275 + x, 0.575 + u * 0.15, "10i{coin}", { align: "right", size: 20, color: "white", images: { feather: "featherImage", points: "pointsImage" } });

        createButton(n + "buybtn",
            isMobile() ? 0.02 + x : 0.13 + x,
            0.525 + u * 0.15,
            isMobile() ? 0.1 : 0.07, isMobile() ? 0.03 : 0.05,
            "button", () => { this.buy(); }, { aText: { text: "Buy", size: 20 } });

        if (this.img != "" && this.img != undefined) createImage(n + "img", 0.27 + x, 0.45 + u * 0.15, imgsiz, imgsiz, this.img, { centered: true, quadratic: true });
    }

    renderObjects() {
        let n = "upg" + this.id;

        objects[n + "name"].text = this.name;
        objects[n + "description"].text = this.description;
        objects[n + "lvl"].text = this.getLevel() + (this.getMaxLevel() != 1e9 ? "/" + this.getMaxLevel() : "");
        objects[n + "price"].text = this.getCurrentPrice() + "i{" + this.currency + "}";

        objects[n + "buybtn"].power = this.getLevel() < this.getMaxLevel();
    }
}

class FeatherUpgrade extends Upgrade {
    constructor(id, name, img, description, price, effect, config) {
        super(id, name, img, description, price, effect, config);

        // upgrade type specifics
        this.currency = "feather";
    }

    getLevel() {
        if (game.idlemode.featherupgrades[this.id] != undefined) {
            return Math.min(game.idlemode.featherupgrades[this.id], this.getMaxLevel());
        }
        return 0;
    }

    setLevel(x) {
        if (game.idlemode.featherupgrades[this.id] == undefined) {
            game.idlemode.featherupgrades[this.id] = x;
        }
        game.idlemode.featherupgrades[this.id] = x;
    }
}

class PointUpgrade extends Upgrade {
    constructor(id, name, img, description, price, effect, config) {
        super(id, name, img, description, price, effect, config);

        // upgrade type specifics
        this.currency = "points";
    }

    getLevel() {
        if (game.idlemode.pointupgrades[this.id] != undefined) {
            return Math.min(game.idlemode.pointupgrades[this.id], this.getMaxLevel());
        }
        return 0;
    }

    setLevel(x) {
        if (game.idlemode.pointupgrades[this.id] == undefined) {
            game.idlemode.pointupgrades[this.id] = x;
        }
        game.idlemode.pointupgrades[this.id] = x;
    }
}

const upgrades = {
    pointupgrades: {
        morePoints: new PointUpgrade("morePoints", "More Points", "upgrades/morePoints", "Get more points",
            (l) => 100 + 100 * l * Math.pow(1.05, l), (l) => 1 + 0.01 * l,
            { maxLevel: 100 }),
        springs: new PointUpgrade("springs", "Springs", "upgrades/springs", "Bird can auto jump more often",
            (l) => 250 + 50 * l * Math.pow(1.1, l), (l) => 0,
            { maxLevel: 100 }),
        pipeResearch: new PointUpgrade("pipeResearch", "Pipe Research", "upgrades/pipeResearch", "Bird tries to be on the correct height",
            (l) => Math.pow(10, l + 1), (l) => 0,
            { maxLevel: 10 }),
    },
    featherupgrades: {
        fastStart: new FeatherUpgrade("fastStart", "Fast Start", "upgrades/fastStart", "Begin with +1 point",
            (l) => 1 + l, (l) => l,
            { maxLevel: 10 }),
        /*
        aa: new FeatherUpgrade("4", "More Points", "", "Get more points",
            (l) => 10 + 5 * l * Math.pow(1.01, l), (l) => 0,
            { maxLevel: 100 }),
        aa: new FeatherUpgrade("5", "More Points", "", "Get more points",
            (l) => 10 + 5 * l * Math.pow(1.01, l), (l) => 0,
            { maxLevel: 100 })
            */
    }
};

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
        createSmartText("runInfo2", 0.3, 0.15, "Points: 15548 i{points}", { align: "left", size: siz, images: { points: createImage("pointsImage", 0.925, 0.05, 0.05, 0.05, "points") } });
        createText("runInfo3", 0.5, 0.15, "155/s", { align: "left", size: siz });
        createSmartText("runInfo4", 0.7, 0.15, "??", { align: "left", size: siz, images: { goldenfeather: createImage("goldenfeather", 0.925, 0.05, 0.05, 0.05, "goldenfeather") } });
        createSquare("runInfoEpicRect", 0.09, 0.16, 0.82, 0.005, "red");
        createSquare("runInfoEpicRect2", 0.89, 0.16, 0.02, 0.01, "red");

        // upgrades
        createText("upgradesHeader", 0.1, 0.4, "Upgrades", { size: isMobile() ? 24 : 40 });
        createSmartText("pointDisplay", 0.3, 0.4, "1 i{coin}", { size: 32, images: { feather: createImage("featherImage", 0.925, 0.05, 0.05, 0.05, "feather") }});
        createSquare("upgradesUnderLine", 0.025, 0.4, 0.3, 0.005, "red");

        let i = 0;
        for (let u in upgrades.featherupgrades) {
            upgrades.featherupgrades[u].createObjects(i, 0);
            i++;
        }

        // point upgrades
        createText("pupgradesHeader", 0.525, 0.4, "Point Upgrades", { size: isMobile() ? 24 : 40 });
        createSquare("pupgradesUnderLine", 0.375, 0.4, 0.3, 0.005, "red");

        i = 0;
        for (let u in upgrades.pointupgrades) {
            upgrades.pointupgrades[u].createObjects(i, 0.35);
            i++;
        }

        // buttons
        createButton("button1", 0.1, 0.2, 0.2, 0.1, "button", () => {
            currentRun = new GameRun();
            currentRun.startRun("idlemode");
        }, { aText: { text: "Play", size: 40 } });
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

        // update info texts
        objects["runInfo1"].text = "Run #" + game.stats.totalimruns;
        objects["runInfo2"].text = "Points: " + game.idlemode.points + " i{points}";
        objects["runInfo4"].text = game.idlemode.goldenfeathers + "   i{goldenfeather}";

        objects["pointDisplay"].text = game.idlemode.feathers + "i{feather}";

        // update upgrades
        for (let u in upgrades.featherupgrades) {
            upgrades.featherupgrades[u].renderObjects();
        }
        for (let u in upgrades.pointupgrades) {
            upgrades.pointupgrades[u].renderObjects();
        }

        // give points
        idleModeProdTime -= tick;
        if (idleModeProdTime < 0) {
            idleModeProdTime += 1;

            let prod = Math.ceil(game.idlemode.pointprod * upgrades.pointupgrades.morePoints.getEffect());
            objects["runInfo3"].text = prod + "/s";

            game.idlemode.points += prod;
            game.idlemode.totalpoints += prod;
            game.stats.totalimpoints += prod;
        }
    }
);