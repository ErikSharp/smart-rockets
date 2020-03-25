//import * as p5 from "p5/global";
import p5 from "p5"; //if you are doing instance
import { Population } from "./population";

import "./style.scss";

const sketch = (p: p5) => {
    let population: Population;

    p.setup = function() {
        p.createCanvas(innerWidth * 0.8, innerHeight * 0.8);

        population = new Population(p);
    };

    p.draw = function() {
        p.background(0);
        population.run();
    };
};

let myP5 = new p5(sketch);
