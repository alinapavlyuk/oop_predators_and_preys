import {animalNames, animalSex, animalTypes} from "./animalTypes.js";

export const animalsToCreate = [
    {
        name: animalNames.fox,
        type: animalTypes.predator,
        sex: animalSex.male,
        amount: 4
    },

    {
        name: animalNames.fox,
        type: animalTypes.predator,
        sex: animalSex.female,
        amount: 4
    },

    {
        name: animalNames.rabbit,
        type: animalTypes.predator,
        sex: animalSex.male,
        amount: 4
    },

    {
        name: animalNames.rabbit,
        type: animalTypes.predator,
        sex: animalSex.female,
        amount: 4
    }
]

export const gameSpeed = 1000;
export const mapSize = 10;