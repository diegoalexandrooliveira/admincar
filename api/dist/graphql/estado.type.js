"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("../dao");
let types = `
type Query {
    estados: [Estado]
    estado(id: Int): Estado
    cidades(estadoId: Int): [Cidade]
    cidade(id: Int): Cidade
}
type Estado { id: Int, nome: String, sigla: String, cidades: [Cidade] }
type Cidade { id: Int, nome: String, estado: Estado }

schema {
    query: Query
}
`;
let resolvers = {
    Query: {
        estados() {
            return dao_1.EstadoDAO.buscaTodosEstados();
        },
        estado(root, args) {
            return dao_1.EstadoDAO.buscaEstadoPorId(args.id);
        },
        cidades(root, args) {
            return dao_1.CidadeDAO.buscaTodasCidadesPorEstado(args.estadoId);
        },
        cidade(root, args) {
            return dao_1.CidadeDAO.buscaCidadePorId(args.id);
        }
    },
    Estado: {
        cidades(estado) {
            return dao_1.CidadeDAO.buscaTodasCidadesPorEstado(estado.id);
        }
    },
    Cidade: {
        estado(cidade) {
            return dao_1.EstadoDAO.buscaEstadoPorId(cidade.estado_id);
        }
    }
};
const graphql_tools_1 = require("graphql-tools");
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: types,
    resolvers: resolvers
});
//# sourceMappingURL=estado.type.js.map