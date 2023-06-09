import {Carrot} from "../foods/Carrot.js";
import {foods} from "../constants/foods.js";

export const foodsFactory = (name) => {
    switch (true) {
        case name === foods.carrot : {
            return new Carrot();
        }
    }
}