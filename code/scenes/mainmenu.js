scenes["mainmenu"] = new Scene(
    () => {
        // Init
        createSquare("middle", 0.4, 0.0, 0.2, 1, "white");
        createClickable("click1", 0.4, 0.4, 0.2, 0.2, () => {
            objects["middle"].x = Math.random();
            objects["middle"].w = Math.random();
        })
    },
    () => {
        // Loop

    }
);