import p5, { Vector } from "p5";

export class VaporTrail {
    private trail: Vector[] = [];
    private readonly trailLength = 30;
    private trailIndex = -1;
    private skip = true;

    constructor(private p: p5) {}

    update(rocketPosition: Vector, id: number) {
        if (!this.skip) {
            this.trailIndex++;
            this.trailIndex %= this.trailLength;
            this.trail[this.trailIndex] = rocketPosition.copy();
        }
    }

    draw() {
        if (this.skip) {
            this.skip = false;
        } else {
            this.p.push();
            for (
                let index = this.trailIndex, i = 0;
                i < this.trailLength;
                index++, i++
            ) {
                let actualIndex = index % this.trailLength;
                let particle = this.trail[actualIndex];
                if (particle) {
                    this.p.stroke(10 + i * 5);
                    // this.p.rotate(particle.heading() + this.p.HALF_PI);
                    this.p.point(particle.x + 5, particle.y + 5);
                } else {
                    break;
                }
            }
            this.p.pop();
        }
    }
}
