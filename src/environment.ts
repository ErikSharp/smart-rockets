import p5, { Vector } from "p5";

export class Environment {
    count = 0;
    lifespan = 200;
    generation = 1;
    targetPos: Vector;
    mutationAmount = 0.005;

    constructor(private p: p5) {
        this.targetPos = p.createVector(p.width / 2, 50);
    }
}
