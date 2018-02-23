import { EstadoDAO, CidadeDAO } from "../dao";

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
      return EstadoDAO.buscaTodosEstados();
    },
    estado(root, args) {
      return EstadoDAO.buscaEstadoPorId(args.id);
    },
    cidades(root, args) {
      return CidadeDAO.buscaTodasCidadesPorEstado(args.estadoId);
    },
    cidade(root, args) {
      return CidadeDAO.buscaCidadePorId(args.id);
    }
  },
  Estado: {
    cidades(estado) {
      return CidadeDAO.buscaTodasCidadesPorEstado(estado.id);
    }
  },
  Cidade: {
    estado(cidade) {
      return EstadoDAO.buscaEstadoPorId(cidade.estado_id);
    }
  }
};

import { makeExecutableSchema } from "graphql-tools";
import { Cidade } from "../model";

export const schema = makeExecutableSchema({
  typeDefs: types,
  resolvers: resolvers
});
