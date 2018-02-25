"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const index_2 = require("../cache/index");
class TipoVeiculoController {
    static getType() {
        return `type TipoVeiculo { id: Int, descricao: String, marcas: [Marca] }`;
    }
    static getQueries() {
        return `tiposVeiculo: [TipoVeiculo]
            tipoVeiculo(id: Int): TipoVeiculo`;
    }
    static getQueryResolvers() {
        return {
            tiposVeiculo: () => index_2.tiposVeiculo(),
            tipoVeiculo: (root, args) => index_2.tiposVeiculo()[args.id - 1]
        };
    }
    static getResolvers() {
        return {
            TipoVeiculo: {
                marcas: tipoVeiculo => index_1.MarcaDAO.buscarMarcasPorTipoDeVeiculo(tipoVeiculo.id)
            }
        };
    }
}
exports.TipoVeiculoController = TipoVeiculoController;
//# sourceMappingURL=tipo.veiculo.controller.js.map