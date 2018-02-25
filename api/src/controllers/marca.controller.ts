import { MarcaDAO, ModeloDAO } from "../dao/index";
export class MarcaController {
  public static getType(): string {
    return `type Marca { id: Int, descricao: String, tipoVeiculo: TipoVeiculo, modelos: [Modelo] }`;
  }

  public static getQueries(): string {
    return `marcas(tipoVeiculoId: Int): [Marca]
            marca(id: Int): Marca`;
  }

  public static getQueryResolvers(): Object {
    return {
      marcas: (root, args) =>
        MarcaDAO.buscarMarcasPorTipoDeVeiculo(args.tipoVeiculoId),
      marca: (root, args) => MarcaDAO.buscaMarcaPorId(args.id)
    };
  }

  public static getResolvers(): Object {
    return {
      Marca: {
        modelos: marca => ModeloDAO.buscarModelosPorMarca(marca.id)
      }
    };
  }
}
