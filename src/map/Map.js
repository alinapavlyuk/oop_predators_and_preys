export class Map {
    #mapArr;
    #size;

    constructor(size) {
        this.#mapArr = Array.from(Array(size), _ => Array(size).fill({}));
        this.#size = size;
    }

    get mapArr() {
        return this.#mapArr;
    }
    get size() {
        return this.#size;
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
}