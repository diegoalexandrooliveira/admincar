"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class VeiculoRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    init() {
        // this.router.get("/", VeiculoController.veiculoGraphQL());
        // this.router.post("/", VeiculoController.inserirVeiculo);
        // this.router.put("/", VeiculoController.atualizarVeiculo);
        // this.router.delete("/:idVeiculo", VeiculoController.excluirVeiculo);
    }
}
exports.veiculo = new VeiculoRoute().getRouter();
//# sourceMappingURL=veiculo.route.js.map