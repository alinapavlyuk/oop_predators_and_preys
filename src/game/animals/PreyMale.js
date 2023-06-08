import {animalTypes} from "../constants/animalTypes.js";
import {Male} from "./Male.js";

export class PreyMale extends Male {
    constructor(animalConfig) {
        super(animalConfig, animalTypes.prey);
    }
}