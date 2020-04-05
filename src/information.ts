import { Drawable } from "./drawable";
import p5 from "p5";
import { Environment } from "./environment";

export class Information implements Drawable {
    infoP: p5.Element;

    constructor(private p: p5, private env: Environment) {
        this.infoP = p.createP();
    }

    draw(): void {
        this.infoP.html(
            `Rockets generation: ${this.env.generation}, lifespan: ${
                this.env.lifespan - this.env.count
            }`
        );
    }
}
