import {animalTypes} from "../constants/animalTypes.js";
import {Female} from "./Female.js";

export class PreyFemale extends Female {
    constructor(animalConfig) {
        super(animalConfig, animalTypes.prey);
    }
}