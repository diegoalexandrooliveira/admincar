"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class MarcaRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    getMarcas(req, res, next) {
        let retorno = [{
                id: 1,
                nome: "Volkswagen"
            }];
        res.json(retorno);
    }
    init() {
        this.router.get("/", this.getMarcas);
    }
}
exports.marca = new MarcaRouter().getRouter();
//# sourceMappingURL=MarcaRouter.js.map