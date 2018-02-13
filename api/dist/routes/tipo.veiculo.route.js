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
    getTodosTipoDeVeiculo(req, res, next) {
        index_1.TipoVeiculoDAO.buscaTodosTipoVeiculo()
            .then((resultado) => {
            res.json(new model_1.Resposta(null, null, resultado));
        }).catch((erro) => {
            res.status(500).json(new model_1.Resposta(erro));
        });
    }
    getTipoDeVeiculoPorId(req, res, next) {
        let id = req.params["id"];
        index_1.TipoVeiculoDAO.buscaTipoVeiculoPorId(id)
            .then((resultado) => {
            res.json(new model_1.Resposta(null, null, resultado));
        }).catch((erro) => {
            res.status(500).json(new model_1.Resposta(erro));
        });
    }
    init() {
        this.router.get("/", this.getTodosTipoDeVeiculo);
        this.router.get("/:id", this.getTipoDeVeiculoPorId);
    }
}
exports.tipoDeVeiculo = new MarcaRoute().getRouter();
//# sourceMappingURL=tipo.veiculo.route.js.map