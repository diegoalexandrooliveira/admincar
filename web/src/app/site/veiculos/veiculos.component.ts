import { Component, OnInit } from '@angular/core';
import {Veiculo} from "../models/veiculo.model";
import {VeiculosService} from "../veiculos.service";
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css'],
  providers: [HeaderComponent]
})
export class VeiculosComponent implements OnInit {

  veiculos: Veiculo[] = [];
  constructor(
    private service: VeiculosService, private menu: HeaderComponent
  ) {
    service.recuperarTodosVeiculos().then(veiculos=> this.veiculos = veiculos);
  }

  ngOnInit() {
    this.menu.mudouTela();
  }

}
