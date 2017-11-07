import { SpaceCoordinate } from './space-coordinate';
import { SpaceElement } from './space-element';
export class Playfield {
    public Coordinate: SpaceCoordinate
    public PlayfieldName: string;
    public PlayfieldObject: string;
    public nl: string;

    constructor(x: number, y: number, z: number, PlayfieldName: string, PlayfieldObject: string) {
        this.Coordinate = new SpaceCoordinate(x,y,z);
        this.PlayfieldName = PlayfieldName;
        this.PlayfieldObject = PlayfieldObject;
        this.nl = "<br>";
    }
    SetNL(newNL:string) {
        this.nl = newNL;
    }

    GenerateString():string {
        let t_str:string = "- ["+this.Coordinate.GeneratePlayfieldString()+", "+this.PlayfieldName+", "+this.PlayfieldObject+"]";
        return t_str;
    }
}
