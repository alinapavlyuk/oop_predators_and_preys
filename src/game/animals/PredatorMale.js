import {animalTypes} from "../constants/animalTypes.js";
import {Male} from "./Male.js";

export class PredatorMale extends Male {
    #damage;
    #hauntingTarget;

    constructor(animalConfig) {
        super(animalConfig, animalTypes.predator);
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

