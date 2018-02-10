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
    getMarcas(req, res, next) {
        index_1.MarcaDAO.buscarMarcas(req.params["tipoVeiculoId"])
            .then((resultado) => {
            res.json(resultado);
        }).catch((erro) => {
            res.status(500).json(erro);
        });
    }
    init() {
        this.router.get("/:tipoVeiculoId", this.getMarcas);
    }
}
exports.marca = new MarcaRoute().getRouter();
//# sourceMappingURL=marca.route.js.map