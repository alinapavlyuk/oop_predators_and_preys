import {GameMap} from "./map/GameMap.js"
import {foodReleaseSpeed, gameSpeed} from "./constants/gameConfiguration.js";

import {Chart} from './charts/Сhart.js';
import {AnimalsManager} from './animals/AnimalsManager.js';

export class Game {
    #gameMap;
    #chart;
    #animalManager;

    #foodInterval;
    #gameInterval;

    constructor(mapSize) {
        this.#gameMap = new GameMap(mapSize);
        this.#chart = new Chart();
        this.#animalManager = new AnimalsManager(this.#gameMap, this.#chart);
    }

    start(animals) {
        this.#animalManager.createInitialAnimals(animals);
        this.initializeGameUpdateInterval();
        this.provideRandomFood();
    }

    initializeGameUpdateInterval() {
        this.#gameInterval = setInterval(() => {
            this.update();

            if (this.#animalManager.hasNoAnimals()) {
                this.stopGame();
            }
        }, gameSpeed);
    }

    provideRandomFood() {
        this.#foodInterval = setInterval(() => {
            this.#animalManager.givePreysFood();
        }, foodReleaseSpeed)
    }

    stopGame() {
        clearInterval(this.#foodInterval);
        clearInterval(this.#gameInterval);
        console.log("The End.")
    }

    update() {
        this.#animalManager.update();
        this.#gameMap.update();

        this.#chart.update(
            this.#animalManager.listOfPredatorsLength,
            this.#animalManager.listOfPreysLength
        );
    }
}

