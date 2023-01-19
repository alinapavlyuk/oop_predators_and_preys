export class Food {
    #saturation;
    constructor(saturation) {
        this.#saturation = saturation;
    }

    get saturation() {
        return this.#saturation;
    }
}