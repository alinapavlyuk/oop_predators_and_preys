import {mapDrawer} from './MapDrawer.js';
import {mapSize} from '../constants/gameConfiguration.js';

export class GameMap {
    #mapArr;
    #size;

    constructor() {
        this.#mapArr = Array.from(Array(mapSize), _ => Array(mapSize).fill({}));
        this.#size = mapSize;
        this.mapDrawer = mapDrawer;

        this.initialiseMapView();
    }

    get mapArr() {
        return this.#mapArr;
    }

    get size() {
        return this.#size;
    }

    initialiseMapView() {
        this.mapDrawer.drawMapFromArray(this.mapArr)
    }

    drawMap() {
        this.mapDrawer.redrawMapFromNewArray(this.mapArr)
    }

    isCellValid(xPos, yPos) {
        return this.#mapArr[yPos] !== undefined && this.#mapArr[yPos][xPos] !== undefined && this.#mapArr[yPos][xPos].name === undefined;
    }

    addAnimal(xPos, yPos, animal) {
        this.#mapArr[yPos][xPos] = animal;
    }

    deleteAnimal(xPos, yPos) {
        this.#mapArr[yPos][xPos] = {};
    }

    moveAnimal(animal, newPosition) {
        this.deleteAnimal(animal.xPos, animal.yPos);
        this.addAnimal(newPosition.x, newPosition.y, animal);
    }

    update() {
        this.drawMap();
    }
}
