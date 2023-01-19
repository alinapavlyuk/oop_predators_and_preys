import {Animal} from "./Animal.js";
import {animalConditionsAll, commonConditions, predatorConditions} from "../constants/animalConditions.js";
import {animalSex, animalTypes} from "../constants/animalTypes.js";
import {gameSpeed} from "../constants/gameConfiguration.js";

export class PredatorMale extends Animal {
    #damage;
    #hauntingTarget;
    constructor(animalConfig) {
        super(animalConfig.name, animalTypes.predator, animalSex.male, animalConfig.speed, animalConfig.vision, animalConfig.diet, animalConfig.maxHealth, animalConfig.saturation, commonConditions);
        this.#damage = animalConfig.damage;
        this.#hauntingTarget = null;
    }

    get hauntingTarget() {
        return this.#hauntingTarget;
    }

    set hauntingTarget(hauntingTarget) {
        this.#hauntingTarget = hauntingTarget;
    }
}

