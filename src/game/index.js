import {Game} from "./Game.js"

document.addEventListener("gameStart", (event) => {
    const configurations = event.detail;
    const game = new Game(configurations.mapSize);
    game.start(configurations.animals);
})
