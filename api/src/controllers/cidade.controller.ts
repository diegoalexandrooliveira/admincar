import { EstadoDAO, CidadeDAO } from "../dao/index";
export class CidadeController {
  public static getType(): string {
    return `type Cidade { id: Int, nome: String, estado: Estado }`;
  }

  public static getQueries(): string {
    return `    cidades(estadoId: Int): [Cidade]
                cidade(id: Int): Cidade`;
  }

  public static getQueryResolvers(): Object {
    return {
      cidades: (root, args) =>
        CidadeDAO.buscaTodasCidadesPorEstado(args.estadoId),
      cidade: (root, args) => CidadeDAO.buscaCidadePorId(args.id)
    };
  }

  public static getResolvers(): Object {
    return {
      Cidade: {
        estado: cidade => estados[cidade.estado_id - 1]
      }
    };
  }
}
let estados;
EstadoDAO.buscaTodosEstados().then(results => (estados = results));
