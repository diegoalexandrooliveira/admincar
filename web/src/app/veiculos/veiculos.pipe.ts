import { Pipe, PipeTransform } from "@angular/core";
import { Veiculo } from "../models/veiculo.model";
@Pipe({
  name: "veiculosFilter"
})
export class VeiculosPipe implements PipeTransform {
  transform(veiculos: Veiculo[], searchText: string): any[] {
    if (!veiculos) return [];
    if (!searchText) return veiculos;
    searchText = searchText.toLowerCase();
    return veiculos.filter(veiculo => {
      let marcaModelo = veiculo.$modelo.$marca.$descricao
        .toLowerCase()
        .concat(veiculo.$modelo.$descricao.toLowerCase());
      let cor = veiculo.$cor.$descricao.toLowerCase();
      let ano = veiculo.$anoFabricacao
        .toString()
        .concat(veiculo.$anoModelo.toString());
      let preco = veiculo.$valorAnuncio.toString();
      let placa = veiculo.$placa ? veiculo.$placa.toLowerCase() : "";
      return (
        marcaModelo.includes(searchText) ||
        cor.includes(searchText) ||
        ano.includes(searchText) ||
        preco.includes(searchText) ||
        placa.includes(searchText)
      );
    });
  }
}
