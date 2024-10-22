// Game made by Schrottii - don't steal or cheat

images = {
    placeholder: "sosnog.png",
    gameLogo: "toasty-bird-by-tpot.png",
    logo: "logo.png",
    button: "button.png",
    unknown: "unknown.png",
    invBg: "invBg.png",
    import: "import.png",
    export: "export.png",

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

    // skills
    "skills/faststart": "skills/faststart.png",
    "skills/golddigger": "skills/golddigger.png",
    "skills/youngfeathers": "skills/youngfeathers.png",
    "skills/carefuljumper": "skills/carefuljumper.png",

    menuground: "menu-ground.png",
    menuground2: "menu-ground2.png",
    clouds: "clouds.png",
    coin: "coin.png",

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

function isMobile() {
    if (game.settings.device == "pc") return false;
    if (game.settings.device == "mobile") return true;
    return /Mobi/i.test(window.navigator.userAgent) || wggjCanvasWidth <= 480;
}

function loop(delta) {
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

function init() {
    let cachedGame = localStorage.getItem("TOASTYBIRD1");
    if (cachedGame != undefined) {
        game.loadFromSaveGame(JSON.parse(atob(cachedGame.slice(6))));
    }
}