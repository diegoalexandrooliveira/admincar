"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../dao/index");
const model_1 = require("../model");
class CidadeRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    getTodasCidadesPorEstado(req, res, next) {
        let estado = req.query["estado"];
        if (!estado) {
            res.status(400).json(new model_1.Resposta(new model_1.Mensagem("Este resource deve conter uma query string no seguinte formato: estado={id}", "erro")));
        }
        else {
            index_1.CidadeDAO.buscaTodasCidadesPorEstado(estado)
                .then((result) => {
                res.json(new model_1.Resposta(null, null, result));
            }).catch((erro) => {
                res.status(500).json(new model_1.Resposta(erro));
            });
        }
    }
    getCidadePorId(req, res, next) {
        let id = req.params["id"];
        index_1.CidadeDAO.buscaCidadePorId(id)
            .then((resultado) => {
            res.json(new model_1.Resposta(null, null, resultado));
        })
            .catch((erro) => {
            res.status(500).json(new model_1.Resposta(erro));
        });
    }
    init() {
        this.router.get("/", this.getTodasCidadesPorEstado);
        this.router.get("/:id", this.getCidadePorId);
    }
}
exports.cidade = new CidadeRoute().getRouter();
//# sourceMappingURL=cidade.route.js.map