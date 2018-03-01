"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
let tmp;
index_1.CombustivelDAO.buscarTodosCombustiveis().then(value => (tmp = value));
function combustiveis() {
    return tmp;
}
exports.combustiveis = combustiveis;
//# sourceMappingURL=combustivel.cache.js.map