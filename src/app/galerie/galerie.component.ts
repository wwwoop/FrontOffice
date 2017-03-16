import { Component, OnInit, OnChanges, Input, Output, EventEmitter, style } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'obj-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css']
})
export class GalerieComponent implements OnInit, OnChanges {
  //Paramètres d'entrée
  @Input('initX') x: string;
  @Input('initY') y: string;
  @Input('auteur') auteur: string;
  @Input('numGalerie') id: number;

  //Paramètres de sortie
  @Output() auteurVisible = new EventEmitter();

  //Variables
  @Input('height') height: string;
  @Input('width') width: string;
  @Input('photos') photos: Array<{x: number, y: number, url: string}> = [];
  estReduit: boolean;
  @Input('xFleche') xFleche: number;
  @Input('yFleche') yFleche: number;
  @Input('change') detectChange: number;
  urlFleche: string;

  //Test
  url: any;

  //Pour la visibilité
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  flecheVisible: boolean;

  //Pour obtenir les dataURLs
  private httpRequest: Http;
  mapURL: Array<{any}> = [];
  mapId: Array<{any}> = [];
  initier: boolean;

  constructor(private http: Http) {
    this.httpRequest = http;
  }

  ngOnInit() {
    this.estReduit = true;
    this.flecheVisible = true;
    this.initier = true;

    //On initialise le MAP
    let j: number;
    for (j=0; j < this.photos.length; j++) {
      this.mapURL[this.photos[j].url] = " ";
      this.mapId[this.photos[j].url] = j;
    }

    this.actualiseMap();

    //console.log(this.mapURL.get(this.photos[0].url));

    //Determiner l'url de la fleche
    if (this.xFleche > 0 && this.yFleche < 0) {
      this.urlFleche = "Fleches/fleche3.svg";
    }

    if (this.xFleche > 0 && this.yFleche > 0) {
      this.urlFleche = "Fleches/fleche2.svg";
    }

    if (this.xFleche < 0 && this.yFleche > 0) {
      this.urlFleche = "Fleches/fleche1.svg";
    }

    if (this.xFleche < 0 && this.yFleche < 0) {
      this.urlFleche = "Fleches/fleche4.svg";
    }

    if (this.xFleche == 0 && this.yFleche == 0) {
      this.flecheVisible = false;
    }

    //On détermine xMin, xMax, ...
    this.xMin = 0;
    this.xMax = 0;
    this.yMin = 0;
    this.yMax = 0;

    let i: number;
    for (i=0; i < this.photos.length; i++) {
      if (this.photos[i].x > this.xMax) {
        this.xMax = this.photos[i].x;
      }

      if (this.photos[i].x < this.xMin) {
        this.xMax = this.photos[i].x;
      }

      if (this.photos[i].y > this.yMax) {
        this.yMax = this.photos[i].y;
      }

      if (this.photos[i].y < this.yMin) {
        this.yMax = this.photos[i].y;
      }
    }

    /*this.httpRequest.get('http://137.74.114.220/api/images/Mathieu_Perrais_3.jpg').subscribe(function(res) {
      self.url = res.json().data.dataUrl;
    });*/
    this.url = "apiGal/0/test.jpg";
  }

  //Si il y a du changement
  ngOnChanges() {
    if (this.initier) {
      this.retourneAuteur();
    }
    
    this.actualiseMap();
  }

  //On détermine la visibilité pour savoir si on retourne le nom de l'auteur
  estVisible(): boolean {
    try {

      //Décalage
      let decalTop: number = 0;
      let decalBottom: number = 0;
      let decalLeft: number = 0;
      let decalRight: number = 0;

      if (!this.estReduit) {
        decalTop = -this.yMin * (parseInt(this.height) + 5);
        decalBottom = -this.yMax * (parseInt(this.height) + 5);
        decalLeft = this.xMin * (parseInt(this.width) + 5);
        decalRight = this.xMax * (parseInt(this.width) + 5);
      }

      //Position absolue de l'objet "Galerie"
      let top: number = parseInt(this.y) + decalTop;
      let bottom: number = top + parseInt(this.height) + decalBottom ;
      let left: number = parseInt(this.x) + decalLeft;
      let right: number = left + parseInt(this.width) + decalRight;


      //Position absolue de la fenêtre
      let pageTop: number = window.pageYOffset;
      let pageBottom: number = pageTop + window.innerHeight;
      let pageLeft: number = window.pageXOffset;
      let pageRight: number = pageLeft + window.innerWidth;

      //On retourne le resultat

      //Si l'image est visible
      if (pageLeft <= right && left <= pageRight && pageTop <= bottom && top <= pageBottom) {
        return true;
      }

      else {
        return false;
      }
    }

    catch (e) {
      return false;
    }
  }

