import {conditionsAll} from "../constants/animalConditions.js";

export class Food {
    #name;
    #xPos;
    #yPos;
    #saturation;
    #condition;
    #conditions;
    #health;

    constructor(saturation, name, xPos, yPos, conditions, health) {
        this.#saturation = saturation;
        this.#name = name;
        this.#xPos = xPos;
        this.#yPos = yPos;
        this.#health = health;
        this.#conditions = conditions;
        this.#condition = conditionsAll.normal;
    }

    get health() {
        return this.#health;
    }

    set health(health) {
        this.#health = health;
    }

    get name() {
        return this.#name;
    }

    get saturation() {
        return this.#saturation;
    }

    get xPos() {
        return this.#xPos;
    }

    get yPos() {
        return this.#yPos;
    }

    isDead() {
        return this.#condition === conditionsAll.dead;
    }

    isCondition(condition) {
        return this.#condition === conditionsAll[condition];
    }

    changeCondition(condition) {
        if (this.#conditions.indexOf(condition) >= 0) {
            this.#condition = condition;
            return;
        }
        throw new Error(`${condition} is not allowed`);
    }

    checkHealth() {
        if (this.#health <= 0) {
            this.changeCondition(conditionsAll.dead);
        }
    }

    setPosition(xPos, yPos) {
        this.#xPos = xPos;
        this.#yPos = yPos;
    }
}