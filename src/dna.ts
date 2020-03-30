import { Vector } from "p5";
import { SmartRocket } from "./smartRocket";
import { Environment } from "./environment";

export class Dna {
    genes: Vector[];

    constructor(env: Environment) {
        this.genes = new Array(env.lifespan);

        for (let index = 0; index < this.genes.length; index++) {
            this.genes[index] = Vector.random2D();
            this.genes[index].setMag(0.1);
        }
    }
}
