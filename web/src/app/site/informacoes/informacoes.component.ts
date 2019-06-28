import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-informacoes',
  templateUrl: './informacoes.component.html',
  styleUrls: ['./informacoes.component.css'],
  providers: [HeaderComponent]
})
export class InformacoesComponent implements OnInit {
  lat: number = -22.6699158;
  lng: number = -50.4124184;
  zoom: number = 19.25;

  constructor(private menu: HeaderComponent) { }

  ngOnInit() {
    this.menu.mudouTela();
  }

}
