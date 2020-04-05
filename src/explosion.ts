import p5, { Vector } from "p5";

export class Explosion {
    private explosionFrame = -1;
    private explosionSize = 50;
    private explosionFrames = 20;
    private explosionComplete = false;
    position: Vector;

    constructor(private p: p5) {}

    update(): void {
        this.explosionFrame++;
        if (this.explosionFrame > this.explosionFrames) {
            this.explosionComplete = true;
        }
    }

    draw(): void {
        if (!this.explosionComplete) {
            this.p.push();
            this.p.fill(255, 255 - this.explosionFrame * 10);
            this.p.ellipseMode(this.p.CENTER);
            this.p.ellipse(
                this.position.x,
                this.position.y,
                this.explosionSize - this.explosionFrame * 2
            );
            this.p.pop();
        }
    }
}
