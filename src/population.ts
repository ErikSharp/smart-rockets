import p5, { Vector } from "p5";
import { SmartRocket } from "./smartRocket";
import { Dna } from "./dna";
import { Environment } from "./environment";

export class Population {
    private rockets: SmartRocket[] = [];
    private popSize = 30;
    private matingPool: SmartRocket[] = [];

    constructor(private p: p5, private env: Environment) {
        for (let index = 0; index < this.popSize; index++) {
            this.rockets[index] = new SmartRocket(p, env, new Dna(p, env));
        }
    }

    evaluate() {
        let maxFit = 0;
        for (let i = 0; i < this.popSize; i++) {
            let rocket = this.rockets[i];
            rocket.calcFitness();
            if (rocket._fitness > maxFit) {
                maxFit = rocket._fitness;
            }
        }

        //normalize all the values
        for (let i = 0; i < this.popSize; i++) {
            this.rockets[i]._fitness /= maxFit;
        }

        //put more rockets with a higher fitness into the matingPool
        this.matingPool = [];
        for (let i = 0; i < this.popSize; i++) {
            let n = this.rockets[i]._fitness * 100;
            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.rockets[i]);
            }
        }
    }

    selection() {
        let newRockets: SmartRocket[] = [];

        for (let i = 0; i < this.rockets.length; i++) {
            //There is the possibility that the parents will be the same
            let parentA: SmartRocket = this.p.random(this.matingPool);
            let parentB: SmartRocket;
            do {
                parentB = this.p.random(this.matingPool);
            } while (parentA === parentB);

            let childDna = parentA.dna.crossover(parentB.dna);
            newRockets[i] = new SmartRocket(this.p, this.env, childDna);
        }

        this.rockets = newRockets;
    }

    run() {
        for (let index = 0; index < this.popSize; index++) {
            this.rockets[index].update();
            this.rockets[index].draw();
        }
    }
}
