import {Animal} from "./Animal.js";
import {commonConditions, preyConditions} from "../constants/animalConditions.js";
import {animalSex, animalTypes} from "../constants/animalTypes.js";

export class PreyMale extends Animal {
    constructor(animalConfig) {
        super(animalConfig.name, animalTypes.prey, animalSex.male, animalConfig.speed, animalConfig.vision, animalConfig.diet, animalConfig.maxHealth, animalConfig.saturation, commonConditions);
    }
}