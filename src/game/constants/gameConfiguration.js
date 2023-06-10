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

export const wolfPredatorMale = {
    name: animalNames.wolf,
    type: animalTypes.predator,
    sex: animalSex.male,
    amount: 1
}

export const wolfPredatorFemale = {
    name: animalNames.wolf,
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

export const ratPreyMale = {
    name: animalNames.rat,
    type: animalTypes.prey,
    sex: animalSex.male,
    amount: 1
}

export const ratPreyFemale = {
    name: animalNames.rat,
    type: animalTypes.prey,
    sex: animalSex.female,
    amount: 1
}

export const animalsToCreate = [
    {
        ...foxPredatorMale,
        amount: 1
    },

    {
        ...foxPredatorFemale,
        amount: 1
    },

    {
        ...wolfPredatorMale,
        amount: 1
    },

    {
        ...wolfPredatorFemale,
        amount: 1
    },

    {
        ...rabbitPreyMale,
        amount: 3
    },

    {
        ...rabbitPreyFemale,
        amount: 1
    },

    {
        ...ratPreyMale,
        amount: 3
    },

    {
        ...ratPreyFemale,
        amount: 1
    }
]

export const gameSpeed = 1000;
export const foodReleaseSpeed = 3000;
export const mapSize = [20, 20];
