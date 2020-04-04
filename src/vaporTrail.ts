import p5, { Vector } from "p5";
import { CircularBuffer } from "./circularBuffer";

export class VaporTrail {
    private trail: CircularBuffer<Vector>;
    private skipIndex = 0;
    private skip = 2;

    constructor(private p: p5) {
        this.trail = new CircularBuffer<Vector>(30);
    }

    update(rocketPosition: Vector, id: number) {
        if (this.skipIndex % this.skip === 0) {
            this.trail.add(rocketPosition.copy());
        }
        this.skipIndex++;
    }

    draw() {
        this.p.push();
        this.trail.foreach((pos, i, count) => {
            let brightness = i / count;
            this.p.stroke(brightness * 255);
            this.p.point(pos.x, pos.y);
        });
        this.p.pop();
    }
}
