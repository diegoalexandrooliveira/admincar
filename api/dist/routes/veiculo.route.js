"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/index");
class VeiculoRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    init() {
        this.router.get("/", index_1.VeiculoController.veiculoGraphQL());
        this.router.post("/", index_1.VeiculoController.inserirVeiculo);
    }
}
exports.veiculo = new VeiculoRoute().getRouter();
//# sourceMappingURL=veiculo.route.js.map