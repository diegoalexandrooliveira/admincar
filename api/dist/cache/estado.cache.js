"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const estado_dao_1 = require("../dao/estado.dao");
let tmp;
estado_dao_1.EstadoDAO.buscaTodosEstados().then(value => (tmp = value));
function estados() {
    return tmp;
}
exports.estados = estados;
//# sourceMappingURL=estado.cache.js.map