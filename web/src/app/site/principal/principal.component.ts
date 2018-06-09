import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.css"]
})
export class PrincipalComponent implements OnInit {
  imagens: any[] = [];
  constructor() {
    this.imagens.push({
      url: "http://perimetralveiculos.com.br/tmp/public/723.JPG?pfdrid_c=true",
      descricao: "GM - Chevrolet / Celta Spirit 1.0 MPFI VHC 8V 5p",
      ano: "2009/2009",
      preco: "R$ 16.800,00"
    });

    this.imagens.push({
      url: "http://perimetralveiculos.com.br/tmp/public/625.JPG?pfdrid_c=true",
      descricao: "VW - VolksWagen / Saveiro 1.6 Mi/ 1.6 Mi Total Flex 8V",
      ano: "2008/2008",
      preco: "R$ 18.500,00"
    });
  }

  ngOnInit() {}
}
