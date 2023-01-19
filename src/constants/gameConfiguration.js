import {animalNames, animalSex, animalTypes} from "./animalTypes.js";

export const foxPredatorMale = {
        name: animalNames.fox,
        type: animalTypes.predator,
        sex: animalSex.male,
        amount: 1
}

export const foxPredatorFemale = {
        name: animalNames.fox,
        type: animalTypes.predator,
        sex: animalSex.female,
        amount: 1
}

export const rabbitPreyMale = {
        name: animalNames.rabbit,
        type: animalTypes.prey,
        sex: animalSex.male,
        amount: 1
}

export const rabbitPreyFemale = {
        name: animalNames.rabbit,
        type: animalTypes.prey,
        sex: animalSex.female,
        amount: 1
}

export const animalsToCreate = [
    {
        ...foxPredatorMale,
        amount: 4
    },

    {
        ...foxPredatorFemale,
        amount: 0
    },

    {
        ...rabbitPreyMale,
        amount: 8
    },

    {
        ...rabbitPreyFemale,
        amount: 0
    }
]

export const gameSpeed = 1000;
export const mapSize = 10;