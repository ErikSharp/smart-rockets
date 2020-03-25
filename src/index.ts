//import * as p5 from "p5/global";
import p5 from "p5"; //if you are doing instance
import { Population } from "./population";

import "./style.scss";
import { SmartRocket } from "./smartRocket";

const sketch = (p: p5) => {
    let population: Population;
    let lifeP: p5.Element;

    p.setup = function() {
        p.createCanvas(innerWidth * 0.8, innerHeight * 0.8);

        population = new Population(p);
        lifeP = p.createP();
    };

    p.draw = function() {
        p.background(0);
        population.run();
        lifeP.html(SmartRocket.count.toString());
        SmartRocket.count++;
        SmartRocket.count %= SmartRocket.lifespan;
    };
};

let myP5 = new p5(sketch);
