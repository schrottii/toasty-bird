// Game made by Schrottii - don't steal or cheat

images = {
    gameLogo: "toasty-bird-by-tpot.png",
    logo: "logo.png",
    button: "button.png",
    unknown: "unknown.png",
    invBg: "invBg.png",
    import: "import.png",
    export: "export.png",
    pause: "pause.png",

    // skins
    "skins/player": "skins/player.png",
    "skins/bald": "skins/bald.png",
    "skins/female": "skins/player-female.png",
    "skins/elmenda": "skins/elmenda.png",
    "skins/deggame": "skins/deggame.png",
    "skins/cube": "skins/cube.png",
    "skins/gangsta": "skins/gangsta.png",
    "skins/lemon": "skins/lemon.png",
    "skins/roots": "skins/roots.png",
    "skins/plane": "skins/plane.png",
    "skins/arrow": "skins/arrow.png",
    "skins/tomato": "skins/tomato.png",
    "skins/medibird": "skins/medibird.png",
    "skins/sleepy-man": "skins/sleepy-man.png",
    "skins/heart": "skins/heart.png",
    "skins/diamond": "skins/diamond.png",
    "skins/cat1": "skins/cat1.png",
    "skins/cat2": "skins/cat2.png",
    "skins/cat3": "skins/cat3.png",
    "skins/cat4": "skins/cat4.png",
    "skins/flyingmouse": "skins/flyingmouse.png",
    "skins/robotbird": "skins/robotbird.png",
    "skins/vampire": "skins/vampire.png",
    "skins/hammer": "skins/hammer.png",
    "skins/snake": "skins/snake.png",
    "skins/queenluna": "skins/queenluna.png",
    "skins/ghost": "skins/ghost.png",
    "skins/coolplanet": "skins/coolplanet.png",

    // skills
    "skills/faststart": "skills/faststart.png",
    "skills/golddigger": "skills/golddigger.png",
    "skills/youngfeathers": "skills/youngfeathers.png",
    "skills/carefuljumper": "skills/carefuljumper.png",

    menuground: "menu-ground.png",
    menuground2: "menu-ground2.png",
    clouds: "clouds.png",
    coin: "coin.png",
    boom: "boom.png",
    boom2: "boom2.png",

    pipeUp: "pipe-up.png",
    pipeDown: "pipe-down.png",

    whiteDiscord: "white-dc-logo.png",
    whiteNotes: "white-patch-notes.png",
    whiteWebsite: "white-website.png",
    whiteStats: "white-stats.png",
    whiteShop: "shop.png",
    whiteGift: "gift.png",
    claimedGift: "gift2.png",
}
GAMENAME = "Toasty Bird";
FONT = "Joystix";
wggjLoadImages();
wggjLoop();

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        jump();
    }
    if (event.code === 'KeyP') {
        pause();
    }
});

function isMobile() {
    if (game.settings.device == "pc") return false;
    if (game.settings.device == "mobile") return true;
    return /Mobi/i.test(window.navigator.userAgent) || wggjCanvasWidth <= 480;
}

function customWGGJLoop(delta) {
    // The game's main loop
    game.stats.totaltime += delta;
}

function save() {
    localStorage.setItem("TOASTYBIRD1", "toasty" + btoa(JSON.stringify(game)));
}

function exportGame() {
    let save = game;
    save = JSON.stringify(save);
    save = "toasty" + btoa(save);
    navigator.clipboard.writeText(save);
}

function importGame() {
    let save = prompt("Insert the code here...");
    try {
        save = atob(save.slice(6));
        save = JSON.parse(save);

        game = new SaveGame();
        game.loadFromSaveGame(save);
    }
    catch {
        alert("Wrong!");
    }
}

function customWGGJInit() {
    let cachedGame = localStorage.getItem("TOASTYBIRD1");
    if (cachedGame != undefined) {
        game.loadFromSaveGame(JSON.parse(atob(cachedGame.slice(6))));
    }
}