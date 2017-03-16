webpackJsonp([0,3],{

/***/ 343:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 343;


/***/ },

/***/ 344:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(451);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_37" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/Arnaud/Documents/Scolaire/Mines/Woop/FrontOffice/wwwoop/src/main.js.map

/***/ },

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(188);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.auteurs = [];
        var self = this;
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
        this.http.get('http://localhost:3000/api/piles/').subscribe(function (res) {
            self.infoGaleries = res.json().data[0].piles;
            self.nbGal = self.infoGaleries.length;
            self.correction();
        });
        // Les descriptions d'auteurs
        this.http.get('http://localhost:3000/api/auteurs/').subscribe(function (res) {
            self.infoAuteurs = res.json().data[0].auteurs;
        });
        // Les liens planetes
        this.http.get('http://localhost:3000/api/planete/').subscribe(function (res) {
            self.infoPlanetes = res.json().data[0].planetes;
        });
        // Les descriptions des galeries
        this.http.get('http://localhost:3000/api/galeries/').subscribe(function (res) {
            self.infoDescriptionGalerie = res.json().data;
            self.correction();
        });
        document.addEventListener('scroll', function () {
            clearTimeout(self.timer);
            self.timer = setTimeout(function () { self.detectChange = (self.detectChange + 1) % 2; }, 500);
        });
    }
    AppComponent.prototype.correction = function () {
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
    };
    AppComponent.prototype.afficherGaleries = function () {
        return (this.nbGal == this.infoDescriptionGalerie.length);
    };
    AppComponent.prototype.getPx = function (val) {
        return val + "px";
    };
    AppComponent.prototype.afficheAuteur = function (i, auteur) {
        this.auteurs[i] = auteur;
        var tabFrequence = new Map;
        var value;
        //On cherche l'auteur le plus représenter, on crée donc un objet qui indique la fréquence de chaque auteur
        for (i = 0; i < this.auteurs.length; i++) {
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
        var mapIter = tabFrequence.entries();
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
    };
    AppComponent.prototype.positionCurseurVertical = function () {
        //On calcul la largeur moyenne de la vue
        var vueAbscisse = window.pageXOffset + window.innerWidth / 2;
        var largeur = document.body.scrollWidth;
        //On retourne le résultat
        return (vueAbscisse / largeur * 100) + "%";
    };
    AppComponent.prototype.positionCurseurHorizontal = function () {
        //On calcul la hauteur moyenne de la vue
        var vueOrdonnee = window.pageYOffset + window.innerHeight / 2;
        var hauteur = document.body.scrollHeight;
        //On retourne le résultat
        return (vueOrdonnee / hauteur * 100) + "%";
    };
    AppComponent.prototype.changeOpacity = function () {
        if (this.opacityLogo == 1) {
            this.opacityLogo = 0;
        }
        else {
            this.opacityLogo = 1;
            this.topLogo = "0%";
            this.dimLogo = "100%";
        }
    };
    AppComponent.prototype.masquerLogo = function () {
        if (this.opacityLogo == 0) {
            this.topLogo = "-590px";
            this.dimLogo = "0%";
        }
    };
    AppComponent.prototype.getIdAuteur = function (i) {
        return "#aut" + i;
    };
    AppComponent.prototype.afficherListe = function () {
        this.listeCache = !this.listeCache;
    };
    AppComponent.prototype.decalageListeAuteurs = function () {
        if (this.listeCache) {
            return "translateY(0%)";
        }
        else {
            return "translateY(-100%)";
        }
    };
    AppComponent.prototype.scrollToElement = function (id) {
        var $root = $('html, body');
        $root.animate({
            scrollTop: ($(id).offset().top - window.innerHeight / 2 + $(id).width() / 2),
            scrollLeft: ($(id).offset().left - window.innerWidth / 2 + $(id).width() / 2) }, 1000);
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(613),
            styles: [__webpack_require__(609)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Arnaud/Documents/Scolaire/Mines/Woop/FrontOffice/wwwoop/src/app.component.js.map

/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__galerie_galerie_component__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auteur_auteur_component__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__terre_terre_component__ = __webpack_require__(454);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__galerie_galerie_component__["a" /* GalerieComponent */],
                __WEBPACK_IMPORTED_MODULE_6__auteur_auteur_component__["a" /* AuteurComponent */],
                __WEBPACK_IMPORTED_MODULE_7__terre_terre_component__["a" /* TerreComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/Arnaud/Documents/Scolaire/Mines/Woop/FrontOffice/wwwoop/src/app.module.js.map

/***/ },

/***/ 452:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AuteurComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuteurComponent = (function () {
    function AuteurComponent() {
        //Paramètres de sortie
        this.auteurVisible = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* EventEmitter */]();
    }
    AuteurComponent.prototype.ngOnInit = function () {
        this.idAut = "aut" + this.num;
        this.idDesc = "desc" + this.num;
    };
    AuteurComponent.prototype.topDesc = function () {
        var hauteur = document.getElementById(this.idAut).offsetHeight;
        return (hauteur / 2) + "px";
    };
    AuteurComponent.prototype.leftDesc = function () {
        var largeur = document.getElementById(this.idAut).offsetWidth;
        return (largeur + 60) + "px";
    };
    AuteurComponent.prototype.estVisible = function () {
        //Position absolue de l'objet "Auteur"
        var top = parseInt(this.y);
        var bottom = top + document.getElementById(this.idDesc).offsetHeight + document.getElementById(this.idAut).offsetHeight / 2;
        var left = parseInt(this.x);
        var right = left + document.getElementById(this.idAut).offsetWidth + 60 + 250;
        //Position absolue de la fenêtre
        var pageTop = window.pageYOffset;
        var pageBottom = pageTop + window.innerHeight;
        var pageLeft = window.pageXOffset;
        var pageRight = pageLeft + window.innerWidth;
        //On retourne le résultat
        //Si l'image est visible
        if (pageLeft <= right && left <= pageRight && pageTop <= bottom && top <= pageBottom) {
            return true;
        }
        else {
            return false;
        }
    };
    //Retourne le nom de l'auteur si la galerie est visible
    AuteurComponent.prototype.retourneAuteur = function () {
        if (this.estVisible()) {
            this.auteurVisible.emit(this.nom);
        }
        else {
            this.auteurVisible.emit("");
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('x'), 
        __metadata('design:type', String)
    ], AuteurComponent.prototype, "x", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('y'), 
        __metadata('design:type', String)
    ], AuteurComponent.prototype, "y", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('nom'), 
        __metadata('design:type', String)
    ], AuteurComponent.prototype, "nom", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('titre'), 
        __metadata('design:type', String)
    ], AuteurComponent.prototype, "titre", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('description'), 
        __metadata('design:type', String)
    ], AuteurComponent.prototype, "description", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('num'), 
        __metadata('design:type', Number)
    ], AuteurComponent.prototype, "num", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Output */])(), 
        __metadata('design:type', Object)
    ], AuteurComponent.prototype, "auteurVisible", void 0);
    AuteurComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'obj-auteur',
            template: __webpack_require__(614),
            styles: [__webpack_require__(610)]
        }), 
        __metadata('design:paramtypes', [])
    ], AuteurComponent);
    return AuteurComponent;
}());
//# sourceMappingURL=C:/Users/Arnaud/Documents/Scolaire/Mines/Woop/FrontOffice/wwwoop/src/auteur.component.js.map

