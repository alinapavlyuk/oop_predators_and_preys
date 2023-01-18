import {Animal} from "./Animal.js";
import {commonConditions, predatorConditions, womanConditions} from "../constants/animalConditions.js";
import {animalSex, animalTypes, pregnancyTime} from "../constants/animalTypes.js";

export class PredatorFemale extends Animal {
    #damage;
    #pregnancyTime;
    constructor(animalConfig) {
        super(animalConfig.name, animalTypes.predator, animalSex.female, animalConfig.speed, animalConfig.vision, animalConfig.diet, animalConfig.maxHealth, animalConfig.saturation, commonConditions);
        this.#damage = animalConfig.damage;
        this.#pregnancyTime = pregnancyTime[animalConfig.name];
    }
}