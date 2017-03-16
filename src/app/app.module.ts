import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GalerieComponent } from './galerie/galerie.component';
import { AuteurComponent } from './auteur/auteur.component';
import { TerreComponent } from './terre/terre.component';

@NgModule({
  declarations: [
    AppComponent,
    GalerieComponent,
    AuteurComponent,
    TerreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
