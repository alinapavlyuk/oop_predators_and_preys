import {Animal} from "./Animal.js";
import {commonConditions, preyConditions, womanConditions} from "../constants/animalConditions.js";
import {animalSex, animalTypes, pregnancyTime} from "../constants/animalTypes.js";

export class PreyFemale extends Animal{
    #pregnancyTime;
    constructor(animalConfig) {
        super(animalConfig.name, animalTypes.prey, animalSex.female, animalConfig.speed, animalConfig.vision, animalConfig.diet, animalConfig.maxHealth, animalConfig.saturation, commonConditions);
        this.#pregnancyTime = pregnancyTime[animalConfig.name];
    }
}