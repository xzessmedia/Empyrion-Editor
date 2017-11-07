import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule,MatInputModule,MatButtonModule, MatExpansionModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { MapGeneratorComponent } from './map-generator/map-generator.component';
import { NewlinePipe } from './newline.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MapGeneratorComponent,
    NewlinePipe
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
