import {Map} from "./map/Map.js"
import {animalFactory} from "./animals/animalFactory.js";
import {animalsConfigurations} from "./constants/animals.js";
import {animalsToCreate, gameSpeed, mapSize, rabbitPreyFemale, rabbitPreyMale} from "./constants/gameConfiguration.js";
import {directions} from "./constants/moveDirections.js";
import {animalConditionsAll, predatorConditions} from "./constants/animalConditions.js";
import {mapDrawer} from "./map/MapDrawer.js";
import {animalTypes} from "./constants/animalTypes.js";
import { chart } from './charts/chart.js';

class Manager {
    #map = new Map(mapSize);
    #listOfAnimals = [];
    #listOfPredators = [];
    #listOfPreys = [];
    #animalCounterGlobal = 0;
    #bornInterval;

    start() {
        this.createInitialAnimals();
        mapDrawer.drawMapFromArray(this.mapArr);
        let timer = setInterval(() => {
            this.checkForDeadAnimals();
            this.moveAnimals();
            mapDrawer.redrawMapFromNewArray(this.mapArr);
            chart.updateChart(
              this.#listOfPredators.length,
              this.#listOfPreys.length,
            );
            if(this.currentAnimalAmount === 0) {
                clearInterval(this.#bornInterval);
                clearInterval(timer);
                console.log(this.#animalCounterGlobal);
                console.log("The End.")
            }
        }, gameSpeed);
        this.initializeBornInterval();
        console.log('this.#listOfPredators', this.#listOfPredators);
        console.log('this.#listOfPreys', this.#listOfPreys);
        chart.initChart(
          this.#listOfPredators.length,
          this.#listOfPreys.length,
        );
/*
        setInterval(() => {

        }, 2000)*/
    }

    rand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    get currentAnimalAmount() {
        return this.#listOfAnimals.length;
    }

    get map() {
        return this.#map;
    }

    get mapArr() {
        return this.#map.mapArr;
    }

    isMapCellValid(xPos, yPos) {
        return this.#map.isCellValid(xPos, yPos);
    }

    addAnimalToMap(xPos, yPos, animal) {
        this.#map.addAnimal(xPos, yPos, animal);
    }

    deleteAnimalFromMap(xPos, yPos) {
        this.#map.deleteAnimal(xPos, yPos);
    }

    doStep(animal, newPosition) {
        this.deleteAnimalFromMap(animal.xPos, animal.yPos);
        this.addAnimalToMap(newPosition.x, newPosition.y, animal);
        animal.setPosition(newPosition.x, newPosition.y);
    }

    searchPrey(predator) {
        let isSuccess = false;
        let shortestDistancePrey = null;
        this.#listOfPreys.forEach((prey) => {
            const pX = predator.xPos - prey.xPos;
            const pY = predator.yPos - prey.yPos;
            const distance = Math.sqrt(pX*pX+pY*pY);
            if(!shortestDistancePrey || shortestDistancePrey.distance > distance) {
                shortestDistancePrey = {
                    distance,
                    prey
                };
            }
        })

        if(shortestDistancePrey) {
            predator.hauntingTarget = shortestDistancePrey.prey;
            isSuccess = true;
        }
        return isSuccess;
    }

    movePredator(predator) {
        if(predator.hauntingTarget && !predator.hauntingTarget.isCondition(animalConditionsAll.dead)) {
            this.movePredatorToPrey(predator);
        } else {
            const isPreyFound = this.searchPrey(predator);
            if(isPreyFound) {
                this.movePredatorToPrey(predator);
            } else {
                let direction = this.rand(0, 7);
                this.moveAnimal(predator, direction);
            }
        }
    }

    movePredatorToPrey(predator) {
        const newPosition = {
            x: predator.xPos,
            y: predator.yPos
        }

        const direction = [0, 0];

        if(predator.xPos > predator.hauntingTarget.xPos) {
            newPosition.x = predator.xPos - 1;
            direction[0] = -1;
        } else if (predator.xPos < predator.hauntingTarget.xPos){
            newPosition.x = predator.xPos + 1;
            direction[0] = 1;
        }

        if(predator.yPos > predator.hauntingTarget.yPos) {
            newPosition.y = predator.yPos - 1;
            direction[1] = -1;
        } else if (predator.yPos < predator.hauntingTarget.yPos) {
            newPosition.y = predator.xPos + 1;
            direction[1] = 1;
        }

        const isCollidedWithTarget = (this.mapArr[newPosition.y] !== undefined && this.mapArr[newPosition.y][newPosition.x] !== undefined && this.mapArr[newPosition.y][newPosition.x] === predator.hauntingTarget);

        if(isCollidedWithTarget) {
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
            x: animal.xPos+directions[direction][0],
            y: animal.yPos+directions[direction][1]
        }
        if(this.isMapCellValid(newPosition.x, newPosition.y)) {
            this.doStep(animal, newPosition);
        } else {
            let nextDirection = direction+1 >= directions.length ? 0 : direction+1;
            this.moveAnimal(animal, nextDirection);
        }
    }

    moveAnimals() {
        this.#listOfAnimals.forEach(animal => {
            if(animal.type === animalTypes.prey && animal.isCondition(animalConditionsAll.normal)) {
                let direction = this.rand(0, 7);
                this.moveAnimal(animal, direction);
            } else if (animal.type === animalTypes.predator) {
                this.movePredator(animal);
            }
        })
    }