/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(188);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GalerieComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GalerieComponent = (function () {
    function GalerieComponent(http) {
        this.http = http;
        //Paramètres de sortie
        this.auteurVisible = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* EventEmitter */]();
        this.photos = [];
        this.mapURL = [];
        this.mapId = [];
        this.httpRequest = http;
    }
    GalerieComponent.prototype.ngOnInit = function () {
        this.estReduit = true;
        this.flecheVisible = true;
        this.initier = true;
        //On initialise le MAP
        var j;
        for (j = 0; j < this.photos.length; j++) {
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
        var i;
        for (i = 0; i < this.photos.length; i++) {
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
    };
    //Si il y a du changement
    GalerieComponent.prototype.ngOnChanges = function () {
        if (this.initier) {
            this.retourneAuteur();
        }
        this.actualiseMap();
    };
    //On détermine la visibilité pour savoir si on retourne le nom de l'auteur
    GalerieComponent.prototype.estVisible = function () {
        try {
            //Décalage
            var decalTop = 0;
            var decalBottom = 0;
            var decalLeft = 0;
            var decalRight = 0;
            if (!this.estReduit) {
                decalTop = -this.yMin * (parseInt(this.height) + 5);
                decalBottom = -this.yMax * (parseInt(this.height) + 5);
                decalLeft = this.xMin * (parseInt(this.width) + 5);
                decalRight = this.xMax * (parseInt(this.width) + 5);
            }
            //Position absolue de l'objet "Galerie"
            var top = parseInt(this.y) + decalTop;
            var bottom = top + parseInt(this.height) + decalBottom;
            var left = parseInt(this.x) + decalLeft;
            var right = left + parseInt(this.width) + decalRight;
            //Position absolue de la fenêtre
            var pageTop = window.pageYOffset;
            var pageBottom = pageTop + window.innerHeight;
            var pageLeft = window.pageXOffset;
            var pageRight = pageLeft + window.innerWidth;
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
    };
    //Retourne le nom de l'auteur si la galerie est visible
    GalerieComponent.prototype.retourneAuteur = function () {
        if (this.estVisible()) {
            this.auteurVisible.emit(this.auteur);
        }
        else {
            this.auteurVisible.emit("");
        }
    };
    //On change la hauteur de l'objet s'il est déplié
    GalerieComponent.prototype.zIndex = function () {
        if (this.estReduit) {
            return 0;
        }
        else {
            return 1;
        }
    };
    //Position de l'image d'indice i (haut)
    GalerieComponent.prototype.posTop = function (i) {
        if (this.estReduit) {
            return (5 * i) + "px";
        }
        else {
            return (-this.photos[i].y * (parseInt(this.height) + 5)) + "px";
        }
    };
    //Position de l'image d'indice i (gauche)
    GalerieComponent.prototype.posLeft = function (i) {
        if (this.estReduit) {
            return (5 * i) + "px";
        }
        else {
            return (this.photos[i].x * (parseInt(this.width) + 5)) + "px";
        }
    };
    //Position de la flèche (haut)
    GalerieComponent.prototype.flecheTop = function () {
        //Si c'est réduit
        if (this.estReduit) {
            //Si xFleche est position, il y aura un décalage
            var decalage = 0;
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
        else {
            if (this.yFleche > 0) {
                return (-this.yFleche * (parseInt(this.height) + 5) + parseInt(this.height)) + "px";
            }
            else {
                return (-this.yFleche * (parseInt(this.height) + 5) + 30) + "px";
            }
        }
    };
    //Position de la flèche (gauche)
    GalerieComponent.prototype.flecheLeft = function () {
        //Si c'est réduit
        if (this.estReduit) {
            if (this.xFleche > 0) {
                return (parseInt(this.width) + (this.photos.length * 5) - 5) + "px";
            }
            else {
                return "-30px";
            }
        }
        else {
            if (this.xFleche > 0) {
                return (this.xFleche * (parseInt(this.width) + 5) + 30) + "px";
            }
            else {
                return (this.xFleche * (parseInt(this.width) + 5) + parseInt(this.width)) + "px";
            }
        }
    };
    //Est executé lorsque l'on appui sur la flèche
    GalerieComponent.prototype.deploy = function () {
        this.estReduit = !this.estReduit;
    };
    //Détermine l'angle de la flèhe
    GalerieComponent.prototype.rotation = function () {
        if (this.estReduit) {
            return "rotate(0deg)";
        }
        else {
            return "rotate(180deg)";
        }
    };
    //Retourner l'URL si c'est visible
    GalerieComponent.prototype.getOpacity = function () {
        if (this.estVisible()) {
            return 1;
        }
        else {
            return 0;
        }
    };
    GalerieComponent.prototype.actualiseMap = function () {
        var i;
        //Si c'est visible on obtient les dataURLS
        if (this.estVisible() || !this.estReduit) {
            for (i = 0; i < this.photos.length; i++) {
                //On ne télécharge que si nécéessaire
                if (this.mapURL[this.photos[i].url] == "") {
                    //On copie l'url
                    console.log(this.photos[i].url);
                    //On fait une requete
                    this.requete(this.photos[i].url);
                }
            }
        }
        else {
            for (i = 0; i < this.photos.length; i++) {
                this.mapURL[this.photos[i].url] = "";
            }
        }
    };
    GalerieComponent.prototype.requete = function (url) {
        var self = this;
        this.httpRequest.get(url).subscribe(function (res) {
            console.log(url);
            self.mapURL[url] = res.json().data.dataUrl;
        });
    };
    GalerieComponent.prototype.returnData = function (url) {
        return this.mapURL[url];
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('initX'), 
        __metadata('design:type', String)
    ], GalerieComponent.prototype, "x", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('initY'), 
        __metadata('design:type', String)
    ], GalerieComponent.prototype, "y", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('auteur'), 
        __metadata('design:type', String)
    ], GalerieComponent.prototype, "auteur", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('numGalerie'), 
        __metadata('design:type', Number)
    ], GalerieComponent.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Output */])(), 
        __metadata('design:type', Object)
    ], GalerieComponent.prototype, "auteurVisible", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('height'), 
        __metadata('design:type', String)
    ], GalerieComponent.prototype, "height", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('width'), 
        __metadata('design:type', String)
    ], GalerieComponent.prototype, "width", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('photos'), 
        __metadata('design:type', Object)
    ], GalerieComponent.prototype, "photos", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('xFleche'), 
        __metadata('design:type', Number)
    ], GalerieComponent.prototype, "xFleche", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('yFleche'), 
        __metadata('design:type', Number)
    ], GalerieComponent.prototype, "yFleche", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('change'), 
        __metadata('design:type', Number)
    ], GalerieComponent.prototype, "detectChange", void 0);
    GalerieComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'obj-galerie',
            template: __webpack_require__(615),
            styles: [__webpack_require__(611)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === 'function' && _a) || Object])
    ], GalerieComponent);
    return GalerieComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Arnaud/Documents/Scolaire/Mines/Woop/FrontOffice/wwwoop/src/galerie.component.js.map

