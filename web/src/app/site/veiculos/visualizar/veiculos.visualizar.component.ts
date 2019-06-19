import { Component, OnInit } from '@angular/core';
import { Veiculo } from "../../models/veiculo.model";
import { VeiculosService } from "../../veiculos.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Opcional } from '../../models/opcional.model';

@Component({
  selector: 'app-veiculos-visualizar',
  templateUrl: './veiculos.visualizar.component.html',
  styleUrls: ['./veiculos.visualizar.component.css']
})
export class VeiculosVisualizarComponent implements OnInit {

  veiculo: Veiculo;
  constructor(
    private service: VeiculosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
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
