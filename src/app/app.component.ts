import { Component } from '@angular/core';
import { Http } from '@angular/http';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nbGal: number;
  infoGaleries: Array<{x: string, y: string, auteur: string}>;
  infoAuteurs: Array<{x: string, y: string, nom: string, titre: string, description: string}>;
  infoPlanetes: Array<{x: string, y: string, id: number}>;
  infoDescriptionGalerie: Array<{_id: string, width: string, height: string, photos: Array<{x: string, y: string, url: string}>, xFleche: number, yFleche: number}>;
  auteurPrincipal: string;
  auteurs: Array<string> = [];

  //Information Logo
  opacityLogo: number;
  topLogo: string;
  dimLogo: string;

  //Information liste auteurs
  listeCache: boolean;

  //Détection de fin de scroll
  timer: any;
  detectChange: number;

  constructor(private http: Http) {
    let self = this;

    this.nbGal = 0;
    this.auteurPrincipal = "...";
    this.opacityLogo = 0;
    this.topLogo = "-590px";
    this.dimLogo = "0%";
    this.listeCache = true;
    this.detectChange = 0;

    //On initialise les tableaux;
    this.infoAuteurs = [];
    this.infoPlanetes = [];
    this.infoGaleries = [];
    this.infoDescriptionGalerie = [];

    //Les galeries
    this.http.get('http://137.74.114.220:3000/api/piles/').subscribe(function(res) {
      self.infoGaleries = res.json().data[0].piles;
      self.nbGal = self.infoGaleries.length;
      self.correction();
    });

    // Les descriptions d'auteurs
    this.http.get('http://137.74.114.220:3000/api/auteurs/').subscribe(function(res) {
      self.infoAuteurs = res.json().data[0].auteurs;
    });

    // Les liens planetes
    this.http.get('http://137.74.114.220:3000/api/planete/').subscribe(function(res) {
      self.infoPlanetes = res.json().data[0].planetes;
    });

    // Les descriptions des galeries
    this.http.get('http://137.74.114.220:3000/api/galeries/').subscribe(function(res) {
      self.infoDescriptionGalerie = res.json().data;
      self.correction();
    });

    document.addEventListener('scroll', function() {
      clearTimeout(self.timer);
      self.timer = setTimeout(function() { self.detectChange = (self.detectChange + 1) % 2}, 500);
    });
  }

  correction(): void {
    if (this.nbGal > 0 && this.infoDescriptionGalerie.length > 0) {

      // Les tableaux doivent faire la même taille
      while (this.nbGal > this.infoDescriptionGalerie.length) {
        this.infoGaleries.pop();
        this.nbGal--;
      }

      while (this.infoDescriptionGalerie.length > this.nbGal) {
        this.infoDescriptionGalerie.pop();
      }
    }
  }

  afficherGaleries(): boolean {
    return (this.nbGal == this.infoDescriptionGalerie.length);
  }

  getPx(val: string): string {
    return val + "px";
  }

  afficheAuteur(i: number, auteur: string): void {
    this.auteurs[i] = auteur;
    const tabFrequence = new Map;
    let value;

    //On cherche l'auteur le plus représenter, on crée donc un objet qui indique la fréquence de chaque auteur
    for (i = 0; i < this.auteurs.length; i++){
      //On initialise la valeur s'il le faut
      if (!tabFrequence.has(this.auteurs[i])) {
        tabFrequence.set(this.auteurs[i], 0);
      }

      //On incrémente
      tabFrequence.set(this.auteurs[i], tabFrequence.get(this.auteurs[i]) + 1);
    }

    //On trouve le maximum
    tabFrequence.set("", 0);
    this.auteurPrincipal = "";

    let mapIter = tabFrequence.entries();
    value = mapIter.next().value;

    while (value != undefined) {
      if (tabFrequence.get(this.auteurPrincipal) < value[1]) {
        this.auteurPrincipal = value[0];
      }

      value = mapIter.next().value;
    }

    if (this.auteurPrincipal == "") {
      this.auteurPrincipal = "...";
    }
  }

  positionCurseurVertical(): string {
    //On calcul la largeur moyenne de la vue
    let vueAbscisse: number = window.pageXOffset + window.innerWidth/2;
    let largeur: number = document.body.scrollWidth;

    //On retourne le résultat
    return (vueAbscisse/largeur * 100) + "%";
  }

  positionCurseurHorizontal(): string {
    //On calcul la hauteur moyenne de la vue
    let vueOrdonnee: number = window.pageYOffset + window.innerHeight/2;
    let hauteur: number = document.body.scrollHeight;

    //On retourne le résultat
    return (vueOrdonnee/hauteur * 100) + "%";
  }

  changeOpacity(): void {
    if (this.opacityLogo == 1) {
      this.opacityLogo = 0;
    }

    else {
      this.opacityLogo = 1;
      this.topLogo = "0%";
      this.dimLogo = "100%";
    }
  }

  masquerLogo(): void {
    if (this.opacityLogo == 0) {
      this.topLogo = "-590px";
      this.dimLogo = "0%";
    }
  }

  getIdAuteur(i: number): string {
    return "#aut" + i;
  }

  afficherListe(): void {
    this.listeCache = !this.listeCache;
  }

  decalageListeAuteurs(): string {
    if (this.listeCache) {
      return "translateY(0%)";
    }

    else {
      return "translateY(-100%)";
    }
  }

  scrollToElement(id: string): void {
    var $root = $('html, body');
    $root.animate({
      scrollTop: ($(id).offset().top - window.innerHeight/2 + $(id).width()/2),
      scrollLeft: ($(id).offset().left - window.innerWidth/2 + $(id).width()/2)}, 1000);
  }

}
