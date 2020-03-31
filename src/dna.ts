import p5, { Vector } from "p5";
import { SmartRocket } from "./smartRocket";
import { Environment } from "./environment";

export class Dna {
    genes: Vector[];

    constructor(private p: p5, private env: Environment, genes?: Vector[]) {
        if (!genes) {
            this.genes = new Array(env.lifespan);

            for (let index = 0; index < this.genes.length; index++) {
                this.genes[index] = Vector.random2D();
                this.genes[index].setMag(0.5);
            }
        } else {
            this.genes = genes;
        }
    }

    crossover(partner: Dna) {
        let childGenes: Vector[] = [];
        let midPoint = this.p.floor(this.p.random(this.genes.length));
        let mutationPool = 1 / this.env.mutationAmount;
        for (let i = 0; i < this.genes.length; i++) {
            if (this.p.random(mutationPool) > 1) {
                if (i > midPoint) {
                    childGenes[i] = this.genes[i];
                } else {
                    childGenes[i] = partner.genes[i];
                }
            } else {
                childGenes[i] = Vector.random2D();
            }
        }

        return new Dna(this.p, this.env, childGenes);
    }
}
