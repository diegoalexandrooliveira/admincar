"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../dao/index");
class MarcaRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    getMarcasPorTipoDeVeiculo(req, res, next) {
        index_1.MarcaDAO.buscarMarcasPorTipoDeVeiculo(req.params["tipoVeiculoId"])
            .then((resultado) => {
            res.status(resultado ? 200 : 204).json(resultado);
        }).catch((erro) => {
            res.status(500).json(erro);
        });
    }
    getMarcaPorId(req, res, next) {
        index_1.MarcaDAO.buscaMarcaPorId(req.params["marcaId"])
            .then((resultado) => {
            res.status(resultado ? 200 : 204).json(resultado);
        }).catch((erro) => {
            res.status(500).json(erro);
        });
    }
    init() {
        this.router.get("/tipoVeiculo/:tipoVeiculoId", this.getMarcasPorTipoDeVeiculo);
        this.router.get("/:marcaId", this.getMarcaPorId);
    }
}
exports.marca = new MarcaRoute().getRouter();
//# sourceMappingURL=marca.route.js.map