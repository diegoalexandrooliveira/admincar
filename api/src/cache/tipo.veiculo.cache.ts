import { TipoVeiculoDAO } from "../dao/index";
import { TipoVeiculo } from "../model/index";

let tmp: TipoVeiculo[];
TipoVeiculoDAO.buscaTodosTipoVeiculo().then(value => (tmp = value));
export function tiposVeiculo() {
  return tmp;
}
