import { Vector } from "p5";
import { SmartRocket } from "./smartRocket";

export class Dna {
    genes: Vector[];

    constructor() {
        this.genes = new Array(SmartRocket.lifespan);

        for (let index = 0; index < this.genes.length; index++) {
            this.genes[index] = Vector.random2D();
        }
    }
}