/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TerreComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TerreComponent = (function () {
    function TerreComponent() {
    }
    TerreComponent.prototype.ngOnInit = function () {
    };
    TerreComponent.prototype.scrollToElement = function () {
        var $root = $('html, body');
        $root.animate({
            scrollTop: ($("#aut" + this.autId).offset().top - window.innerHeight / 2 + $("#aut" + this.autId).width() / 2),
            scrollLeft: ($("#aut" + this.autId).offset().left - window.innerWidth / 2 + $("#aut" + this.autId).width() / 2) }, 1000);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('x'), 
        __metadata('design:type', String)
    ], TerreComponent.prototype, "x", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('y'), 
        __metadata('design:type', String)
    ], TerreComponent.prototype, "y", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('autId'), 
        __metadata('design:type', Number)
    ], TerreComponent.prototype, "autId", void 0);
    TerreComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'obj-terre',
            template: __webpack_require__(616),
            styles: [__webpack_require__(612)]
        }), 
        __metadata('design:paramtypes', [])
    ], TerreComponent);
    return TerreComponent;
}());
//# sourceMappingURL=C:/Users/Arnaud/Documents/Scolaire/Mines/Woop/FrontOffice/wwwoop/src/terre.component.js.map

/***/ },

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/Arnaud/Documents/Scolaire/Mines/Woop/FrontOffice/wwwoop/src/environment.js.map

