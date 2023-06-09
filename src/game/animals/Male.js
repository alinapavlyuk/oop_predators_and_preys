import {Animal} from "./Animal.js";
import {commonConditions} from "../constants/animalConditions.js";
import {animalSex} from "../constants/animalTypes.js";
import {saturations} from "../constants/foods.js";

export class Male extends Animal {
    constructor(animalConfig, type) {
        super(animalConfig.name, type, animalSex.male, animalConfig.speed, animalConfig.vision, animalConfig.diet, animalConfig.maxHealth, saturations[animalConfig.name], commonConditions);
    }
}