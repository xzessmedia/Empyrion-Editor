export class SpaceColor {
    public ColorR: number;
    public ColorG: number;
    public ColorB: number;

    constructor(r: number, g: number, b: number) {
        this.ColorR = r;
        this.ColorG = g;
        this.ColorB = b;
    }

    GenerateString():string {
        let t_str = this.ColorR.toFixed(1) + ", " + this.ColorG.toFixed(1) + ", " + this.ColorB.toFixed(1);
        return t_str;
    }
}
