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
        pregnancyTime: 10
    },

    [animalNames.rabbit]: {
        name: animalNames.rabbit,
        speed: 2,
        maxHealth: 50,
        vision: 4,
        diet: preyFoods.rabbitFoods,
        pregnancyTime: 7
    },

    [animalNames.wolf]: {
        name: animalNames.wolf,
        speed: 2,
        maxHealth: 100,
        vision: 4,
        diet: predatorFoods.wolfFoods,
        pregnancyTime: 10
    },

    [animalNames.rat]: {
        name: animalNames.rat,
        speed: 2,
        maxHealth: 50,
        vision: 4,
        diet: preyFoods.ratFoods,
        pregnancyTime: 0
    }
}






