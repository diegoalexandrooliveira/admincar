import { CombustivelDAO } from "../dao/index";
import { Combustivel } from "../model/index";

let tmp: Combustivel[];
CombustivelDAO.buscarTodosCombustiveis().then(value => (tmp = value));
export function combustiveis() {
  return tmp;
}
