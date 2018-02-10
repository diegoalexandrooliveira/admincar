"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../dao/index");
const model_1 = require("../model");
class ModeloRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    getModeloPorId(req, res, next) {
        index_1.ModeloDAO.buscarModeloPorId(req.params["id"])
            .then((resultado) => {
            res.status(resultado ? 200 : 204).json(resultado);
        }).catch((erro) => {
            res.status(500).json(erro);
        });
    }
    getModelosPorMarca(req, res, next) {
        let marca = req.query["marca"];
        if (!marca) {
            res.status(400).json(new model_1.Erro("Este resource deve conter uma query string no seguinte formato: marca={id}"));
        }
        else {
            index_1.ModeloDAO.buscarModelosPorMarca(marca)
                .then((result) => {
                res.status(result ? 200 : 204).json(result);
            }).catch((erro) => {
                res.status(500).json(erro);
            });
        }
    }
    init() {
        this.router.get("/:id", this.getModeloPorId);
        this.router.get("/", this.getModelosPorMarca);
    }
}
exports.modelo = new ModeloRoute().getRouter();
//# sourceMappingURL=modelo.route.js.map