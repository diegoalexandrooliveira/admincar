"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
class CidadeController {
    static getType() {
        return `type Cidade { id: Int, nome: String, estado: Estado }`;
    }
    static getQueries() {
        return `    cidades(estadoId: Int): [Cidade]
                cidade(id: Int): Cidade`;
    }
    static getQueryResolvers() {
        return {
            cidades: (root, args) => index_1.CidadeDAO.buscaTodasCidadesPorEstado(args.estadoId),
            cidade: (root, args) => index_1.CidadeDAO.buscaCidadePorId(args.id)
        };
    }
    static getResolvers() {
        return {
            Cidade: {
                estado: cidade => estados[cidade.estado_id - 1]
            }
        };
    }
}
exports.CidadeController = CidadeController;
let estados;
index_1.EstadoDAO.buscaTodosEstados().then(results => (estados = results));
//# sourceMappingURL=cidade.controller.js.map