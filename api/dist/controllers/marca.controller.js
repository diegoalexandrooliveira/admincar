"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
class MarcaController {
    static getType() {
        return `type Marca { id: Int, descricao: String, tipoVeiculo: TipoVeiculo, modelos: [Modelo] }`;
    }
    static getQueries() {
        return `marcas(tipoVeiculoId: Int): [Marca]
            marca(id: Int): Marca`;
    }
    static getQueryResolvers() {
        return {
            marcas: (root, args) => index_1.MarcaDAO.buscarMarcasPorTipoDeVeiculo(args.tipoVeiculoId),
            marca: (root, args) => index_1.MarcaDAO.buscaMarcaPorId(args.id)
        };
    }
    static getResolvers() {
        return {
            Marca: {
                modelos: marca => index_1.ModeloDAO.buscarModelosPorMarca(marca.id)
            }
        };
    }
}
exports.MarcaController = MarcaController;
//# sourceMappingURL=marca.controller.js.map