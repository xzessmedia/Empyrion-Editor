import { Component, OnInit } from '@angular/core';
import { SpaceSector } from '.././space-sector';
import { SpaceColor } from '.././space-color';

@Component({
  selector: 'app-map-generator',
  templateUrl: './map-generator.component.html',
  styleUrls: ['./map-generator.component.scss']
})
export class MapGeneratorComponent implements OnInit {
  public generator:SpaceSector;
  public generatedMap: string;
  public compiledMap: string;
  public maxNodes: number;
  public maxPlayfields: number;
  public maxRandomX:number;
  public maxRandomY:number;
  public maxRandomZ:number;
  constructor() {
    this.generator = new SpaceSector();
    this.maxNodes = 10;
    this.maxPlayfields = 5;
    this.maxRandomX = 255;
    this.maxRandomY = 255;
    this.maxRandomZ = 255;
   }

  GenerateMap() {
    this.generator.GenerateRandomMap(this.maxNodes,this.maxPlayfields,this.maxRandomX,this.maxRandomY,this.maxRandomZ);
  }

  GenerateOutput() {
    this.generatedMap = this.generator.GenerateMapOutput();
  }

  DownloadOutput() {
    this.compiledMap = this.generator.GenerateDownloadMap();

    let blob:Blob = new Blob([this.compiledMap], { type: 'text/plain' }),
    url = window.URL;
    let fileUrl = url.createObjectURL(blob);
  }

  ngOnInit() {
  }

}
