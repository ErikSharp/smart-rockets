import { Drawable } from "./drawable";
import p5 from "p5";
import { Environment } from "./environment";

export class Target implements Drawable {
    infoP: p5.Element;

    constructor(private p: p5, private env: Environment) {}

    draw(): void {
        this.p.ellipse(this.env.targetPos.x, this.env.targetPos.y, 16, 16);
    }
}
