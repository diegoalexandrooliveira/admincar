"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/index");
class EstadoRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    init() {
        this.router.get("/", index_1.EstadoController.buscarTodosEstados);
        this.router.get("/:idEstado/cidades", index_1.CidadeController.buscarTodasCidadesPorEstado);
    }
}
exports.estado = new EstadoRoute().getRouter();
//# sourceMappingURL=estado.route.js.map