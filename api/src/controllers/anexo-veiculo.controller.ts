import {
  VeiculoDAO,
  ModeloDAO,
  CidadeDAO,
  AnexoVeiculoDAO
} from "../dao/index";
import { Veiculo, AnexoVeiculo } from "../model/index";
import { cores, combustiveis } from "../cache/index";
import { clientFactory } from "../database";
import { Client } from "pg";

export class AnexoVeiculoController {
  public static getType(): string {
    return `type AnexoVeiculo { id: Int, tipoArquivo: Int, url: String, veiculoId: Int,
            principal: Boolean}
            input AnexoVeiculoInput { id: Int, tipoArquivo: Int, principal: Boolean}`;
  }

  public static getQueries(): string {
    return `anexoPrincipal(veiculoId: Int): AnexoVeiculo
            anexos(veiculoId: Int): [AnexoVeiculo]`;
  }

  public static getMutations(): string {
    return `atualizarAnexo(anexo: AnexoVeiculoInput): Int`;
  }

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

  public static getMutationsResolvers(): Object {
    return { atualizarAnexo: this.atualizarAnexo };
  }

  public static atualizarAnexo(root, args): Promise<number> {
    return new Promise((resolve, reject) => {
      let client = null;
      let anexo = new AnexoVeiculo(
        args.anexo.id,
        args.anexo.tipoArquivo,
        null,
        args.anexo.principal
      );
      clientFactory
        .getClient()
        .then((result: Client) => {
          client = result;
          return AnexoVeiculoDAO.atualizarAnexo(client, anexo);
        })
        .then(retorno => {
          clientFactory.commit(client);
          resolve(retorno);
        })
        .catch(erro => {
          if (client) {
            clientFactory.rollback(client);
          }
          reject(erro);
        });
    });
  }

  public static getResolvers(): Object {
    return {};
  }
}
