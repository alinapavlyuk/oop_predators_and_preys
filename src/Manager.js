import {Map} from "./map/Map.js"
import {animalSex} from "./constants/animalTypes.js";
import {animalFactory} from "./animals/animalFactory.js";
import {animalsConfigurations} from "./constants/animals.js";
import {animalsToCreate, gameSpeed, mapSize} from "./constants/gameConfiguration.js";
import {directions} from "./constants/moveDirections.js";
import {mapDrawer} from "./map/MapDrawer.js";
import {animalConditionsAll} from "./constants/animalConditions.js";

class Manager {
    #map = new Map(mapSize);
    #listOfAnimals = [];
    #animalCounterGlobal = 0;

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

    start() {
        this.createAnimals();
        mapDrawer.drawMapFromArray(this.mapArr);
        let timer = setInterval(() => {
            this.checkForDeadAnimals();
            this.moveAnimals();
            mapDrawer.redrawMapFromNewArray(this.mapArr);
            if(this.currentAnimalAmount === 0) {
                clearInterval(timer);
                console.log(this.#animalCounterGlobal);
                console.log("The End.")
            }
        }, gameSpeed)
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
            if(animal.isCondition(animalConditionsAll.normal)) {
                let direction = this.rand(0, 7);
                this.moveAnimal(animal, direction);
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
   }

    randomSex() {
        if(Math.random() < 0.5) {
            return animalSex.male;
        } else {
            return animalSex.female;
        }
    }
    //create - condition born
    //animal - born - setTimeout - normal

    createAnimals() {
        animalsToCreate.forEach(animal => {
            for(let i = 0; i < animal.amount; i++) {
                let createdAnimal = animalFactory(animal.type, animal.sex, animalsConfigurations[animal.name]);
                this.setPositionForAnimal(createdAnimal);
                this.#listOfAnimals.push(createdAnimal);
                this.map.addAnimal(createdAnimal.xPos, createdAnimal.yPos, createdAnimal);
                createdAnimal.live();
                this.#animalCounterGlobal++;
            }
        })
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