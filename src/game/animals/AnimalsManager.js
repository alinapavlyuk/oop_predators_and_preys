import {animalFactory} from './animalFactory.js';
import {animalsConfigurations} from '../constants/animals.js';
import {animalNames, animalSex, animalTypes} from '../constants/animalTypes.js';
import {rand} from '../utils/index.js';
import {conditionsAll} from '../constants/animalConditions.js';
import {directions} from '../constants/moveDirections.js';
import {foodsFactory} from "./foodsFactory.js";
import {foods as foodsNames, foods, maxFoodAmountOnMap} from "../constants/foods.js";

export class AnimalsManager {
    #gameMap;
    #chart;

    #listOfAnimals;
    #listOfPredators;
    #listOfPreys;
    #listOfFoods;

    #maxAnimalAmount;
    #animalCounterGlobal;

    constructor(map, chart) {
        this.#gameMap = map;
        this.#chart = chart;

        this.#listOfAnimals = []
        this.#listOfPredators = [];
        this.#listOfPreys = [];
        this.#listOfFoods = [];

        this.#animalCounterGlobal = 0;

        this.#chart.initChart(
            this.#listOfPredators.length,
            this.#listOfPreys.length,
        );
    }

    get listOfPredatorsLength() {
        return this.#listOfPredators.length;
    }

    get listOfPreysLength() {
        return this.#listOfPreys.length;
    }

    set maxAnimalAmount(maxAnimalAmount) {
        this.#maxAnimalAmount = maxAnimalAmount;
    }

    createInitialAnimals(animals) {
        animals.forEach(animal => {
            for (let i = 0; i < animal.amount; i++) {
                this.bornNewAnimal(animal.type, animal.name, this.getRandomSex());
            }
        })
    }

    bornNewAnimal = (type, name, sex) => {
        if (this.#listOfAnimals.length < this.#maxAnimalAmount) {
            let createdAnimal = animalFactory(type, animalsConfigurations[name], sex);
            this.setPositionForObject(createdAnimal);
            this.#listOfAnimals.push(createdAnimal);
            this.#gameMap.addObject(createdAnimal.xPos, createdAnimal.yPos, createdAnimal);
            createdAnimal.live();
            this.#animalCounterGlobal++;

            if (type === animalTypes.predator) {
                this.#listOfPredators.push(createdAnimal);
            }

            if (type === animalTypes.prey) {
                this.#listOfPreys.push(createdAnimal);
            }
        }
    }

    givePreysFood() {
        if (this.#listOfFoods.length < maxFoodAmountOnMap) {
            let keys = Object.keys(foods);
            let food = foodsFactory(foods[keys[keys.length * Math.random() << 0]]);
            this.setPositionForObject(food);
            this.#listOfFoods.push(food);
            this.#gameMap.addObject(food.xPos, food.yPos, food);
        }
    }

    setPositionForObject(object) {
        let xPos, yPos;
        do {
            xPos = rand(0, this.#gameMap.size[1] - 1);
            yPos = rand(0, this.#gameMap.size[0] - 1);
        } while (!this.#gameMap.isCellValid(xPos, yPos))
        object.setPosition(xPos, yPos);
    }

    hasNoAnimals() {
        return this.#listOfAnimals.length === 0
    }

    moveAnimals() {
        this.#listOfAnimals.forEach(animal => {
            console.log(animal);
            if (animal.isCondition(conditionsAll.normal)) {
                let direction = rand(0, 7);
                this.moveAnimal(animal, direction);
            } else if (animal.isCondition(conditionsAll.haunting)) {
                this.haunt(animal);
            }
        })
    }

    haunt(animal) {
        if (animal.hauntingTarget && !animal.hauntingTarget.isDead()) {
            this.moveAnimalToHauntingTarget(animal);
        } else {
            const isHauntingTargetFound = this.searchHauntingTarget(animal);
            if (isHauntingTargetFound) {
                this.moveAnimalToHauntingTarget(animal);
            } else {
                animal.changeCondition(conditionsAll.normal);
            }
        }
    }

    doStep(animal, newPosition) {
        this.#gameMap.moveAnimal(animal, newPosition);
        animal.setPosition(newPosition.x, newPosition.y);
    }

    searchHauntingTarget(animal) {
        let isSuccess = false;
        let shortestDistancePrey = null;
        const diets = {
            rabbit: this.#listOfPreys.filter((animal) => animal.name === animalNames.rabbit),
            carrot: this.#listOfFoods.filter((food) => food.name === foodsNames.carrot),
            rat: this.#listOfPreys.filter((animal) => animal.name === animalNames.rat),
        }
        diets[animal.diet].forEach((hauntingTarget) => {
            const pX = animal.xPos - hauntingTarget.xPos;
            const pY = animal.yPos - hauntingTarget.yPos;
            const distance = Math.sqrt(pX * pX + pY * pY);
            if (!shortestDistancePrey || shortestDistancePrey.distance > distance) {
                shortestDistancePrey = {
                    distance,
                    target: hauntingTarget
                };
            }
        })

        if (shortestDistancePrey) {
            animal.hauntingTarget = shortestDistancePrey.target;
            isSuccess = true;
        }
        return isSuccess;
    }

    moveAnimalToHauntingTarget(predator) {
        const newPosition = {
            x: predator.xPos,
            y: predator.yPos
        }

        const direction = [0, 0];

        if (predator.xPos > predator.hauntingTarget.xPos) {
            newPosition.x = predator.xPos - 1;
            direction[0] = -1;
        } else if (predator.xPos < predator.hauntingTarget.xPos) {
            newPosition.x = predator.xPos + 1;
            direction[0] = 1;
        }

        if (predator.yPos > predator.hauntingTarget.yPos) {
            newPosition.y = predator.yPos - 1;
            direction[1] = -1;
        } else if (predator.yPos < predator.hauntingTarget.yPos) {
            newPosition.y = predator.xPos + 1;
            direction[1] = 1;
        }

        const isCollidedWithTarget = (this.#gameMap.mapArr[newPosition.y] !== undefined &&
            this.#gameMap.mapArr[newPosition.y][newPosition.x] !== undefined &&
            this.#gameMap.mapArr[newPosition.y][newPosition.x] === predator.hauntingTarget
        );

        if (isCollidedWithTarget) {
            predator.eat(predator.hauntingTarget);
            predator.hauntingTarget.changeCondition("dead");
            this.doStep(predator, newPosition);
            predator.hauntingTarget = null;
        } else {
            this.moveAnimal(predator, directions.findIndex(directionPreset => {
                return directionPreset[0] === direction[0] && directionPreset[1] === direction[1]
            }));
        }
    }

    moveAnimal(animal, direction) {
        let newPosition = {
            x: animal.xPos + directions[direction][0],
            y: animal.yPos + directions[direction][1]
        }
        if (this.#gameMap.isCellValid(newPosition.x, newPosition.y)) {
            this.doStep(animal, newPosition);
        } else {
            let nextDirection = direction + 1 >= directions.length ? 0 : direction + 1;
            this.moveAnimal(animal, nextDirection);
        }
    }

    filterDeadObjects = (gameObjects) => {
        if (gameObjects.isCondition(conditionsAll.dead)) {
            this.#gameMap.deleteObject(gameObjects.xPos, gameObjects.yPos);
            return false;
        }
        return true;
    }

    checkForDeadAnimals() {
        this.#listOfAnimals = this.#listOfAnimals.filter(this.filterDeadObjects);
        this.#listOfPredators = this.#listOfPredators.filter(this.filterDeadObjects);
        this.#listOfPreys = this.#listOfPreys.filter(this.filterDeadObjects);
        this.#listOfFoods = this.#listOfFoods.filter(this.filterDeadObjects);
    }

    getRandomSex() {
        if (Math.random() < 0.5) {
            return animalSex.male;
        } else {
            return animalSex.female;
        }
    }

    bornNewRandomAnimal(type, name) {
        this.bornNewAnimal(type, name, this.getRandomSex())
    }

    updateAnimals() {
        if(this.#listOfPredators.length !== 0 && this.#listOfPreys.length !== 0) {
            this.#listOfAnimals.forEach((animal) => {
                if (animal.update) {
                    animal.update();
                }
            })
        }
    }

    checkPregnancy() {
        this.#listOfAnimals.forEach((animal) => {
            if (animal.sex === animalSex.female) {
                if (animal.isReadyToBornNewAnimal) {
                    this.bornNewRandomAnimal(animal.type, animal.name);
                    animal.setPregnancy();
                }
            }
        })
    }

    update() {
        this.checkForDeadAnimals();
        this.moveAnimals();
        this.updateAnimals();
        this.checkPregnancy();
    }
}
