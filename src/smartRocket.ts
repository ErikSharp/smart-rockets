import p5, { Vector } from "p5";
import { Dna } from "./dna";
import { Environment } from "./environment";

export class SmartRocket {
    private pos: Vector;
    private vel: Vector;
    private acc: Vector;
    private _exploded = false;
    private explosionFrame = 0;
    private explosionSize = 50;
    private explosionFrames = 20;
    private explosionComplete = false;
    _fitness: number;

    constructor(private p: p5, private env: Environment, public dna: Dna) {
        this.pos = p.createVector(p.width / 2, p.height - p.height / 8);
        this.vel = p.createVector();
        this.acc = p.createVector();
    }

    get exploded() {
        return this._exploded;
    }

    get fitness() {
        return this._fitness;
    }

    private applyForce(force: Vector) {
        this.acc.add(force);
    }

    update() {
        if (this._exploded) {
            return;
        }

        this.applyForce(this.dna.genes[this.env.count]);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0); //clear it

        if (
            this.pos.x > this.p.width ||
            this.pos.x < 0 ||
            this.pos.y > this.p.height ||
            this.pos.y < 0
        ) {
            this._exploded = true;
        }
    }

    calcFitness() {
        let d: number;

        if (this._exploded) {
            //pretend that it is really far away
            d = 9999999;
        } else {
            d = this.p.dist(
                this.pos.x,
                this.pos.y,
                this.env.targetPos.x,
                this.env.targetPos.y
            );
        }

        //protect against divide by zero
        if (d === 0) {
            d += 0.000001;
        }
        //the closer we are the bigger the fitness
        this._fitness = 1 / d;
    }

    draw() {
        if (this._exploded) {
            this.drawExplosion();
        } else {
            this.drawRocket();
        }
    }

    drawRocket() {
        this.p.push();
        this.p.noStroke();
        this.p.fill(255, 150);
        this.p.translate(this.pos.x, this.pos.y);
        let foo = this.vel.heading();
        this.p.rotate(foo + this.p.HALF_PI);
        this.p.stroke(255, 150);
        this.p.noFill();
        this.p.triangle(0, 15, 3, 0, 6, 15);
        this.p.pop();
    }

    drawExplosion() {
        if (!this.explosionComplete) {
            this.p.push();
            this.p.fill(255, 255 - this.explosionFrame * 10);
            this.p.ellipseMode(this.p.CENTER);
            this.p.ellipse(
                this.pos.x,
                this.pos.y,
                this.explosionSize - this.explosionFrame * 2
            );
            this.explosionFrame++;
            if (this.explosionFrame > this.explosionFrames) {
                this.explosionComplete = true;
            }
            this.p.pop();
        }
    }
}
