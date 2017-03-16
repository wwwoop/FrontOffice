import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'obj-terre',
  templateUrl: './terre.component.html',
  styleUrls: ['./terre.component.css']
})
export class TerreComponent implements OnInit {
  //Variables d'entrées
  @Input('x') x: string;
  @Input('y') y: string;
  @Input('autId') autId: number;

  constructor() {
  }

  ngOnInit() {

  }

  scrollToElement(): void {
    var $root = $('html, body');
    $root.animate({
      scrollTop: ($("#aut" + this.autId).offset().top - window.innerHeight/2 + $("#aut" + this.autId).width()/2),
      scrollLeft: ($("#aut" + this.autId).offset().left - window.innerWidth/2 + $("#aut" + this.autId).width()/2)}, 1000);
  }

}
