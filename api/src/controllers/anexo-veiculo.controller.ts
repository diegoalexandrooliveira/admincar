import {
  VeiculoDAO,
  ModeloDAO,
  CidadeDAO,
  AnexoVeiculoDAO
} from "../dao/index";
import { Veiculo, AnexoVeiculo } from "../model/index";
import { cores, combustiveis } from "../cache/index";

export class AnexoVeiculoController {
  public static getType(): string {
    return `type AnexoVeiculo { id: Int, tipoArquivo: Int, url: String, veiculoId: Int,
            principal: Boolean}`;
  }

  public static getQueries(): string {
    return `anexoPrincipal(veiculoId: Int): AnexoVeiculo
            anexos(veiculoId: Int): [AnexoVeiculo]`;
  }

  // public static getMutations(): string {
  //   return `uploadFile(file: Upload): Boolean`;
  // }

  public static getQueryResolvers(): Object {
    return {
      anexoPrincipal: (root, args) => {
        return AnexoVeiculoDAO.buscaAnexoPrincipalPorVeiculo(
          args.veiculoId
        ).then((anexo: AnexoVeiculo) => {
          if (!anexo || !anexo.$url) {
            return new AnexoVeiculo(
              -1,
              0,
              "/public/images/veiculoSemImagem.jpg",
              true,
              args.veiculoId
            );
          } else {
            return anexo;
          }
        });
      },
      anexos: (root, args) => {
        return AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(args.veiculoId);
      }
    };
  }

  public static getResolvers(): Object {
    return {};
  }
}
