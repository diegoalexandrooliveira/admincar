import { Component, OnInit } from '@angular/core';
import {Veiculo} from "../models/veiculo.model";
import {VeiculosService} from "../veiculos.service";

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

  veiculos: Veiculo[] = [];
  constructor(
    private service: VeiculosService
  ) {
    service.recuperarTodosVeiculos().then(veiculos=> this.veiculos = veiculos);
  }

  ngOnInit() {
  }

}
