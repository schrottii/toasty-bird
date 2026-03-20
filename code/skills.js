class Skill {
    constructor(ID, rarity, type, name, img, desc) {
        // type: 0 infinite 1 finite
        this.ID = ID;
        this.rarity = rarity;
        this.type = type;
        this.name = name;
        this.img = img;
        this.desc = desc;
    }

    getRarityName() {
        switch (this.rarity) {
            case 0:
                return "undefined";
            case 1:
                return "common";
            case 2:
                return "uncommon";
            case 3:
                return "rare";
            case 4:
                return "epic";
        }
    }

    getRarityColor() {
        switch (this.rarity) {
            case 0:
                return "#FFFFFF";
            case 1:
                return "#008904";
            case 2:
                return "#6fff3a";
            case 3:
                return "#afd7ff";
            case 4:
                return "#001100";
        }
    }

    getPrice() {
        switch (this.rarity) {
            case 0:
                return 999999;
            case 1:
                return 25;
            case 2:
                return 50;
            case 3:
                return 100;
            case 4:
                return 200;
            // legendary 500?
        }
    }

    getName() {
        return this.name;
    }

    getDesc() {
        return this.desc;
    }

    getImage() {
        return this.img;
    }

    isOwned() {
        return game.skills.includes(this.ID);
    }

    isEquipped() {
        // this one is only for permanent (0 1)
        return game.selSkills[0] == this.ID || game.selSkills[1] == this.ID;
    }

    select(confirm = false) {
        if (this.isOwned()) {
            if (confirm) {
                if (this.type == 0) {
                    // infinite skill 0 1
                    game.selSkills[0] = this.ID;
                }
                if (this.type == 1) {
                    // finite skill 2 3 4 5
                    game.selSkills[2] = this.ID;
                }
            }
            else {
                objects["confirmBuyButton"].config.skinID = -1;
                objects["confirmBuyButton"].config.skillID = this.ID;
                objects["confirmBuyImage"].image = "skills/" + this.getImage();
                objects["confirmBuyText"].text = this.getName();
                objects["confirmBuyText2"].text = this.getDesc();
                togglePlayerConfirm(true);
            }
        }
    }

    buy(confirmBuying = false) {
        if (game.coins >= this.getPrice() && !this.isOwned()) {
            console.log(this.ID)
            if (confirmBuying) {
                game.coins -= this.getPrice();
                game.skills.push(this.ID);
                save();
            }
            else if (objects["confirmBuyButton"] != undefined) {
                objects["confirmBuyButton"].config.skinID = -1;
                objects["confirmBuyButton"].config.skillID = this.ID;
                objects["confirmBuyImage"].image = "skills/" + this.getImage();
                toggleShopConfirm(true);
            }
        }
    }
}

function getSkill(ID) {
    // get skill by ID
    for (let s in skills) {
        if (skills[s].ID == ID) return skills[s];
    }
}

var skills = [
    new Skill(1, 1, 0, "Fast Start", "faststart", "Skip the first 10 points"),
    new Skill(2, 2, 0, "Gold Digger", "golddigger", "Coins have a 20% chance of being worth 2x"),
    new Skill(3, 3, 0, "Young Feathers", "youngfeathers", "Jumps are smaller"),
    new Skill(4, 4, 0, "Careful Jumper", "carefuljumper", "Jumping causes a temporary slowdown"),
    new Skill(5, 4, 0, "Ball Bird", "ballbird", "Change gravity instead of jumping"),
];