    checkForDeadAnimals() {
       this.#listOfAnimals = this.#listOfAnimals.filter(animal => {
           if(animal.isCondition(animalConditionsAll.dead)) {
               this.deleteAnimalFromMap(animal.xPos, animal.yPos);
               return false;
           }
           return true;
       });
        this.#listOfPredators = this.#listOfPredators.filter(animal => {
            if(animal.isCondition(animalConditionsAll.dead)) {
                this.deleteAnimalFromMap(animal.xPos, animal.yPos);
                return false;
            }
            return true;
        });

       this.#listOfPreys = this.#listOfPreys.filter(prey => {
           if(prey.isCondition(animalConditionsAll.dead)) {
               this.deleteAnimalFromMap(prey.xPos, prey.yPos);
               return false;
           }
           return true;
       })
   }

    getRandomAnimal() {
        if(Math.random() < 0.5) {
            return rabbitPreyMale;
        } else {
            return rabbitPreyFemale;
        }
    }
    //create - condition born
    //animal - born - setTimeout - normal

    createInitialAnimals() {
        animalsToCreate.forEach(animal => {
            for(let i = 0; i < animal.amount; i++) {
                this.bornNewAnimal(animal);
            }
        })
    }

    initializeBornInterval() {
       this.#bornInterval = setInterval(()=>{
           this.bornNewAnimal(this.getRandomAnimal());
       }, 5000)
    }

    bornNewAnimal(animal) {
        let createdAnimal = animalFactory(animal.type, animal.sex, animalsConfigurations[animal.name]);
        this.setPositionForAnimal(createdAnimal);
        this.#listOfAnimals.push(createdAnimal);
        this.map.addAnimal(createdAnimal.xPos, createdAnimal.yPos, createdAnimal);
        createdAnimal.live();
        this.#animalCounterGlobal++;

        if(animal.type === animalTypes.predator) {
            this.#listOfPredators.push(createdAnimal);
        }

        if(animal.type === animalTypes.prey) {
            this.#listOfPreys.push(createdAnimal);
        }
    }

    setPositionForAnimal(animal) {
        let xPos, yPos;
        do {
            xPos = this.rand(0, this.#map.size - 1);
            yPos = this.rand(0, this.#map.size - 1);
        } while (!this.isMapCellValid(xPos, yPos))
        animal.setPosition(xPos, yPos);
    }
}

export const manager = new Manager();
