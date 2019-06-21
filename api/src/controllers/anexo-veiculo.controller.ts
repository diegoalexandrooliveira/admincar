import {
  VeiculoDAO,
  ModeloDAO,
  CidadeDAO,
  AnexoVeiculoDAO
} from "../dao/index";
import { AnexoVeiculo } from "../model/index";
import { clientFactory } from "../database";
import { Client, PoolClient } from "pg";
import { configs } from "../config/configs";
import { logger } from "../utils";
import * as awsS3 from "aws-sdk";

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
    return `atualizarAnexo(anexo: AnexoVeiculoInput): Int,
            excluirAnexo(id: Int): Int`;
  }

  public static getQueryResolvers(): Object {
    return {
      anexoPrincipal: (root, args) => {
        return this.getAnexoPrincipal(args.veiculoId);
      },
      anexos: (root, args) => {
        return AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(args.veiculoId);
      }
    };
  }

  public static getAnexoPrincipal(idVeiculo: number): Promise<AnexoVeiculo>{
    return AnexoVeiculoDAO.buscaAnexoPrincipalPorVeiculo(idVeiculo
    ).then((anexo: AnexoVeiculo) => {
      // if (!anexo || !anexo.$url) {
      //   return new AnexoVeiculo(
      //     -1,
      //     0,
      //     "/public/images/veiculoSemImagem.jpg",
      //     true,
      //     idVeiculo
      //   );
      // } else {
      //   return anexo;
      // }
      return anexo;
    });
  }

  public static getMutationsResolvers(): Object {
    return {
      atualizarAnexo: this.atualizarAnexo,
      excluirAnexo: this.deletarAnexo.bind(this)
    };
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
        .then((result: PoolClient) => {
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

  public static deletarAnexo(root, args) {
    let client = null;
    return new Promise((resolve, reject) => {
      this.deleteImageFromStorage(args.id)
        .then(() => clientFactory.getClient())
        .then((result: PoolClient) => {
          client = result;
          return AnexoVeiculoDAO.excluirAnexoVeiculo(client, args.id);
        })
        .then((rows: number) => {
          clientFactory.commit(client);
          resolve(rows);
        })
        .catch(erro => {
          if (client) {
            clientFactory.rollback(client);
          }
          logger.error(`anexo-veiculo.controller.deletarAnexo - ${erro}`);
          reject(erro);
        });
    });
  }

  public static deleteImageFromStorage(idAnexo: number) {
    return AnexoVeiculoDAO.buscaAnexoPorId(idAnexo).then(
      (anexo: AnexoVeiculo) => {
        let objectKey = anexo.$url.substring(
          anexo.$url.lastIndexOf("/") + 1,
          anexo.$url.length
        );
        let s3 = new awsS3.S3();
        return s3
          .deleteObject({
            Bucket: configs.S3Bucket.bucketName,
            Key: objectKey
          })
          .promise();
      }
    );
  }

  public static getResolvers(): Object {
    return {};
  }
}
