import {animalSex, animalTypes} from "../constants/animalTypes.js";
import {PredatorMale} from "./PredatorMale.js";
import {PredatorFemale} from "./PredatorFemale.js";
import {PreyMale} from "./PreyMale.js";
import {PreyFemale} from "./PreyFemale.js";

export const animalFactory = (type, animalConfiguration, sex) => {
    switch (true) {
        case type === animalTypes.predator && sex === animalSex.male : {
            return new PredatorMale(animalConfiguration);
        }

        case type === animalTypes.predator && sex === animalSex.female : {
            return new PredatorFemale(animalConfiguration);
        }

        case type === animalTypes.prey && sex === animalSex.male : {
            return new PreyMale(animalConfiguration);
        }

        case type === animalTypes.prey && sex === animalSex.female : {
            return new PreyFemale(animalConfiguration);
        }
    }
}