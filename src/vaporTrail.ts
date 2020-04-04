import p5, { Vector } from "p5";

export class VaporTrail {
    private trail: Vector[] = [];
    private readonly elementCount = 30;
    private insertionIndex = 0; //closest to the rocket

    constructor(private p: p5) {}

    update(rocketPosition: Vector, id: number) {
        this.trail[this.insertionIndex] = rocketPosition.copy();
        this.insertionIndex++;
        this.insertionIndex %= this.elementCount;
    }

    draw() {
        this.p.push();
        this.p.stroke(255);
        if (this.trail.length === this.elementCount) {
            let last = this.getIndexBeforeInsertion();
            for (let i = this.insertionIndex; ; i++) {
                i %= this.elementCount;

                let pos = this.trail[i];
                this.p.point(pos.x, pos.y);

                if (i === last) {
                    break;
                }
            }
        } else {
            for (let i = 0; i < this.insertionIndex; i++) {
                let pos = this.trail[i];
                this.p.point(pos.x, pos.y);
            }
        }
        this.p.pop();
    }

    getIndexBeforeInsertion() {
        let index: number;
        if (this.insertionIndex === 0) {
            index = this.elementCount - 1;
        } else {
            index = this.insertionIndex - 1;
        }

        return index;
    }
}
