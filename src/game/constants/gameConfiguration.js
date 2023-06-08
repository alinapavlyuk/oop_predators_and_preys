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
        amount: 2
    },

    {
        ...foxPredatorFemale,
        amount: 2
    },

    {
        ...rabbitPreyMale,
        amount: 3
    },

    {
        ...rabbitPreyFemale,
        amount: 3
    }
]

export const gameSpeed = 1000;
export const mapSize = [15, 15];
