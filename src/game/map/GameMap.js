import {mapDrawer} from './MapDrawer.js';

export class GameMap {
    #mapArr;
    #size;

    constructor(size) {
        this.#mapArr = Array.from(Array(size[0]), _ => Array(size[1]).fill({}));
        this.#size = size;
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
