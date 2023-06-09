import {Food} from "./Food.js";
import {gameSpeed} from "../constants/gameConfiguration.js";
import {conditionsAll} from "../constants/animalConditions.js";

export class Animal extends Food {
    #type;
    #sex;
    #speed;
    #vision;
    #diet;
    #maxHealth;

    constructor(name, type, sex, speed, vision, diet, maxHealth, saturation, conditions) {
        super(saturation, name, -1, -1, conditions, maxHealth);
        this.#type = type;
        this.#sex = sex;
        this.#speed = speed;
        this.#vision = vision;
        this.#diet = diet;
        this.#maxHealth = maxHealth;
    }

    get type() {
        return this.#type;
    }

    get diet() {
        return this.#diet;
    }

    get maxHealth() {
        return this.#maxHealth;
    }

    get sex() {
        return this.#sex;
    }

    live() {
        setInterval(() => {
            if (this.isCondition(conditionsAll.normal)) {
                this.getHungry();
                this.checkHealth();
            }
        }, gameSpeed)
    }

    getHungry() {
        this.loseHealth(0.05 * this.#maxHealth);
    }

    eat(food) {
        if (food.saturation > 0) {
            this.#receiveHealth(food.saturation);
        }
    }

    #receiveHealth(amount) {
        this.health += amount;
        if (this.health > this.#maxHealth) {
            this.health = this.#maxHealth;
        }
    }

    loseHealth(amount) {
        this.health -= amount;
    }

    update() {
        if (this.health < 0.7 * this.maxHealth && !this.isCondition(conditionsAll.dead) && !this.isCondition(conditionsAll.haunting)) {
            this.changeCondition(conditionsAll.haunting);
        }
    }
}

