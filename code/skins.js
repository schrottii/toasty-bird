// SKINS CLASS

class Skin {
    constructor(ID, src, displayName, basePrice, update, config) {
        this.ID = ID;
        this.src = src;
        this.displayName = displayName;
        this.basePrice = basePrice;
        this.update = update;
        this.config = config;

        if (config != undefined) {
            this.tags = config.tags;
        }
    }

    isOwned() {
        return game.skins.includes(this.ID);
    }

    hasTag(tagName) {
        if (this.tags == undefined) return false;
        if (this.tags.includes(tagName)) return true;
    }

    getImage() {
        return this.src;
    }

    getName() {
        return this.displayName;
    }

    getPrice() {
        return this.basePrice;
    }

    buySkin(confirmBuying = false) {
        if (!this.isOwned() & game.coins >= this.getPrice()) {
            if (confirmBuying) {
                game.coins -= this.getPrice();
                game.skins.push(this.ID);
                save();
            }
            else if (objects["confirmBuyButton"] != undefined) {
                objects["confirmBuyButton"].config.skinID = this.ID;
                objects["confirmBuyImage"].image = "skins/" + this.getImage();
                objects["confirmBuyBg"].power = objects["confirmBuyHeader"].power = objects["confirmBuyButton"].power = objects["confirmBuyButtonText"].power = objects["confirmBuyCancelButton"].power = objects["confirmBuyCancelButtonText"].power = objects["confirmBuyImage"].power = true;
            }
        }
    }

    selectSkin() {
        if (this.isOwned()) {
            game.skin = this.ID;
        }
    }
}

// ALL THE SKINS
//, { tags: [] }
var skins = [
    new Skin(0, "player", "Default", 0, 1.0),
    new Skin(1, "bald", "Bald", 20, 1.2, { tags: ["bird", "male"] }),
    new Skin(2, "female", "Female", 20, 1.2, { tags: ["bird", "female"] }),
    new Skin(3, "elmenda", "Menda", 45, 1.2, { tags: ["friend", "robot"] }),
    new Skin(4, "deggame", "Deggame", 69, 1.21, { tags: ["friend", "male"] }),
    new Skin(5, "cube", "Cube", 20, 1.21, { tags: ["bird"] }),
    new Skin(6, "gangsta", "Gangsta", 50, 1.21, { tags: ["bird", "criminal", "male"] }),
    new Skin(7, "lemon", "Lemonbird", 30, 1.21, { tags: ["food"] }),
    new Skin(8, "roots", "Rooty Bird", 45, 1.3, { tags: ["food"] }),
    new Skin(9, "plane", "Plane", 91, 1.3, { tags: ["criminal"] }),
    new Skin(10, "arrow", "Arrow", 40, 1.3),
    new Skin(11, "tomato", "Tomatobird", 30, 1.3, { tags: ["food"] }),
    new Skin(12, "medibird", "Medibird", 24, 1.32, { tags: ["food"] }),
    new Skin(13, "sleepy-man", "Sleepy Man", 30, 1.32, { tags: ["bird", "male"] }),
    new Skin(14, "heart", "Heart", 20, 1.32, { tags: ["female"] }),
    new Skin(15, "diamond", "Diamond", 100, 1.32, { tags: ["bird"] }),
    new Skin(16, "cat1", "Cat 1", 20, 1.4, { tags: ["cat"] }),
    new Skin(17, "cat2", "Cat 2", 20, 1.4, { tags: ["cat"] }),
    new Skin(18, "cat3", "Cat 3", 20, 1.4, { tags: ["cat"] }),
    new Skin(19, "cat4", "Cat 4", 20, 1.4, { tags: ["cat"] }),
    new Skin(20, "flyingmouse", "Flying Mouse", 20, 1.5),
    new Skin(21, "robotbird", "Robot Bird", 30, 1.5, { tags: ["bird", "robot"] }),
    new Skin(22, "vampire", "Vampire", 30, 1.5, { tags: ["male", "bird"] }),
    new Skin(23, "hammer", "Hammer Time", 50, 1.5, { tags: ["criminal"]}),
    new Skin(24, "snake", "Snake", 29, 1.51, { tags: ["friend", "female"] }),
    new Skin(25, "queenluna", "Queen Luna", 29, 1.51, { tags: ["cat", "female"] }),
    new Skin(26, "ghost", "Ghost", 40, 1.51, { tags: ["criminal"] }),
    new Skin(27, "coolplanet", "Cool Planet", 40, 1.51),
];

var tags = {
    "bird": "Real Birds",
    "friend": "Friends",
    "male": "Manly Men",
    "female": "Females",
    "criminal": "Criminal$",
    "food": "Edible Food",
    "cat": "Kitty Cats",
    "robot": "Metal Robots"
}

function getAllSkinsOfTag(tagName) {
    let birds = [];

    for (let b in skins) {
        if (skins[b].hasTag(tagName)) birds.push(parseInt(b));
    }

    return birds;
}

function getSkin(skinID) {
    // 0 is default
    return skins[skinID];
}