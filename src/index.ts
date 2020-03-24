//import * as p5 from "p5/global";
import p5 from "p5"; //if you are doing instance
import { BouncyBox } from "./bouncyBox";

import "./style.scss";

const sketch = (p: p5) => {
    let boxes: BouncyBox[] = [];

    p.setup = function() {
        p.createCanvas(700, 410);
        for (let index = 0; index < 10; index++) {
            boxes[index] = new BouncyBox(p);
        }
    };

    p.draw = function() {
        boxes.forEach(b => b.update());
        p.background(0);
        boxes.forEach(b => b.draw());
    };
};

let myP5 = new p5(sketch);
