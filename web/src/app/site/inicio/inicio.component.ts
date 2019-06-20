import { Component, OnInit } from "@angular/core";
import {VeiculosService} from "../veiculos.service";
import {Veiculo} from "../models/veiculo.model";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"],
  providers: [HeaderComponent]
})
export class InicioComponent implements OnInit {

  veiculos: Veiculo[] = [];
  constructor(
    private service: VeiculosService, private menu: HeaderComponent
  ) {
    service.recuperarAleatoriosLimitado().then(veiculos=> this.veiculos = veiculos);
  }

  ngOnInit() {
    this.menu.mudouTela();    
  }
}
