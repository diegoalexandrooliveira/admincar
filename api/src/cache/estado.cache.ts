import { EstadoDAO } from "../dao/estado.dao";
import { Estado } from "../model/estado.model";

let tmp: Estado[];
EstadoDAO.buscaTodosEstados().then(value => (tmp = value));
export function estados() {
  return tmp;
}
