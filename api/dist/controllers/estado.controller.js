"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const index_2 = require("../cache/index");
class EstadoController {
    static getType() {
        return `type Estado { id: Int, nome: String, sigla: String, cidades: [Cidade] }`;
    }
    static getQueries() {
        return `estados: [Estado]
            estado(id: Int): Estado`;
    }
    static getQueryResolvers() {
        return {
            estados: () => index_2.estados(),
            estado: (root, args) => index_2.estados()[args.id - 1]
        };
    }
    static getResolvers() {
        return {
            Estado: {
                cidades: estado => index_1.CidadeDAO.buscaTodasCidadesPorEstado(estado.id)
            }
        };
    }
}
exports.EstadoController = EstadoController;
//# sourceMappingURL=estado.controller.js.map