/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=C:/Users/Arnaud/Documents/Scolaire/Mines/Woop/FrontOffice/wwwoop/src/polyfills.js.map

/***/ },

/***/ 609:
/***/ function(module, exports) {

module.exports = "* {\r\n  box-sizing: border-box;\r\n}\r\n\r\na {\r\n  cursor: pointer;\r\n}\r\n\r\n.auteurPrincipal {\r\n  position: fixed;\r\n  top: 10px;\r\n  left: 10px;\r\n  padding: 3px;\r\n  background-color: white;\r\n  -webkit-text-decoration-color: black;\r\n          text-decoration-color: black;\r\n  font-family: \"Aileron\", \"Arial Bold\", Gadget, sans-serif;\r\n  font-weight: bold;\r\n  border: 2px solid black;\r\n  min-width: 100px;\r\n  text-align: center;\r\n  z-index: 2;\r\n}\r\n\r\n/* CSS repère */\r\n.curseurV {\r\n  position: fixed;\r\n  width: 1px;\r\n  height: 100%;\r\n  background-color: black;\r\n  z-index: -2;\r\n}\r\n\r\n.curseurH {\r\n  position: fixed;\r\n  width: 100%;\r\n  height: 1px;\r\n  background-color: black;\r\n  z-index: -2;\r\n}\r\n\r\n.intersection {\r\n  position: fixed;\r\n  height: 10px;\r\n  width: 10px;\r\n  background-color: rgb(255, 77, 0);\r\n  border-radius: 5px;\r\n  -webkit-transform: translateX(-50%) translateY(-50%);\r\n          transform: translateX(-50%) translateY(-50%);\r\n  z-index: -2;\r\n}\r\n\r\n/* CSS logo */\r\n.conteneur {\r\n  position: fixed;\r\n  -webkit-transition: opacity 1s;\r\n  transition: opacity 1s;\r\n  z-index: 3;\r\n}\r\n\r\n#logo {\r\n  position: relative;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translateX(-50%) translateY(-50%);\r\n          transform: translateX(-50%) translateY(-50%);\r\n}\r\n\r\n/* CSS Apparition logo */\r\n#boutonLogo {\r\n  cursor: pointer;\r\n  position: fixed;\r\n  top: 0px;\r\n  left: 100%;\r\n  height: 30px;\r\n  width: 50px;\r\n  -webkit-transform: translateX(-100%);\r\n          transform: translateX(-100%);\r\n  z-index: 3;\r\n}\r\n\r\n#boutonLogo img {\r\n  position: relative;\r\n  top: -20px;\r\n  left: +5px;\r\n}\r\n\r\n/* CSS Apparition liste */\r\n#boutonListe {\r\n  cursor: pointer;\r\n  position: fixed;\r\n  top: 100%;\r\n  left: 0%;\r\n  height: 30px;\r\n  width: 50px;\r\n  -webkit-transform: translateY(-100%);\r\n          transform: translateY(-100%);\r\n  z-index: 3;\r\n}\r\n\r\n#boutonListe img {\r\n  position: relative;\r\n  top: -10px;\r\n  left: 10px;\r\n}\r\n\r\n/* CSS Liste Auteurs */\r\n.listeAuteur {\r\n  position: fixed;\r\n  top: 100%;\r\n  left: 0%;\r\n  background-color: black;\r\n  padding: 5px;\r\n  z-index: 4;\r\n  -webkit-transition: 1s;\r\n  transition: 1s;\r\n}\r\n\r\n.listeAuteur li {\r\n  margin: 5px;\r\n}\r\n\r\n.listeAuteur a {\r\n  text-decoration: none;\r\n  color: white;\r\n  font-family: \"Aileron\", \"Arial Bold\", Gadget, sans-serif;\r\n  -webkit-transition: .5s;\r\n  transition: .5s;\r\n}\r\n\r\n.listeAuteur a:hover {\r\n  color: gray;\r\n  -webkit-transition: .5s;\r\n  transition: .5s;\r\n}\r\n\r\n/* CSS bouton catalogue */\r\n#download {\r\n  position: fixed;\r\n  top: 100%;\r\n  left: 100%;\r\n  -webkit-transform: translateX(-130%) translateY(-85%);\r\n          transform: translateX(-130%) translateY(-85%);\r\n}\r\n"

/***/ },

