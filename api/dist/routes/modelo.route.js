"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ModeloRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    getModelos(req, res, next) {
        console.log(req.params["marcaId"]);
        let retorno = [{
                id: 1,
                nome: "Gol",
                marcaId: 1
            }];
        res.json(retorno);
    }
    init() {
        this.router.get("/:marcaId", this.getModelos);
    }
}
exports.modelo = new ModeloRoute().getRouter();
//# sourceMappingURL=modelo.route.js.map