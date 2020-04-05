import p5, { Vector } from "p5";
import { SmartRocket } from "./smartRocket";
import { Dna } from "./dna";
import { Environment } from "./environment";
import { Updatable } from "./updatable";
import { Drawable } from "./drawable";

export class Population implements Updatable, Drawable {
    private rockets: SmartRocket[] = [];
    private popSize = 30;
    private matingPool: SmartRocket[] = [];

    constructor(private p: p5, private env: Environment) {
        for (let index = 0; index < this.popSize; index++) {
            this.rockets[index] = new SmartRocket(p, env, new Dna(p, env));
        }
    }

    update() {
        this.env.count++;
        if (this.env.count == this.env.lifespan - 1) {
            this.evaluate();
            this.selection();
            this.env.count = 0;
            this.env.generation++;
        }
    }

    private evaluate() {
        let maxFit = 0;
        for (let i = 0; i < this.popSize; i++) {
            let rocket = this.rockets[i];
            rocket.calcFitness();
            if (rocket.fitness > maxFit) {
                maxFit = rocket.fitness;
            }
        }

        //normalize all the values
        for (let i = 0; i < this.popSize; i++) {
            this.rockets[i].fitness /= maxFit;
        }

        //put more rockets with a higher fitness into the matingPool
        this.matingPool = [];
        for (let i = 0; i < this.popSize; i++) {
            let n = this.rockets[i].fitness * 100;
            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.rockets[i]);
            }
        }
    }

    private selection() {
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

    draw() {
        for (let index = 0; index < this.popSize; index++) {
            this.rockets[index].update();
            this.rockets[index].draw();
        }
    }
}