/***/ 610:
/***/ function(module, exports) {

module.exports = ":host {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.nom {\r\n  font-family: \"Aileron Heavy\", \"Arial Bold\", Gadget, sans-serif;\r\n  padding: 2px;\r\n  font-weight: bold;\r\n  font-size: 37px;\r\n  border: 1px solid black;\r\n  width: auto;\r\n  float: left;\r\n  white-space: nowrap;\r\n\r\n}\r\n\r\n.Auteur {\r\n  position: absolute;\r\n  background-color: rgba(255, 255, 255, 0.7);\r\n  z-index: -1;\r\n}\r\n\r\n.titre {\r\n  padding: none;\r\n  font-weight: bold;\r\n  font-size: 15px;\r\n  font-family: \"Aileron Black\", \"Arial Bold\", Gadget, sans-serif;\r\n  z-index: -1;\r\n}\r\n\r\n.desc {\r\n  width: 250px;\r\n  position: absolute;\r\n  background-color: rgba(255, 255, 255, 0.7);\r\n  font-size: 12px;\r\n  font-family: \"Aileron\", \"Arial Bold\", Gadget, sans-serif;\r\n  line-height: 1.5;\r\n  font-weight: 400;\r\n  z-index: -1;\r\n}\r\n"

/***/ },

/***/ 611:
/***/ function(module, exports) {

module.exports = ":host {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.Galerie {\r\n\tposition: absolute;\r\n}\r\n\r\n.cadreOpacity {\r\n  -webkit-transition: 1s;\r\n  transition: 1s;\r\n}\r\n\r\n.fleche {\r\n\t-webkit-transition: 1s;\r\n\ttransition: 1s;\r\n\tposition: absolute;\r\n\tborder: none;\r\n\tbackground: none;\r\n\t-webkit-transform-origin: center;\r\n\t        transform-origin: center;\r\n\t-webkit-box-align: center;\r\n\t    -ms-flex-align: center;\r\n\t        align-items: center;\r\n}\r\n\r\n.fleche img {\r\n\tbackground: none;\r\n\tborder: none;\r\n  cursor: pointer;\r\n}\r\n\r\nimg {\r\n\tposition: absolute;\r\n\t-webkit-transition: 1s ease;\r\n\ttransition: 1s ease;\r\n\tbackground-color: white;\r\n\tborder: 1px solid black;\r\n  background-image: url(\"load.gif\");\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n"

/***/ },

