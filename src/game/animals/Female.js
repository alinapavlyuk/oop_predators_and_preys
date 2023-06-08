import {Animal} from "./Animal.js";
import {animalSex} from "../constants/animalTypes.js";
import {commonConditions} from "../constants/animalConditions.js";

export class Female extends Animal {
    #pregnancyPeriod;
    #pregnancyTime;
    #isReadyToBornNewAnimal;

    constructor(animalConfig, type) {
        super(animalConfig.name, type, animalSex.female, animalConfig.speed, animalConfig.vision, animalConfig.diet, animalConfig.maxHealth, animalConfig.saturation, commonConditions);
        this.#pregnancyPeriod = animalConfig.pregnancyTime;
        this.#pregnancyTime = this.#pregnancyPeriod;
        this.#isReadyToBornNewAnimal = false;
    }

    get isReadyToBornNewAnimal() {
        return this.#isReadyToBornNewAnimal;
    }

    update() {
        if (this.#pregnancyTime > 0) {
            this.#pregnancyTime -= 1;
            if (this.#pregnancyTime === 0) {
                this.#isReadyToBornNewAnimal = true;
            }
        }
    }

    setPregnancy() {
        this.#pregnancyTime = this.#pregnancyPeriod;
        this.#isReadyToBornNewAnimal = false;
    }
}