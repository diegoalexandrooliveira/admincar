import { Request, Response, NextFunction, Router } from "express";
import { VeiculoDAO, AnexoVeiculoDAO } from "../dao/index";
import { Mensagem, Veiculo, AnexoVeiculo } from "../model";
import { configs } from "../config/configs";
import { clientFactory } from "../database";
import { PoolClient } from "pg";
import { Storage } from "@google-cloud/storage";
import * as fs from "fs";

class UploadFileRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.init();
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
    let gcs = new Storage();
    let tinify = require("tinify");
    tinify.key = configs.TinyPNG.apiKey;
    let imageKey: string =
      (Math.random() * 100000000000000000).toString() + ".JPG";
    let imagePath = configs.local.path + "tmp/" + imageKey;
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
      ).then(resizedImage =>
        fs.writeFileSync(imagePath, resizedImage)
      )
      .then(() =>
        gcs.bucket(configs.GCS.bucketId).upload(imagePath, {
          gzip: true,
          public: true,
          destination: imageKey
        })
      ).then(() => {
        fs.unlinkSync(imagePath);
        return gcs.bucket(configs.GCS.bucketId).file(imageKey).getMetadata()
      }).then(([metadata]) => {
        let tipoArquivo =
          req.body["tipoArquivo"] >= 0 ? req.body["tipoArquivo"] : 0;
        let principal = req.body["principal"]
          ? req.body["principal"] == "true"
          : false;
        let veiculoId = req.body["veiculoId"];
        anexoVeiculo = new AnexoVeiculo(
          null,
          tipoArquivo,
          metadata.mediaLink,
          principal,
          veiculoId,
          imageKey
        );
        return clientFactory.getClient();
      })
      .then((result: PoolClient) => {
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