/***/ 612:
/***/ function(module, exports) {

module.exports = "a {\r\n  cursor: pointer;\r\n}\r\n\r\n.divNavigation {\r\n  position: absolute;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  text-decoration: none;\r\n  color: black;\r\n  font-style: italic;\r\n  font-size: 0.7em;\r\n  z-index: -3;\r\n}\r\n"

/***/ },

/***/ 613:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"nbGal == 0\">\n  <div class=\"loading\">\n    <img src=\"load.gif\" alt=\"Chargement en cours\"/>\n  </div>\n</div>\n\n<div *ngIf=\"nbGal > 0\">\n  <!-- On affiche le nom de l'auteur principal -->\n  <p class=\"auteurPrincipal\">\n    {{ auteurPrincipal }}\n  </p>\n\n\n\n  <!-- On affiche le curseur vertical -->\n  <div class=\"curseurV\" [style.left]=\"positionCurseurVertical()\"></div>\n\n  <!-- On affiche le curseur horizontale -->\n  <div class=\"curseurH\" [style.top]=\"positionCurseurHorizontal()\"></div>\n\n  <!-- On affiche l'intersection des curseurs -->\n  <div class=\"intersection\" [style.left]=\"positionCurseurVertical()\" [style.top]=\"positionCurseurHorizontal()\"></div>\n\n\n\n  <!-- On affiche le logo -->\n  <div class=\"conteneur\" [style.opacity]=\"opacityLogo\" [style.top]=\"topLogo\" [style.height]=\"dimLogo\" [style.width]=\"dimLogo\" (click)=\"changeOpacity()\" (webkitTransitionEnd)=\"masquerLogo()\" (transitionend)=\"masquerLogo()\" (oTransitionEnd)=\"masquerLogo()\">\n    <img id=\"logo\" src=\"logo.gif\" height=\"590px\" width=\"720px\"/>\n  </div>\n  <div id=\"boutonLogo\" (click)=\"changeOpacity()\"><img src=\"Onglets/woop.svg\" height=\"100px\" width=\"100px\"/></div>\n\n\n\n  <!-- Affichage des Galeries -->\n  <div *ngIf=\"afficherGaleries()\">\n    <div *ngFor=\"let galerie of infoGaleries; let i=index\">\n      <obj-galerie [initX]=\"getPx(galerie.x)\" [initY]=\"getPx(galerie.y)\" [auteur]=\"galerie.auteur\" [numGalerie]=\"i\" [height]=\"infoDescriptionGalerie[i].height\" [width]=\"infoDescriptionGalerie[i].width\" [photos]=\"infoDescriptionGalerie[i].photos\" [xFleche]=\"infoDescriptionGalerie[i].xFleche\" [yFleche]=\"infoDescriptionGalerie[i].yFleche\" [change]=\"detectChange\" (auteurVisible)=\"afficheAuteur(i, $event)\">\n        <p>Ouverture de la galerie en cours...</p>\n      </obj-galerie>\n    </div>\n  </div>\n\n\n\n  <!-- Affichage des auteurs -->\n  <div *ngFor=\"let auteur of infoAuteurs; let i=index\">\n    <obj-auteur [x]=\"auteur.x\" [y]=\"auteur.y\" [nom]=\"auteur.nom\" [titre]=\"auteur.titre\" [description]=\"auteur.description\" [num]=\"i\" (auteurVisible)=\"afficheAuteur(nbGal + i, $event)\">\n      <p>Chargement des informations de l'auteur...</p>\n    </obj-auteur>\n  </div>\n\n\n\n  <!-- On affiche la liste des auteurs en lien -->\n  <div id=\"boutonListe\" (click)=\"afficherListe()\"><img src=\"Onglets/liste.svg\" height=\"50px\" width=\"50px\"/></div>\n  <ul class=\"listeAuteur\" [style.transform]=\"decalageListeAuteurs()\" (click)=\"afficherListe()\">\n    <li *ngFor=\"let auteur of infoAuteurs; let i=index\"><a (click)=\"scrollToElement(getIdAuteur(i))\">{{ auteur.nom }}</a></li>\n  </ul>\n\n\n\n  <!-- Bouton Catalogue -->\n  <a id=\"download\" href=\"catalogue.pdf\" target=\"_blank\">\n    <img src=\"Onglets/catalogue.svg\" height=\"45px\" width=\"45px\"/>\n  </a>\n\n\n\n  <!-- Ensemble des Terres -->\n  <div *ngFor=\"let planete of infoPlanetes\">\n    <obj-terre [x]=\"planete.x\" [y]=\"planete.y\" [autId]=\"planete.id\"></obj-terre>\n  </div>\n\n</div>\n"

