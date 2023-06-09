import {Food} from "../animals/Food.js";
import {foods, saturations} from "../constants/foods.js";
import {commonConditions} from "../constants/animalConditions.js";

export class Carrot extends Food {
    constructor() {
        super(saturations.carrot, foods.carrot, -1, -1, commonConditions, 1);
    }
}