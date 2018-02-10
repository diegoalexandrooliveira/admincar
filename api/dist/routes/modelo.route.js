"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../dao/index");
class ModeloRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    getModeloPorId(req, res, next) {
        index_1.ModeloDAO.buscarModeloPorId(req.params["modeloId"])
            .then((resultado) => {
            res.status(resultado ? 200 : 204).json(resultado);
        }).catch((erro) => {
            res.status(500).json(erro);
        });
    }
    getModelosPorMarca(req, res, next) {
        index_1.ModeloDAO.buscarModelosPorMarca(req.params["marcaId"])
            .then((result) => {
            res.status(result ? 200 : 204).json(result);
        }).catch((erro) => {
            res.status(500).json(erro);
        });
    }
    init() {
        this.router.get("/:modeloId", this.getModeloPorId);
        this.router.get("/marca/:marcaId", this.getModelosPorMarca);
    }
}
exports.modelo = new ModeloRoute().getRouter();
//# sourceMappingURL=modelo.route.js.map