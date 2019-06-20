import { Component, OnInit } from '@angular/core';
import { Veiculo } from "../../models/veiculo.model";
import { VeiculosService } from "../../veiculos.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Opcional } from '../../models/opcional.model';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-veiculos-visualizar',
  templateUrl: './veiculos.visualizar.component.html',
  styleUrls: ['./veiculos.visualizar.component.css'],
  providers: [HeaderComponent]
})
export class VeiculosVisualizarComponent implements OnInit {

  veiculo: Veiculo;
  constructor(
    private service: VeiculosService,
    private route: ActivatedRoute, private menu: HeaderComponent
  ) { }

  ngOnInit() {
    this.menu.mudouTela();
    this.route.params.subscribe((params: Params) => {
      this.service.recuperarVeiculo(params["id"]).then((veiculo: Veiculo) => {
        this.veiculo = veiculo;
        if(!this.veiculo.$opcionais){
          this.veiculo.$opcionais = Array.of(new Opcional(null, "Básico"));
        }
      }
        );
      
    });
  }

}
