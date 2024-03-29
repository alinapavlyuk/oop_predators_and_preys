import {animalNames, animalTypes} from "../game/constants/animalTypes.js";
import {animalsToCreate, mapSize} from "../game/constants/gameConfiguration.js";

function startGame(configurations) {
    const event = new CustomEvent("gameStart", {detail: configurations});
    document.dispatchEvent(event);
}

function getAnimalAmountFromDefaultConfig(name) {
    let amount = 0;
    let animals = animalsToCreate.filter(obj => obj.name === name);
    animals.forEach((type) => {
        amount += type.amount;
    })
    return amount;
}

function getConfigurations(flag) {
    let mapX = -1, mapY = -1, foxAmount = -1, rabbitAmount = -1, wolfAmount = -1, ratAmount = -1;
    if(!flag) {
        mapX = parseInt(document.querySelector("#map_x").value);
        mapY = parseInt(document.querySelector("#map_y").value);
        foxAmount = parseInt(document.querySelector("#fox_amount").value);
        rabbitAmount = parseInt(document.querySelector("#rabbit_amount").value);
        wolfAmount = parseInt(document.querySelector("#wolf_amount").value);
        ratAmount = parseInt(document.querySelector("#rat_amount").value);
    }

    return {
        mapSize: mapX > -1 && mapY > -1 ? [mapX, mapY] : mapSize,
        animals: [
            {
                name: animalNames.fox,
                type: animalTypes.predator,
                amount: foxAmount > -1 ? foxAmount : getAnimalAmountFromDefaultConfig(animalNames.fox)
            },
            {
                name: animalNames.rabbit,
                type: animalTypes.prey,
                amount: rabbitAmount > -1 ? rabbitAmount : getAnimalAmountFromDefaultConfig(animalNames.rabbit)
            },

            {
                name: animalNames.wolf,
                type: animalTypes.predator,
                amount: wolfAmount > -1 ? wolfAmount : getAnimalAmountFromDefaultConfig(animalNames.wolf)
            },
            {
                name: animalNames.rat,
                type: animalTypes.prey,
                amount: ratAmount > -1 ? ratAmount : getAnimalAmountFromDefaultConfig(animalNames.rat)
            }
        ]
    };
}

const startButton = document.querySelector("#start-button");
const defaultButton = document.querySelector("#default-button");
startButton.addEventListener('click', function() {
    document.querySelector(".game-container").classList.remove("hidden");
    document.querySelector(".menu-container").classList.add("hidden");
    let configurations = getConfigurations(false);
    startGame(configurations);
});
defaultButton.addEventListener('click', function () {
    document.querySelector(".game-container").classList.remove("hidden");
    document.querySelector(".menu-container").classList.add("hidden");
    let configurations = getConfigurations(true);
    startGame(configurations);
})