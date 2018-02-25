import { MarcaDAO } from "../dao/index";
import { tiposVeiculo } from "../cache/index";
export class TipoVeiculoController {
  public static getType(): string {
    return `type TipoVeiculo { id: Int, descricao: String, marcas: [Marca] }`;
  }

  public static getQueries(): string {
    return `tiposVeiculo: [TipoVeiculo]
            tipoVeiculo(id: Int): TipoVeiculo`;
  }

  public static getQueryResolvers(): Object {
    return {
      tiposVeiculo: () => tiposVeiculo(),
      tipoVeiculo: (root, args) => tiposVeiculo()[args.id - 1]
    };
  }

  public static getResolvers(): Object {
    return {
      TipoVeiculo: {
        marcas: tipoVeiculo =>
          MarcaDAO.buscarMarcasPorTipoDeVeiculo(tipoVeiculo.id)
      }
    };
  }
}
