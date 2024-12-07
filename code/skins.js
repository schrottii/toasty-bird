var skins = [
    ["player", "Default", 0, 1.0],
    ["bald", "Bald", 20, 1.2],
    ["female", "Female", 20, 1.2],
    ["elmenda", "Menda", 45, 1.2],
    ["deggame", "Deggame", 69, 1.21],
    ["cube", "Cube", 20, 1.21],
    ["gangsta", "Gangsta", 50, 1.21],
    ["lemon", "Lemonbird", 30, 1.21],
    ["roots", "Rooty Bird", 45, 1.3],
    ["plane", "Plane", 91, 1.3],
    ["arrow", "Arrow", 40, 1.3],
    ["tomato", "Tomatobird", 30, 1.3],
    ["medibird", "Medibird", 24, 1.32],
    ["sleepy-man", "Sleepy Man", 30, 1.32],
    ["heart", "Heart", 20, 1.32],
    ["diamond", "Diamond", 100, 1.32],
    ["cat1", "Cat 1", 20, 1.4],
    ["cat2", "Cat 2", 20, 1.4],
    ["cat3", "Cat 3", 20, 1.4],
    ["cat4", "Cat 4", 20, 1.4],
]

function getSkin(skinID) {
    // 0 is default
    return skins[skinID][0];
}

function getSkinName(skinID) {
    // 0 is default
    return skins[skinID][1];
}

function getSkinPrice(skinID) {
    // 0 is default
    return skins[skinID][2];
}

function hasSkin(skinID) {
    // return true;
    return game.skins.includes(parseInt(skinID));
}

function clickSkin(skinID) {
    if (hasSkin(parseInt(skinID))) {
        game.skin = skinID;
    }
}