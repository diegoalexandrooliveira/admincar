"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../dao/index");
const model_1 = require("../model");
class MarcaRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    getMarcasPorTipoDeVeiculo(req, res, next) {
        let tipoVeiculoId = req.query["tipoVeiculo"];
        if (!tipoVeiculoId) {
            res.status(400).json(new model_1.Mensagem("Este resource deve conter uma query string no seguinte formato: tipoVeiculo={id}", "erro"));
        }
        else {
            index_1.MarcaDAO.buscarMarcasPorTipoDeVeiculo(tipoVeiculoId)
                .then((resultado) => {
                res.status(resultado ? 200 : 204).json(resultado);
            }).catch((erro) => {
                res.status(500).json(erro);
            });
        }
    }
    getMarcaPorId(req, res, next) {
        index_1.MarcaDAO.buscaMarcaPorId(req.params["id"])
            .then((resultado) => {
            res.status(resultado ? 200 : 204).json(resultado);
        }).catch((erro) => {
            res.status(500).json(erro);
        });
    }
    init() {
        this.router.get("/", this.getMarcasPorTipoDeVeiculo);
        // this.router.get("/tipoVeiculo/:tipoVeiculoId", this.getMarcasPorTipoDeVeiculo);
        this.router.get("/:id", this.getMarcaPorId);
    }
}
exports.marca = new MarcaRoute().getRouter();
//# sourceMappingURL=marca.route.js.map