  //Retourne le nom de l'auteur si la galerie est visible
  retourneAuteur(): void {
    if (this.estVisible()) {
      this.auteurVisible.emit(this.auteur);
    }

    else {
      this.auteurVisible.emit("");
    }
  }

  //On change la hauteur de l'objet s'il est déplié
  zIndex() : number {
    if (this.estReduit) {
      return 0;
    }

    else {
      return 1;
    }
  }

  //Position de l'image d'indice i (haut)
  posTop(i: number) : string {
    if (this.estReduit) {
      return (5*i) + "px";
    }

    else {
      return (-this.photos[i].y * (parseInt(this.height)+5)) + "px";
    }
  }

  //Position de l'image d'indice i (gauche)
  posLeft(i: number) : string {
    if (this.estReduit) {
      return (5*i) + "px";
    }

    else {
      return (this.photos[i].x * (parseInt(this.width)+5)) + "px";
    }
  }

  //Position de la flèche (haut)
  flecheTop(): string {
    //Si c'est réduit
    if (this.estReduit) {
      //Si xFleche est position, il y aura un décalage
      let decalage: number = 0;

      if (this.xFleche > 0) {
        decalage = this.photos.length * 5;
      }

      if (this.yFleche > 0) {
        return (-30 + decalage) + "px";
      }

      else {
        return (parseInt(this.height) + decalage) + "px";
      }
    }

    //Si c'est déployé
    else {
      if (this.yFleche > 0) {
        return (-this.yFleche * (parseInt(this.height)+5) + parseInt(this.height)) + "px";
      }

      else {
        return (-this.yFleche * (parseInt(this.height)+5) + 30) + "px";
      }
    }
  }

  //Position de la flèche (gauche)
  flecheLeft(): string {
    //Si c'est réduit
    if (this.estReduit) {
      if (this.xFleche > 0) {
        return (parseInt(this.width) + (this.photos.length * 5) - 5) + "px";
      }

      else {
        return "-30px";
      }
    }

    //Si c'est déployé
    else {
      if (this.xFleche > 0) {
        return (this.xFleche * (parseInt(this.width)+5) + 30) + "px";
      }

      else {
        return (this.xFleche * (parseInt(this.width)+5) + parseInt(this.width)) + "px";
      }

    }
  }

  //Est executé lorsque l'on appui sur la flèche
  deploy(): void {
    this.estReduit = !this.estReduit;
  }

  //Détermine l'angle de la flèhe
  rotation(): string {
    if (this.estReduit) {
      return "rotate(0deg)";
    }

    else {
      return "rotate(180deg)";
    }
  }

  //Retourner l'URL si c'est visible
  getOpacity(): number {
    if(this.estVisible()) {
      return 1;
    }

    else {
      return 0;
    }
  }

  actualiseMap(): void {
    let i;

    //Si c'est visible on obtient les dataURLS
    if (this.estVisible() || !this.estReduit) {
      for (i=0; i < this.photos.length; i++) {

        //On ne télécharge que si nécéessaire
        if (this.mapURL[this.photos[i].url] == "") {

          //On copie l'url
          console.log(this.photos[i].url);

          //On fait une requete
          this.requete(this.photos[i].url);
        }

      }
    }

    //Si ce n'est pas visible, on supprime les photos
    else {

      for (i=0; i < this.photos.length; i++) {
        this.mapURL[this.photos[i].url] = "";
      }

    }
  }

  requete(url: string) {
    let self = this;

    this.httpRequest.get(url).subscribe(function(res) { 
      console.log(url);
      self.mapURL[url] = res.json().data.dataUrl;
    });
  }

  returnData(url: string): string {
    return this.mapURL[url];
  }

}
