"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../dao/index");
const model_1 = require("../model");
const configs_1 = require("../config/configs");
const database_1 = require("../database");
const awsS3 = require("aws-sdk");
const tinify = require("tinify");
class UploadFileRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
        awsS3.config.update({
            accessKeyId: configs_1.configs.S3Bucket.accessKeyId,
            secretAccessKey: configs_1.configs.S3Bucket.secretAccessKey
        });
        tinify.key = configs_1.configs.TinyPNG.apiKey;
    }
    getRouter() {
        return this.router;
    }
    uploadFile(req, res, next) {
        if (!req.files) {
            return res
                .status(400)
                .json(new model_1.Mensagem("Nenhum arquivo foi enviado.", "erro"));
        }
        if (!req.files["imagem"]) {
            return res
                .status(400)
                .json(new model_1.Mensagem("Nenhum arquivo encontrado com o field name igual a 'imagem'.", "erro"));
        }
        if (!req.body) {
            return res
                .status(400)
                .json(new model_1.Mensagem("Obrigatório o envio do body com as informações da imagem.", "erro"));
        }
        if (!req.body["veiculoId"]) {
            return res
                .status(400)
                .json(new model_1.Mensagem("Obrigatório o envio do id do veículo no body.", "erro"));
        }
        let imagem = req.files.imagem;
        if (imagem["mimetype"] !== "image/jpeg") {
            return res
                .status(400)
                .json(new model_1.Mensagem("Imagem deve ser do tipo jpg.", "erro"));
        }
        let anexoVeiculo = null;
        let client = null;
        let s3Bucket = new awsS3.S3();
        let imageKey = (Math.random() * 100000000000000000).toString() + ".JPG";
        let imageUrl = `https://s3-sa-east-1.amazonaws.com/${configs_1.configs.S3Bucket.bucketName}/${imageKey}`;
        index_1.VeiculoDAO.buscarVeiculoPorId(req.body["veiculoId"])
            .then((veiculo) => {
            if (!veiculo) {
                throw new Error("Veículo informado não existe.");
            }
            return;
        })
            .then(() => tinify
            //@ts-ignore
            .fromBuffer(imagem.data)
            .resize({ method: "scale", width: 800 })
            .toBuffer())
            .then(resizedImage => s3Bucket
            .putObject({
            Bucket: configs_1.configs.S3Bucket.bucketName,
            Key: imageKey,
            //@ts-ignore
            Body: resizedImage,
            ACL: "public-read",
            ContentType: "image/jpeg"
        })
            .promise())
            .then(() => {
            let tipoArquivo = req.body["tipoArquivo"] >= 0 ? req.body["tipoArquivo"] : 0;
            let principal = req.body["principal"]
                ? req.body["principal"] == "true"
                : false;
            let veiculoId = req.body["veiculoId"];
            anexoVeiculo = new model_1.AnexoVeiculo(null, tipoArquivo, imageUrl, principal, veiculoId);
            return database_1.clientFactory.getClient();
        })
            .then((result) => {
            client = result;
            return index_1.AnexoVeiculoDAO.inserirAnexo(client, anexoVeiculo);
        })
            .then((id) => {
            database_1.clientFactory.commit(client);
            anexoVeiculo.$id = id;
            return res.json({ data: anexoVeiculo });
        })
            .catch(error => {
            if (client) {
                database_1.clientFactory.rollback(client);
            }
            return res.json({ erro: new model_1.Mensagem(error.message, "erro") });
        });
    }
    init() {
        this.router.post("/", this.uploadFile);
    }
}
exports.uploadFile = new UploadFileRoute().getRouter();
//# sourceMappingURL=uploadFile.route.js.map