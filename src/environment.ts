import p5, { Vector } from "p5";

export class Environment {
    count = 0;
    generation = 1;
    targetPos: Vector;
    private _lifespan = 200;
    private xOrigin: number;
    private yOrigin: number;
    private _mutationAmount = 0.003;
    private xoff = 0;
    private yoff = 100;

    constructor(private p: p5) {
        this.xOrigin = p.width / 2;
        this.yOrigin = p.height / 2;
        this.targetPos = p.createVector(this.xOrigin, this.yOrigin);
    }

    update() {
        this.xoff += 0.0002;
        this.yoff += 0.0002;
        let x = this.p.noise(this.xoff);
        let y = this.p.noise(this.xoff);
        this.targetPos.x = this.xOrigin + (x - 0.5) * this.p.width;
        this.targetPos.y = this.yOrigin + (y - 0.5) * this.p.height;
    }

    get lifespan(): number {
        return this._lifespan;
    }

    get mutationAmount(): number {
        return this._mutationAmount;
    }
}
