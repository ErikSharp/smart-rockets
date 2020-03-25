import p5, { Vector } from "p5";
import { Dna } from "./dna";

export class SmartRocket {
    static readonly lifespan = 200;
    static count = 0;
    private p: p5;
    private pos: Vector;
    private vel: Vector;
    private acc: Vector;
    private dna = new Dna();

    constructor(p: p5) {
        this.p = p;
        this.pos = p.createVector(p.width / 2, p.height);
        this.vel = p.createVector();
        this.acc = p.createVector();
    }

    private applyForce(force: Vector) {
        this.acc.add(force);
    }

    update() {
        this.applyForce(this.dna.genes[SmartRocket.count]);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0); //clear it
    }

    draw() {
        this.p.push();
        this.p.noStroke();
        this.p.fill(255, 150);
        this.p.translate(this.pos.x, this.pos.y);
        this.p.rotate(this.vel.heading());
        this.p.rectMode(this.p.CENTER);
        this.p.rect(0, 0, 25, 5);
        this.p.pop();
    }
}
