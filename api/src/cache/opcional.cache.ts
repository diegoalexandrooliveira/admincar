import { OpcionalDAO } from "../dao/index";
import { Opcional } from "../model/index";

let tmp: Opcional[];
OpcionalDAO.buscarTodosOpcionais().then(value => (tmp = value));
export function opcionais() {
  return tmp;
}
