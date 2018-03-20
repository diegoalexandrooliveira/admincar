"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
let tmp;
index_1.TipoVeiculoDAO.buscaTodosTipoVeiculo().then(value => (tmp = value));
function tiposVeiculo() {
    return tmp;
}
exports.tiposVeiculo = tiposVeiculo;
//# sourceMappingURL=tipo.veiculo.cache.js.map