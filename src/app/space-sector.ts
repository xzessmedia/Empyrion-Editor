import { SpaceNode } from './space-node';
import { SpaceColor } from './space-color';
import { Playfield } from './playfield';

export enum BasePlanetTypes {
    Temperate = 1,
    Alien = 2,
    Desert = 3,
    Lava = 4,
    Snow = 5
}
enum PlanetTypes {
    TYPE_EARTH = 0,
    TYPE_SAND = 1,
    TYPE_ICE = 2,
    TYPE_LAVA = 3,
    TYPE_ALIEN = 4
}
export class SpaceSector {
    private Nodes: Array<SpaceNode>;
    private MaxNodes: number;
    private CurrentMap: string;
    private FinalMap: string;

    private MaxRandomX: number;
    private MaxRandomY: number;
    private MaxRandomZ: number;

    private MaxPlayfields: number;

    private nl: string;

    constructor() {
        this.Nodes = new Array<SpaceNode>(30);
        this.nl = "<br>";
        this.MaxRandomX = 255;
        this.MaxRandomY = 255;
        this.MaxRandomZ = 255;
    }
    

    GenerateRandomNode():SpaceNode {
        let t_node = new SpaceNode();

        // Generate Random Icon
        let RndIcon = this.RandomNumberInRange(0,7);
        switch (RndIcon) {
            case 0:
                t_node.SetIcon("Circle");
                break;
            case 1:
                t_node.SetIcon("Kite");
                break;
            case 2:
                t_node.SetIcon("Rhombus");
                break;
            case 3:
                t_node.SetIcon("Pentagon");
                break;
            case 4:
                t_node.SetIcon("Square");
                break;
            case 5:
                t_node.SetIcon("Star");
                break;
            case 6:
                t_node.SetIcon("Triangle");
                break;
            case 7:
                t_node.SetIcon("Hexagon");
                break;

            default:
                break;
        }

        // Generate Random Color
        let cr:number = this.RandomFloatInRange(0.0,1.0);
        let cg:number = this.RandomFloatInRange(0.0,1.0);
        let cb:number = this.RandomFloatInRange(0.0,1.0);
        t_node.SetColor(cr,cg,cb);

        // Set Random Location
        let x:number = this.RandomNumberInRange(-this.MaxRandomX,this.MaxRandomX);
        let y:number = this.RandomNumberInRange(-this.MaxRandomY,this.MaxRandomY);
        let z:number = this.RandomNumberInRange(-this.MaxRandomZ,this.MaxRandomZ);
        t_node.SetCoordinate(x,y,z);

        // Random Playfields
        let t_maxPlayfieldNumber = this.RandomNumberInRange(1,this.MaxPlayfields);
        console.log("Random Number is: "+t_maxPlayfieldNumber);
        for (var index = 0; index < t_maxPlayfieldNumber; index++) {
            // Random Object
              t_node = this.GenerateRandomPlayfield(t_node);
        }
        return t_node;
    }

    GenerateRandomPlayfield(t_node: SpaceNode):SpaceNode {
        let x:number = this.RandomNumberInRange(-this.MaxRandomX,this.MaxRandomX);
        let y:number = this.RandomNumberInRange(-this.MaxRandomY,this.MaxRandomY);
        let z:number = this.RandomNumberInRange(-this.MaxRandomZ,this.MaxRandomZ);
        let randomNum:number = this.RandomNumberInRange(1,99999);
        let randomTypeNum:number = this.RandomNumberInRange(1,2);
        let randomSelector: number = this.RandomNumberInRange(0,2);
        let randomPlanetType: number = this.RandomNumberInRange(0,4);
        let randomType:number = this.RandomNumberInRange(1,2);
        let randomOld:number = this.RandomNumberInRange(0,1);
        let randomIsOld:boolean = false;

        // Random Old
        if (randomOld == 0) {
            randomIsOld = false;
        } else {
            randomIsOld = true;
        }

        switch (randomSelector) {
            case 0:
            let t_planettype:PlanetTypes;
            
                        switch (randomPlanetType) {
                            case 0:
                                t_planettype = PlanetTypes.TYPE_EARTH;
                                break;
                            case 1:
                                t_planettype = PlanetTypes.TYPE_SAND;
                            break;
                                case 2:
                                t_planettype = PlanetTypes.TYPE_ICE;
                                break;
                            case 3:
                                t_planettype = PlanetTypes.TYPE_LAVA;
                                break;
                            case 4:
                                t_planettype = PlanetTypes.TYPE_ALIEN;
                                break;
            
                            default:
                                break;
                        }
                        t_node.AddPlanet(x,y,z,"RandomPlanet"+randomNum.toString(),t_planettype,randomType,randomIsOld);
                break;
            case 1:
            t_node.AddMoon(x,y,z,"RandomMoon"+randomNum.toString(),randomType,randomIsOld);
                break;
            case 2:
            t_node.AddAsteroidField(x,y,z,"RandomAsteroidField"+randomNum.toString());
                break;
        
            default:
                break;
        }
        return t_node;
    }

    RandomNumberInRange(min: number, max: number):number {
        let t_number: number;


            t_number = Math.floor(Math.random() * (max-min)) + min;
        

        
        return t_number;
    }

    RandomFloatInRange(min: number, max: number):number {
        let t_number: number;


            t_number = Math.random() * (max-min) + min;
        

        
        return t_number;
    }

    GenerateRandomMap(MaxNodes: number, MaxPlayfields: number, MaxRandomX:number, MaxRandomY:number, MaxRandomZ:number) {
        this.MaxNodes = MaxNodes;
        this.MaxPlayfields = MaxPlayfields;
        this.MaxRandomX = MaxRandomX;
        this.MaxRandomY = MaxRandomY;
        this.MaxRandomZ = MaxRandomZ;
        
        this.Nodes = new Array<SpaceNode>(30);
        for (var index = 0; index < MaxNodes; index++) {
            let t_node:SpaceNode = this.GenerateRandomNode();
            this.Nodes.push(t_node);
        }
    }

    SetNL(newNL:string) {
        this.nl = newNL;
    }
    GetNL():string {
        let t_str:string = this.nl;
        return t_str;
    }

    GetFileHeader():string {
        let t_str = "---" + this.GetNL();
        t_str += "# Sectors MP" + this.GetNL();
        t_str += "# IMPORTANT: YAML files use spaces as indentation. Please don't use TABs: http://yaml.org/faq.html" + this.GetNL();
        t_str += "# Default starter planets on a Dedicated Server are Akua, Omicron, Ningues and Masperon. 'Origin:Number' behind playfield template sets starter planet [ \"0, 0, 0\", Akua, Temperate, 'Human:1' ]" + this.GetNL();
        t_str += "# Allow and Deny lists: If “Allow” is set, sectors that are given in list are accessible in addition to those that are close enough. If “Deny” is set, sectors that are given in list are not accessible." + this.GetNL();
        t_str += "# Available Icons: Circle, Kite, Rhombus, Pentagon, Square, Star, Triangle, Hexagon" + this.GetNL();
        t_str += this.GetNL();
        return t_str;
    }

    GenerateMapOutput():string {
        this.CurrentMap = this.GetFileHeader();
        this.Nodes.forEach(element => {
            this.CurrentMap += element.GenerateString() + this.GetNL();
        });
        this.FinalMap = this.CurrentMap;
        return this.FinalMap;
    }

    GenerateDownloadMap():string {
        this.SetNL("\n");
        return this.GenerateMapOutput();
    }
}
