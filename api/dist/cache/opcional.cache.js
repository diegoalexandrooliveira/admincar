"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
let tmp;
index_1.OpcionalDAO.buscarTodosOpcionais().then(value => (tmp = value));
function opcionais() {
    return tmp;
}
exports.opcionais = opcionais;
//# sourceMappingURL=opcional.cache.js.map