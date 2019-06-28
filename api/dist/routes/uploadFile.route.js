"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../dao/index");
const model_1 = require("../model");
const configs_1 = require("../config/configs");
const database_1 = require("../database");
const storage_1 = require("@google-cloud/storage");
const fs = require("fs");
class UploadFileRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
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
        let gcs = new storage_1.Storage();
        let tinify = require("tinify");
        tinify.key = configs_1.configs.TinyPNG.apiKey;
        let imageKey = (Math.random() * 100000000000000000).toString() + ".JPG";
        let imagePath = configs_1.configs.local.path + "tmp/" + imageKey;
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
            .toBuffer()).then(resizedImage => fs.writeFileSync(imagePath, resizedImage))
            .then(() => gcs.bucket(configs_1.configs.GCS.bucketId).upload(imagePath, {
            gzip: true,
            public: true,
            destination: imageKey
        })).then(() => {
            fs.unlinkSync(imagePath);
            return gcs.bucket(configs_1.configs.GCS.bucketId).file(imageKey).getMetadata();
        }).then(([metadata]) => {
            let tipoArquivo = req.body["tipoArquivo"] >= 0 ? req.body["tipoArquivo"] : 0;
            let principal = req.body["principal"]
                ? req.body["principal"] == "true"
                : false;
            let veiculoId = req.body["veiculoId"];
            anexoVeiculo = new model_1.AnexoVeiculo(null, tipoArquivo, metadata.mediaLink, principal, veiculoId, imageKey);
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