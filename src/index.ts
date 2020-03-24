//import * as p5 from "p5/global";
import p5 from "p5"; //if you are doing instance
import { BouncyBox } from "./bouncyBox";

import "./style.scss";

const s = (p: any) => {
    let box: BouncyBox;

    p.setup = function() {
        p.createCanvas(700, 410);
        box = new BouncyBox();
    };

    p.draw = function() {
        box.update();
        p.background(0);
        box.draw();
    };
};

let myP5 = new p5(s);
