import {Animal} from "./Animal.js";
import {commonConditions} from "../constants/animalConditions.js";
import {animalSex} from "../constants/animalTypes.js";

export class Male extends Animal {
    constructor(animalConfig, type) {
        super(animalConfig.name, type, animalSex.male, animalConfig.speed, animalConfig.vision, animalConfig.diet, animalConfig.maxHealth, animalConfig.saturation, commonConditions);
    }
}