/***/ },

/***/ 614:
/***/ function(module, exports) {

module.exports = "<div class=\"Auteur\" [style.left]=\"x\" [style.top]=\"y\" (window:scroll)=\"retourneAuteur()\" (window:resize)=\"retourneAuteur()\" (window:load)=\"retourneAuteur()\">\n\t<p class=\"nom\" [id]=\"idAut\">{{ nom }}</p>\n\n\t<p class=\"desc\" [style.left]=\"leftDesc()\" [style.top]=\"topDesc()\" [id]=\"idDesc\">\n\t  <span class=\"titre\">{{ titre }}</span>\n\t  <br/>\n\t  <br/>\n\t      {{ description }}\n\t</p>\n</div>\n"

/***/ },

/***/ 615:
/***/ function(module, exports) {

module.exports = "<div class=\"Galerie\" [id]=\"id\" [style.margin-left]=\"x\" [style.margin-top]=\"y\" [style.width]=\"width\" [style.height]=\"height\">\n\n  <!-- On affiche les images que si elles apparaissent à l'écran -->\n  <div *ngIf=\"estVisible() || !estReduit\">\n    <div *ngFor=\"let image of photos; let i=index\">\n      <img [src]=\"returnData(image.url)\" alt=\"Chargement...\" [style.width]=\"width\" [style.height]=\"height\" [style.top]=\"posTop(i)\" [style.left]=\"posLeft(i)\" [style.z-index]=\"zIndex()\"/>\n    </div>\n  </div>\n\n  <!-- On affiche les flèches si elles sont utiles -->\n  <div *ngIf=\"flecheVisible\">\n    <div class=\"fleche\" height=\"30px\" width=\"30px\" [style.top]=\"flecheTop()\" [style.left]=\"flecheLeft()\" [style.z-index]=\"zIndex()\" [style.transform]=\"rotation()\" (click)=\"deploy()\">\n      <img [src]=\"urlFleche\" alt=\"Deploiement\" height=\"30px\" width=\"30px\"/>\n    </div>\n  </div>\n</div>\n"

/***/ },

/***/ 616:
/***/ function(module, exports) {

module.exports = "<div class=\"divNavigation\" [style.left]=\"x\" [style.top]=\"y\">\n\n  <!-- On affiche le bouton de lien -->\n  <a (click)=\"scrollToElement()\">\n    <img src=\"planete.gif\" height=\"30px\" width=\"30px\"/>\n  </a>\n\n</div>\n"

/***/ },

/***/ 628:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(344);


/***/ }

},[628]);
//# sourceMappingURL=main.bundle.map