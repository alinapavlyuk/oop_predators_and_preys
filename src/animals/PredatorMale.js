import {Animal} from "./Animal.js";
import {animalConditionsAll, commonConditions, predatorConditions} from "../constants/animalConditions.js";
import {animalSex, animalTypes} from "../constants/animalTypes.js";
import {gameSpeed} from "../constants/gameConfiguration.js";

export class PredatorMale extends Animal {
    #damage;
    constructor(animalConfig) {
        super(animalConfig.name, animalTypes.predator, animalSex.male, animalConfig.speed, animalConfig.vision, animalConfig.diet, animalConfig.maxHealth, animalConfig.saturation, commonConditions);
        this.#damage = animalConfig.damage;
    }

    haunt() {
        let timer = setInterval(() => {
            if(this.isCondition(animalConditionsAll.beingHaunted)) {

            } else {
                clearInterval(timer);
            }
        }, gameSpeed)
    }

}