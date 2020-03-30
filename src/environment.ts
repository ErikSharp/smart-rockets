import p5, { Vector } from "p5";

export class Environment {
    count = 0;
    lifespan = 200;
    targetPos: Vector;

    constructor(private p: p5) {
        this.targetPos = p.createVector(p.width / 2, 50);
    }
}
