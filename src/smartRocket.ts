import p5, { Vector } from "p5";
import { Dna } from "./dna";
import { Environment } from "./environment";
import { VaporTrail } from "./vaporTrail";
import { Explosion } from "./explosion";

export class SmartRocket {
    private static Ids = 0;
    private readonly id: number;
    private pos: Vector;
    private vel: Vector;
    private acc: Vector;
    private _exploded = false;
    private explosion: Explosion;
    private vaporTrail: VaporTrail;
    fitness: number;

    constructor(private p: p5, private env: Environment, public dna: Dna) {
        this.pos = p.createVector(p.width / 2, p.height - p.height / 8);
        this.vel = p.createVector();
        this.acc = p.createVector();

        this.id = ++SmartRocket.Ids;

        this.vaporTrail = new VaporTrail(p);
        this.explosion = new Explosion(p);
    }

    get exploded() {
        return this._exploded;
    }

    private applyForce(force: Vector) {
        this.acc.add(force);
    }

    update() {
        if (this._exploded) {
            this.explosion.update();
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
            this.explosion.position = this.pos;
        } else {
            this.vaporTrail.update(this.pos, this.id);
        }
    }

    calcFitness() {
        let distFromTarget: number;

        if (this._exploded) {
            //pretend that it is really far away
            distFromTarget = Number.MAX_SAFE_INTEGER;
        } else {
            distFromTarget = this.p.dist(
                this.pos.x,
                this.pos.y,
                this.env.targetPos.x,
                this.env.targetPos.y
            );
        }

        //protect against divide by zero
        if (distFromTarget === 0) {
            distFromTarget += 0.000001;
        }
        //the closer we are the bigger the fitness
        this.fitness = 1 / distFromTarget;
    }

    draw() {
        if (this._exploded) {
            this.explosion.draw();
        } else {
            this.drawRocket();
        }
    }

    private drawRocket() {
        this.p.push();
        this.p.noStroke();
        this.p.translate(this.pos.x, this.pos.y);
        this.p.rotate(this.vel.heading() + this.p.HALF_PI);
        this.p.stroke(255, 150);
        // this.p.noFill();
        this.p.fill(0);
        this.p.beginShape();
        this.p.vertex(0, 0);
        this.p.vertex(4, 15);
        this.p.vertex(-4, 15);
        this.p.endShape(this.p.CLOSE);
        this.p.pop();

        this.vaporTrail.draw();
    }
}
