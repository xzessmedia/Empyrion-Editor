import { SpaceCoordinate } from './space-coordinate';
import { SpaceColor } from './space-color';
import { Playfield } from './playfield';

enum PlanetTypes {
    TYPE_EARTH = 0,
    TYPE_SAND = 1,
    TYPE_ICE = 2,
    TYPE_LAVA = 3,
    TYPE_ALIEN = 4
}
export class SpaceNode {
    private Coordinate: SpaceCoordinate;
    private Color: SpaceColor;
    private Icon: string;
    private Playfields: Array<Playfield>;
    private Deny: Array<string>;
    private OrbitLine: boolean;
    private nl: string;

    constructor() {
        this.Coordinate = new SpaceCoordinate(0,0,0);
        this.Color = new SpaceColor(0,0,0);
        console.log(JSON.stringify(this.Color));
        this.Icon = "Circle";
        this.Playfields = new Array<Playfield>();
        this.Deny = new Array<string>();
        this.OrbitLine = false;
        this.nl = "<br>";
    }

    SetNL(newNL:string) {
        this.nl = newNL;
    }

    SetColor(r: number, g: number, b: number) {
        let t_color = new SpaceColor(r,g,b);
        this.Color = t_color;
    }

    SetIcon(newIcon:string) {
        this.Icon = newIcon;
    }

    SetOrbitLine(newValue: boolean) {
        this.OrbitLine = newValue;
    }

    SetCoordinate(x: number, y: number, z: number) {
        this.Coordinate = new SpaceCoordinate(x,y,z);
    }

    AddPlayfield(x: number, y: number, z: number, PlayfieldName: string, PlayfieldObject: string) {
        let t_playfield:Playfield = new Playfield(x,y,z,PlayfieldName,PlayfieldObject);
        this.Playfields.push(t_playfield);
    }

    AddOrbit(x: number, y: number, z: number, PlanetName: string, hasAsteroids: boolean) {
        if (hasAsteroids == true) {
            this.AddPlayfield(x,y,z,PlanetName+" Orbit","SpaceEmptyNingues");
        } else {
            this.AddPlayfield(x,y,z,PlanetName+" Orbit","SpaceAsteroidFieldRingAitis");
        }
    }

    AddMoon(x: number, y: number, z: number, MoonName: string, MoonType: number, IsOldType: boolean) {
        if (IsOldType == true)  {
            this.AddPlayfield(x,y,z,MoonName,"Moon"+MoonType.toString());
        } else {
            this.AddPlayfield(x,y,z,MoonName,"NewMoon"+MoonType.toString());
        }
    }

    AddEarth(x: number, y: number, z: number, EarthName: string, EarthType: number, IsOldType: boolean) {
        if (IsOldType == true) {
            this.AddPlayfield(x,y,z,EarthName,"Temperate"+EarthType.toString());
        } else {
            this.AddPlayfield(x,y,z,EarthName,"NewTemperate"+EarthType.toString());
        }
        this.AddOrbit(x,y,z,EarthName,true);
    }

    AddLava(x: number, y: number, z: number, LavaName: string, LavaType: number, IsOldType: boolean) {
        if (IsOldType == true) {
            this.AddPlayfield(x,y,z,LavaName,"Temperate"+LavaType.toString());
        } else {
            this.AddPlayfield(x,y,z,LavaName,"NewTemperate"+LavaType.toString());
        }
        this.AddOrbit(x,y,z,LavaName,true);
    }

    AddDesert(x: number, y: number, z: number, DesertName: string, DesertType: number, IsOldType: boolean) {
        if (IsOldType == true) {
            this.AddPlayfield(x,y,z,DesertName,"Temperate"+DesertType.toString());
        } else {
            this.AddPlayfield(x,y,z,DesertName,"NewTemperate"+DesertType.toString());
        }
        this.AddOrbit(x,y,z,DesertName,true);
    }

    AddSnow(x: number, y: number, z: number, SnowName: string, SnowType: number, IsOldType: boolean) {
        if (IsOldType == true) {
            this.AddPlayfield(x,y,z,SnowName,"Temperate"+SnowType.toString());
        } else {
            this.AddPlayfield(x,y,z,SnowName,"NewTemperate"+SnowType.toString());
        }
        this.AddOrbit(x,y,z,SnowName,true);
    }

    AddAlien(x: number, y: number, z: number, AlienName: string, AlienType: number, IsOldType: boolean) {
        if (IsOldType == true) {
            this.AddPlayfield(x,y,z,AlienName,"Temperate"+AlienType.toString());
        } else {
            this.AddPlayfield(x,y,z,AlienName,"NewTemperate"+AlienType.toString());
        }
        this.AddOrbit(x,y,z,AlienName,true);
    }

    AddPlanet(x: number, y: number, z: number, PlanetName: string, PlanetType:PlanetTypes, TypeNumber:number, OldType: boolean) {
        
        switch (PlanetType) {
            case PlanetTypes.TYPE_EARTH:
                this.AddEarth(x,y,z,PlanetName,TypeNumber,OldType);
                break;
            case PlanetTypes.TYPE_SAND:
                this.AddDesert(x,y,z,PlanetName,TypeNumber,OldType);
                break;
            case PlanetTypes.TYPE_ICE:
                this.AddSnow(x,y,z,PlanetName,TypeNumber,OldType);
                break;
            case PlanetTypes.TYPE_LAVA:
                this.AddLava(x,y,z,PlanetName,TypeNumber,OldType);
                break;
            case PlanetTypes.TYPE_ALIEN:
                this.AddAlien(x,y,z,PlanetName,TypeNumber,OldType);
                break;
        
            default:
                break;
        }
    }




    AddAsteroidField(x: number, y: number, z: number, AsteroidFieldname: string) {
        this.AddPlayfield(x,y,z,AsteroidFieldname,"SpaceAsteroidField");
    }

    AddDeny(DenyObject: string) {
        this.Deny.push(DenyObject);
    }

    GenerateString():string {
        let t_str:string = "- Coordinates: [" + this.Coordinate.GenerateString() + "]" + this.nl;
        t_str += "  Color: " + this.Color.GenerateString()  + this.nl;
        t_str += "  Icon: " + this.Icon + this.nl;
        if (this.OrbitLine == true) {
            t_str += "  OrbitLine: True" + this.nl;
        }
        t_str += "  Deny: [" + this.Deny.toString() + "]" + this.nl;
        t_str += "  Playfields:" + this.nl;

        // Loop through all playfields
        this.Playfields.forEach(element => {
            t_str += "  " + element.GenerateString() + this.nl;
        });
        return t_str;
    }

}
