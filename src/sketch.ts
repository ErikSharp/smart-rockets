import p5 from "p5";
import { Drawable } from "./drawable";
import { Updatable } from "./updatable";
import { Environment } from "./environment";
import { Population } from "./population";
import { Information } from "./information";
import { Target } from "./target";

export class Sketch {
    updatables: Updatable[] = [];
    drawables: Drawable[] = [];

    constructor(private p: p5) {
        p.createCanvas(innerWidth * 0.8, innerHeight * 0.8);

        let env = new Environment(p);
        this.updatables.push(env);

        this.drawables.push(new Information(p, env));
        this.drawables.push(new Target(p, env));

        let pop = new Population(p, env);
        this.updatables.push(pop);
        this.drawables.push(pop);
    }

    update() {
        this.updatables.forEach((u) => u.update());
    }

    draw() {
        this.p.background(0);

        this.drawables.forEach((d) => d.draw());
    }
}
