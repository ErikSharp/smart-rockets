import p5, { Vector } from "p5";
import { SmartRocket } from "./smartRocket";
import { Dna } from "./dna";
import { Environment } from "./environment";

export class Population {
    private rockets: SmartRocket[] = [];
    private popSize = 100;

    constructor(p: p5, private env: Environment) {
        for (let index = 0; index < this.popSize; index++) {
            this.rockets[index] = new SmartRocket(p, env, new Dna(env));
        }
    }

    run() {
        for (let index = 0; index < this.popSize; index++) {
            this.rockets[index].update();
            this.rockets[index].draw();
        }
    }
}
