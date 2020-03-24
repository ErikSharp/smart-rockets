import p5, { Vector } from "p5";
import { drawable } from "./drawable";
import { updatable } from "./updatable";

export class BouncyBox implements drawable, updatable {
    pos: Vector;

    constructor() {
        this.pos = Vector.random2D();
    }

    update() {
        console.log("update");
    }

    draw() {
        console.log("draw");
    }
}
