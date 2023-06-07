import { animalFactory } from './animalFactory.js';
import { animalsConfigurations } from '../constants/animals.js';
import { animalTypes } from '../constants/animalTypes.js';
import { rand } from '../utils/index.js';
import { animalConditionsAll } from '../constants/animalConditions.js';
import { directions } from '../constants/moveDirections.js';
import { animalsToCreate, rabbitPreyFemale, rabbitPreyMale } from '../constants/gameConfiguration.js';

export class AnimalsManager {
  #gameMap;
  #chart;

  #listOfAnimals;
  #listOfPredators;
  #listOfPreys;

  #animalCounterGlobal;

  constructor(map, chart) {
    this.#gameMap = map;
    this.#chart = chart;

    this.#listOfAnimals = []
    this.#listOfPredators = [];
    this.#listOfPreys = [];

    this.#animalCounterGlobal = 0;

    this.#chart.initChart(
      this.#listOfPredators.length,
      this.#listOfPreys.length,
    );
  }

  createInitialAnimals() {
    animalsToCreate.forEach(animal => {
      for(let i = 0; i < animal.amount; i++) {
        this.bornNewAnimal(animal);
      }
    })
  }

  bornNewAnimal = (animal) => {
    let createdAnimal = animalFactory(animal.type, animal.sex, animalsConfigurations[animal.name]);
    this.setPositionForAnimal(createdAnimal);
    this.#listOfAnimals.push(createdAnimal);
    this.#gameMap.addAnimal(createdAnimal.xPos, createdAnimal.yPos, createdAnimal);
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
      xPos = rand(0, this.#gameMap.size - 1);
      yPos = rand(0, this.#gameMap.size - 1);
    } while (!this.#gameMap.isCellValid(xPos, yPos))
    animal.setPosition(xPos, yPos);
  }

  hasNoAnimals() {
    return this.#listOfAnimals.length === 0
  }

  moveAnimals() {
    this.#listOfAnimals.forEach(animal => {
      if(animal.type === animalTypes.prey && animal.isCondition(animalConditionsAll.normal)) {
        let direction = rand(0, 7);
        this.moveAnimal(animal, direction);
      } else if (animal.type === animalTypes.predator) {
        this.movePredator(animal);
      }
    })
  }

  movePredator(predator) {
    if(predator.hauntingTarget && !predator.hauntingTarget.isDead()) {
      this.movePredatorToPrey(predator);
    } else {
      const isPreyFound = this.searchPrey(predator);
      if(isPreyFound) {
        this.movePredatorToPrey(predator);
      } else {
        let direction = rand(0, 7);
        this.moveAnimal(predator, direction);
      }
    }
  }

  doStep(animal, newPosition) {
    this.#gameMap.moveAnimal(animal, newPosition);
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

    const isCollidedWithTarget = (this.#gameMap.mapArr[newPosition.y] !== undefined &&
      this.#gameMap.mapArr[newPosition.y][newPosition.x] !== undefined &&
      this.#gameMap.mapArr[newPosition.y][newPosition.x] === predator.hauntingTarget
    );

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
    if(this.#gameMap.isCellValid(newPosition.x, newPosition.y)) {
      this.doStep(animal, newPosition);
    } else {
      let nextDirection = direction+1 >= directions.length ? 0 : direction+1;
      this.moveAnimal(animal, nextDirection);
    }
  }

  checkForDeadAnimals() {
    this.#listOfAnimals = this.#listOfAnimals.filter(animal => {
      if(animal.isCondition(animalConditionsAll.dead)) {
        this.#gameMap.deleteAnimal(animal.xPos, animal.yPos);
        return false;
      }
      return true;
    });
    this.#listOfPredators = this.#listOfPredators.filter(animal => {
      if(animal.isCondition(animalConditionsAll.dead)) {
        this.#gameMap.deleteAnimal(animal.xPos, animal.yPos);
        return false;
      }
      return true;
    });
    this.#listOfPreys = this.#listOfPreys.filter(prey => {
      if(prey.isCondition(animalConditionsAll.dead)) {
        this.#gameMap.deleteAnimal(prey.xPos, prey.yPos);
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

  bornNewRandomAnimal() {
     this.bornNewAnimal(this.getRandomAnimal())
  }

  update() {
    this.checkForDeadAnimals();
    this.moveAnimals();

    this.#chart.update(
      this.#listOfPredators.length,
      this.#listOfPreys.length,
    );
  }
}
