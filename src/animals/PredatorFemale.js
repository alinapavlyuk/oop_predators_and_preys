import {Animal} from "./Animal.js";
import {
    animalConditionsAll,
    commonConditions,
    predatorConditions,
    womanConditions
} from "../constants/animalConditions.js";
import {animalSex, animalTypes, pregnancyTime} from "../constants/animalTypes.js";
import {gameSpeed} from "../constants/gameConfiguration.js";

export class PredatorFemale extends Animal {
    #damage;
    #pregnancyTime;
    #hauntingTarget;
    constructor(animalConfig) {
        super(animalConfig.name, animalTypes.predator, animalSex.female, animalConfig.speed, animalConfig.vision, animalConfig.diet, animalConfig.maxHealth, animalConfig.saturation, commonConditions);
        this.#damage = animalConfig.damage;
        this.#hauntingTarget = null;
        this.#pregnancyTime = pregnancyTime[animalConfig.name];
    }

    get hauntingTarget() {
        return this.#hauntingTarget;
    }

    set hauntingTarget(hauntingTarget) {
        this.#hauntingTarget = hauntingTarget;
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