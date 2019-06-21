import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
  providers: [HeaderComponent]
})
export class ContatoComponent implements OnInit {
  lat: number = -22.669874;
  lng: number = -50.412332;
  constructor(private menu: HeaderComponent) { }

  ngOnInit() {
    this.menu.mudouTela();
  }

}
