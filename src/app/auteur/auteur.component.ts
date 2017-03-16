import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'obj-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: ['./auteur.component.css']
})
export class AuteurComponent implements OnInit {
  //Paramètres d'entrée
  @Input('x') x: string;
  @Input('y') y: string;
  @Input('nom') nom: string;
  @Input('titre') titre: string;
  @Input('description') description: string;
  @Input('num') num: number;

  //Paramètres de sortie
  @Output() auteurVisible = new EventEmitter();

  //Le cadre du nom de l'auteur doit avoir un identifiant pour récuperer ses dimensions
  idAut: string;
  idDesc: string;

  constructor() { }

  ngOnInit() {
    this.idAut = "aut" + this.num;
    this.idDesc = "desc" + this.num;
  }

  topDesc(): string {
    var hauteur: number = document.getElementById(this.idAut).offsetHeight;
    return (hauteur/2) + "px";
  }

  leftDesc(): string {
    var largeur: number = document.getElementById(this.idAut).offsetWidth;
    return (largeur + 60) + "px";
  }

  estVisible(): boolean {
    //Position absolue de l'objet "Auteur"
    let top: number = parseInt(this.y);
    let bottom: number = top + document.getElementById(this.idDesc).offsetHeight + document.getElementById(this.idAut).offsetHeight/2;
    let left: number = parseInt(this.x);
    let right: number = left + document.getElementById(this.idAut).offsetWidth + 60 + 250;

    //Position absolue de la fenêtre
    let pageTop: number = window.pageYOffset;
    let pageBottom: number = pageTop + window.innerHeight;
    let pageLeft: number = window.pageXOffset;
    let pageRight: number = pageLeft + window.innerWidth;

    //On retourne le résultat

    //Si l'image est visible
    if (pageLeft <= right && left <= pageRight && pageTop <= bottom && top <= pageBottom) {
      return true;
    }
    else {
      return false;
    }
  }

  //Retourne le nom de l'auteur si la galerie est visible
  retourneAuteur(): void {
    if (this.estVisible()) {
      this.auteurVisible.emit(this.nom);
    }

    else {
      this.auteurVisible.emit("");
    }
  }

}
