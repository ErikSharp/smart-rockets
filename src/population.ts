import p5, { Vector } from "p5";
import { SmartRocket } from "./smartRocket";

export class Population {
    private rockets: SmartRocket[] = [];
    private popSize = 100;

    constructor(p: p5) {
        for (let index = 0; index < this.popSize; index++) {
            this.rockets[index] = new SmartRocket(p);
        }
    }

    run() {
        for (let index = 0; index < this.popSize; index++) {
            this.rockets[index].update();
            this.rockets[index].draw();
        }
    }
}
