import { CorDAO } from "../dao/index";
import { Cor } from "../model/index";

let tmp: Cor[];
CorDAO.buscarTodasCores().then(value => (tmp = value));
export function cores() {
  return tmp;
}
