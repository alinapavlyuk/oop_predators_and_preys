import {predatorFoods, preyFoods} from "./foods.js";
import {animalNames} from "./animalTypes.js";

export const animalsConfigurations = {
    [animalNames.fox]: {
        name: animalNames.fox,
        speed: 3,
        maxHealth: 100,
        vision: 6,
        damage: 10,
        diet: predatorFoods.foxFoods,
        saturation: 0,
        pregnancyTime: 7
    },

    [animalNames.rabbit]: {
        name: animalNames.rabbit,
        speed: 2,
        maxHealth: 50,
        vision: 4,
        diet: preyFoods.rabbitFoods,
        saturation: 30,
        pregnancyTime: 5
    }
}






