import {animalTypes} from "../constants/animalTypes.js";
import {Female} from "./Female.js";

export class PredatorFemale extends Female {
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