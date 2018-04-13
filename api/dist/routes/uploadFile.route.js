"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../dao/index");
const model_1 = require("../model");
const configs_1 = require("../config/configs");
const cloudinary = require("cloudinary");
const database_1 = require("../database");
class UploadFileRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
        cloudinary.config({
            cloud_name: configs_1.configs.Cloudinary.cloudName,
            api_key: configs_1.configs.Cloudinary.apiKey,
            api_secret: configs_1.configs.Cloudinary.apiSecret
        });
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
        index_1.VeiculoDAO.buscarVeiculoPorId(req.body["veiculoId"])
            .then((veiculo) => {
            if (!veiculo) {
                throw new Error("Veículo informado não existe.");
            }
            return;
        })
            .then(() => cloudinary.v2.uploader
            .upload(`data:image/jpeg;base64,${imagem.data.toString("base64")}`, {
            width: 800,
            crop: "scale"
        }))
            .then(result => {
            let tipoArquivo = req.body["tipoArquivo"] >= 0 ? req.body["tipoArquivo"] : 0;
            let principal = req.body["principal"]
                ? req.body["principal"] == "true"
                : false;
            let veiculoId = req.body["veiculoId"];
            anexoVeiculo = new model_1.AnexoVeiculo(null, tipoArquivo, result["secure_url"], principal.valueOf(), veiculoId);
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