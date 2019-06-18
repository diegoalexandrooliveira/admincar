import { Component, OnInit } from "@angular/core";
import {VeiculosService} from "../veiculos.service";
import {Veiculo} from "../models/veiculo.model";

@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.css"]
})
export class PrincipalComponent implements OnInit {
  veiculos: Veiculo[] = [];
  constructor(
    private service: VeiculosService
  ) {
    service.recuperarTodosPrincipal().then(veiculos=> this.veiculos = veiculos);
  }
  // constructor() {
  //   this.imagens.push({
  //     url: "http://perimetralveiculos.com.br/tmp/public/723.JPG?pfdrid_c=true",
  //     descricao: "GM - Chevrolet / Celta Spirit 1.0 MPFI VHC 8V 5p",
  //     ano: "2009/2009",
  //     preco: "R$ 16.800,00"
  //   });

  //   this.imagens.push({
  //     url: "http://perimetralveiculos.com.br/tmp/public/625.JPG?pfdrid_c=true",
  //     descricao: "VW - VolksWagen / Saveiro 1.6 Mi/ 1.6 Mi Total Flex 8V",
  //     ano: "2008/2008",
  //     preco: "R$ 18.500,00"
  //   });

  //   this.imagens.push({
  //     url: "http://www.perimetralveiculos.com.br/tmp/public/774.JPG?pfdrid_c=true",
  //     descricao: "GM - Chevrolet/Astra 2.0 8V/ CD 2.0 8V Hatchback 5p Mec ",
  //     ano: "2005/2005",
  //     preco: "R$ 21.000,00"
  //   });
  // }

  ngOnInit() {}
}
