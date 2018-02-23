import { EstadoDAO, CidadeDAO } from "../dao/index";
export class EstadoController {
  public static getType(): string {
    return `type Estado { id: Int, nome: String, sigla: String, cidades: [Cidade] }`;
  }

  public static getQueries(): string {
    return `estados: [Estado]
            estado(id: Int): Estado`;
  }

  public static getQueryResolvers(): Object {
    return {
      estados: () => EstadoDAO.buscaTodosEstados(),
      estado: (root, args) => EstadoDAO.buscaEstadoPorId(args.id)
    };
  }

  public static getResolvers(): Object {
    return {
      Estado: {
        cidades: estado => CidadeDAO.buscaTodasCidadesPorEstado(estado.id)
      }
    };
  }
}
