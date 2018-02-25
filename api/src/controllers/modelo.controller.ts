import { MarcaDAO, ModeloDAO } from "../dao/index";
export class ModeloController {
  public static getType(): string {
    return `type Modelo { id: Int, descricao: String, marca: Marca }`;
  }

  public static getQueries(): string {
    return `modelos(marcaId: Int, limite: Int = 0): [Modelo]
            modelo(id: Int): Modelo`;
  }

  public static getQueryResolvers(): Object {
    return {
      modelos: (root, args) => {
        return ModeloDAO.buscarModelosPorMarca(args.marcaId).then(value => {
          let retorno = value;
          if (args.limite) {
            retorno = retorno.slice(0, args.limite);
          }
          return retorno;
        });
      },
      modelo: (root, args) => ModeloDAO.buscarModeloPorId(args.id)
    };
  }

  public static getResolvers(): Object {
    return {
      //   Modelo: {
      //     marca: modelo => MarcaDAO.buscaMarcaPorId(modelo.)
      //   }
    };
  }
}
