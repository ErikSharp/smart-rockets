//import * as p5 from "p5/global";
import p5 from "p5"; //if you are doing instance
import { Population } from "./population";
import { Environment } from "./environment";

import "./style.scss";
import { SmartRocket } from "./smartRocket";

const sketch = (p: p5) => {
    let population: Population;
    let env: Environment;
    let lifeP: p5.Element;

    p.setup = function() {
        p.createCanvas(innerWidth * 0.8, innerHeight * 0.8);
        env = new Environment(p);
        population = new Population(p, env);
        lifeP = p.createP();
    };

    p.draw = function() {
        p.background(0);
        p.ellipse(env.targetPos.x, env.targetPos.y, 16, 16);
        population.run();
        lifeP.html(
            `Rockets generation: ${env.generation}, lifespan: ${env.lifespan -
                env.count}`
        );
        env.count++;
        if (env.count == env.lifespan - 1) {
            population.evaluate();
            population.selection();
            env.count = 0;
            env.generation++;
        }
    };
};

let myP5 = new p5(sketch);
