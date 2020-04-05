//import * as p5 from "p5/global";
import p5 from "p5"; //if you are doing instance
import { Sketch } from "./sketch";

import "./style.scss";

const startFunc = (p: p5) => {
    let sketch: Sketch;

    p.setup = function () {
        sketch = new Sketch(p);
    };

    p.draw = function () {
        sketch.update();
        sketch.draw();
    };
};

let myP5 = new p5(startFunc);
