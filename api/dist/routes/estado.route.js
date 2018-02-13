"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../dao/index");
const model_1 = require("../model");
class EstadoRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    getTodosEstados(req, res, next) {
        index_1.EstadoDAO.buscaTodosEstados()
            .then((resultado) => {
            res.json(new model_1.Resposta(null, null, resultado));
        }).catch((erro) => {
            res.status(500).json(new model_1.Resposta(erro));
        });
    }
    getEstadoPorId(req, res, next) {
        let idEstado = req.params["id"];
        index_1.EstadoDAO.buscaEstadoPorId(idEstado)
            .then((resultado) => {
            res.json(new model_1.Resposta(null, null, resultado));
        })
            .catch((erro) => {
            res.status(500).json(new model_1.Resposta(erro));
        });
    }
    init() {
        this.router.get("/", this.getTodosEstados);
        this.router.get("/:id", this.getEstadoPorId);
    }
}
exports.estado = new EstadoRoute().getRouter();
//# sourceMappingURL=estado.route.js.map