class SaveGame {
    new() {
        this.id = Math.random().toString(16).slice(2);
        this.name = "Player";

        this.stats = {
            highscore: 0,
            normalplays: 0,
            normaljumps: 0,

            totalplays: 0,
            totaljumps: 0,
            totaltime: 0,
        }
    }
    loadFromSaveGame(sg) {
        this.id = sg.id;
        this.name = sg.name;

        this.stats = sg.stats;
    }
}