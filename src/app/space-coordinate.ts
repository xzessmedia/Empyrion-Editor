export class SpaceCoordinate {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y:number, z:number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    GeneratePlayfieldString():string {
        let t_str:string = "'"+this.x+", "+this.y+", "+this.z+"'";
        return t_str;
    }
    GenerateString():string {
        let t_str:string = this.x+", "+this.y+", "+this.z;
        return t_str;
    }
}
