import {
  VeiculoDAO,
  ModeloDAO,
  CidadeDAO,
  AnexoVeiculoDAO
} from "../dao/index";
import { Veiculo, AnexoVeiculo } from "../model/index";
import { clientFactory } from "../database";
import { Client } from "pg";
import { configs } from "../config/configs";
import * as cloudinary from "cloudinary";
import { logger } from "../utils";

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

  public static deletarAnexo(root, args) {
    let client = null;
    return new Promise((resolve, reject) => {
      this.deletarImagemCloudinary(args.id)
        .then(() => clientFactory.getClient())
        .then((result: Client) => {
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

  public static deletarImagemCloudinary(idAnexo: number) {
    return AnexoVeiculoDAO.buscaAnexoPorId(idAnexo).then(
      (anexo: AnexoVeiculo) => {
        let idCloudinary = anexo.$url.substring(
          anexo.$url.lastIndexOf("/") + 1,
          anexo.$url.lastIndexOf(".j")
        );
        cloudinary.config({
          cloud_name: configs.Cloudinary.cloudName,
          api_key: configs.Cloudinary.apiKey,
          api_secret: configs.Cloudinary.apiSecret
        });
        return cloudinary.v2.uploader.destroy(idCloudinary);
      }
    );
  }

  public static getResolvers(): Object {
    return {};
  }
}
