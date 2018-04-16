import { Request, Response, NextFunction, Router } from "express";
import { VeiculoDAO, AnexoVeiculoDAO } from "../dao/index";
import { logger } from "../utils";
import { Usuario, Mensagem, Resposta, Veiculo, AnexoVeiculo } from "../model";
import { configs } from "../config/configs";
import * as cloudinary from "cloudinary";
import { clientFactory } from "../database";
import { Client } from "pg";

class UploadFileRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.init();
    cloudinary.config({
      cloud_name: configs.Cloudinary.cloudName,
      api_key: configs.Cloudinary.apiKey,
      api_secret: configs.Cloudinary.apiSecret
    });
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
    VeiculoDAO.buscarVeiculoPorId(req.body["veiculoId"])
      .then((veiculo: Veiculo) => {
        if (!veiculo) {
          throw new Error("Veículo informado não existe.");
        }
        return;
      })
      .then(() =>
        cloudinary.v2.uploader
          //@ts-ignore
          .upload(`data:image/jpeg;base64,${imagem.data.toString("base64")}`, {
            width: 800,
            crop: "scale"
          })
      )
      .then(result => {
        let tipoArquivo =
          req.body["tipoArquivo"] >= 0 ? req.body["tipoArquivo"] : 0;
        let principal = req.body["principal"]
          ? req.body["principal"] == "true"
          : false;
        let veiculoId = req.body["veiculoId"];
        anexoVeiculo = new AnexoVeiculo(
          null,
          tipoArquivo,
          result["secure_url"],
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
