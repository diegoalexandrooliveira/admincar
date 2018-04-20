import { Request, Response, NextFunction, Router } from "express";
import { VeiculoDAO, AnexoVeiculoDAO } from "../dao/index";
import { logger } from "../utils";
import { Usuario, Mensagem, Resposta, Veiculo, AnexoVeiculo } from "../model";
import { configs } from "../config/configs";
import { clientFactory } from "../database";
import { Client } from "pg";
import * as awsS3 from "aws-sdk";
import * as tinify from "tinify";

class UploadFileRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.init();
    awsS3.config.update({
      accessKeyId: configs.S3Bucket.accessKeyId,
      secretAccessKey: configs.S3Bucket.secretAccessKey
    });
    tinify.key = configs.TinyPNG.apiKey;
  }

  public getRouter(): Router {
    return this.router;
  }

  private uploadFile(req: Request, res: Response, next: NextFunction) {
    if (!req.files) {
      return res
        .status(400)
        .json(new Mensagem("Nenhum arquivo foi enviado.", "erro"));
    }

    if (!req.files["imagem"]) {
      return res
        .status(400)
        .json(
          new Mensagem(
            "Nenhum arquivo encontrado com o field name igual a 'imagem'.",
            "erro"
          )
        );
    }

    if (!req.body) {
      return res
        .status(400)
        .json(
          new Mensagem(
            "Obrigatório o envio do body com as informações da imagem.",
            "erro"
          )
        );
    }

    if (!req.body["veiculoId"]) {
      return res
        .status(400)
        .json(
          new Mensagem("Obrigatório o envio do id do veículo no body.", "erro")
        );
    }

    let imagem = req.files.imagem;

    if (imagem["mimetype"] !== "image/jpeg") {
      return res
        .status(400)
        .json(new Mensagem("Imagem deve ser do tipo jpg.", "erro"));
    }
    let anexoVeiculo: AnexoVeiculo = null;
    let client = null;
    let s3Bucket = new awsS3.S3();
    let imageKey: string =
      (Math.random() * 100000000000000000).toString() + ".JPG";
    let imageUrl: string = `https://s3-sa-east-1.amazonaws.com/${
      configs.S3Bucket.bucketName
    }/${imageKey}`;
    VeiculoDAO.buscarVeiculoPorId(req.body["veiculoId"])
      .then((veiculo: Veiculo) => {
        if (!veiculo) {
          throw new Error("Veículo informado não existe.");
        }
        return;
      })
      .then(() =>
        tinify
          //@ts-ignore
          .fromBuffer(imagem.data)
          .resize({ method: "scale", width: 800 })
          .toBuffer()
      )
      .then(resizedImage =>
        s3Bucket
          .putObject({
            Bucket: configs.S3Bucket.bucketName,
            Key: imageKey,
            //@ts-ignore
            Body: resizedImage,
            ACL: "public-read",
            ContentType: "image/jpeg"
          })
          .promise()
      )
      .then(() => {
        let tipoArquivo =
          req.body["tipoArquivo"] >= 0 ? req.body["tipoArquivo"] : 0;
        let principal = req.body["principal"]
          ? req.body["principal"] == "true"
          : false;
        let veiculoId = req.body["veiculoId"];
        anexoVeiculo = new AnexoVeiculo(
          null,
          tipoArquivo,
          imageUrl,
          principal,
          veiculoId
        );
        return clientFactory.getClient();
      })
      .then((result: Client) => {
        client = result;
        return AnexoVeiculoDAO.inserirAnexo(client, anexoVeiculo);
      })
      .then((id: number) => {
        clientFactory.commit(client);
        anexoVeiculo.$id = id;
        return res.json({ data: anexoVeiculo });
      })
      .catch(error => {
        if (client) {
          clientFactory.rollback(client);
        }
        return res.json({ erro: new Mensagem(error.message, "erro") });
      });
  }

  private init(): void {
    this.router.post("/", this.uploadFile);
  }
}

export let uploadFile: Router = new UploadFileRoute().getRouter();
