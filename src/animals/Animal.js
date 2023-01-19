import {Food} from "./Food.js";
import {gameSpeed} from "../constants/gameConfiguration.js";
import {animalConditionsAll} from "../constants/animalConditions.js";

export class Animal extends Food{
    #name;
    #type;
    #sex;
    #speed;
    #health;
    #vision;
    #condition;
    #diet;
    #maxHealth;
    #xPos;
    #yPos;
    #conditions;

    constructor (name, type, sex, speed, vision, diet, maxHealth, saturation, conditions) {
        super(saturation);
        this.#name = name;
        this.#type = type;
        this.#sex = sex;
        this.#speed = speed;
        this.#health = maxHealth;
        this.#vision = vision;
        this.#condition = animalConditionsAll.normal;
        this.#diet = diet;
        this.#maxHealth = maxHealth;
        this.#conditions = conditions;
        this.#xPos = -1;
        this.#yPos = -1;
    }

    get xPos() {
        return this.#xPos;
    }

    get yPos() {
        return this.#yPos;
    }

    get name() {
        return this.#name;
    }

    get type() {
        return this.#type;
    }

    get health() {
        return this.#health;
    }

    isCondition (condition) {
        return this.#condition === animalConditionsAll[condition];
    }

    setPosition(xPos, yPos) {
        this.#xPos = xPos;
        this.#yPos = yPos;
    }

    live() {
        setInterval(() => {
            if(this.isCondition(animalConditionsAll.normal)) {
                this.getHungry();
                this.checkHealth();
            }
        }, gameSpeed)
    }

    checkHealth() {
        if(this.#health <= 0) {
            this.changeCondition(animalConditionsAll.dead);
        }
    }

    getHungry() {
        this.loseHealth(0.05 * this.#maxHealth);
    }

    eat(food) {
        if(food.saturation > 0) {
            this.#receiveHealth(food.saturation);
        }
    }

    #receiveHealth(amount) {
        this.#health += amount;
        if(this.#health > this.#maxHealth) {
            this.#health = this.#maxHealth;
        }
    }

    loseHealth(amount) {
        this.#health -= amount;
    }

    changeCondition(condition) {
        if(this.#conditions.indexOf(condition) >= 0) {
            this.#condition = condition;
            return;
        }
        throw new Error(`${condition} is not allowed`);
    }
}

