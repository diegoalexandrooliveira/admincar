"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
class ModeloController {
    static getType() {
        return `type Modelo { id: Int, descricao: String, marca: Marca }`;
    }
    static getQueries() {
        return `modelos(marcaId: Int, limite: Int = 0): [Modelo]
            modelo(id: Int): Modelo`;
    }
    static getQueryResolvers() {
        return {
            modelos: (root, args) => {
                return index_1.ModeloDAO.buscarModelosPorMarca(args.marcaId).then(value => {
                    let retorno = value;
                    if (args.limite) {
                        retorno = retorno.slice(0, args.limite);
                    }
                    return retorno;
                });
            },
            modelo: (root, args) => index_1.ModeloDAO.buscarModeloPorId(args.id)
        };
    }
    static getResolvers() {
        return {};
    }
}
exports.ModeloController = ModeloController;
//# sourceMappingURL=modelo.controller.js.map