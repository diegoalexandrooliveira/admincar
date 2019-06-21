import { Component, OnInit } from '@angular/core';
import { Veiculo } from "../models/veiculo.model";
import { VeiculosService } from "../veiculos.service";
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css'],
  providers: [HeaderComponent]
})
export class VeiculosComponent implements OnInit {

  veiculos: Veiculo[] = [];
  constructor(
    private service: VeiculosService, private menu: HeaderComponent, private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.menu.mudouTela();
    this.route.queryParams.subscribe((params: Params) => {
      this.service.recuperarTodosVeiculos(params["procurar"]).then(veiculos => this.veiculos = veiculos);
    });
  }

}
