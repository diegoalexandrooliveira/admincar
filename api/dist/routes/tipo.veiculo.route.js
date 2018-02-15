"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/index");
class TipoVeiculoRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    init() {
        this.router.get("/", index_1.TipoVeiculoController.buscarTodosTiposDeVeiculo);
        this.router.get("/:idTipoVeiculo", index_1.TipoVeiculoController.buscarTipoDeVeiculoPorId);
        this.router.get("/:idTipoVeiculo/marcas", index_1.MarcaController.buscarMarcasPorTipoDeVeiculo);
        this.router.get("/:idTipoVeiculo/marcas/:idMarca/modelos", index_1.ModeloController.buscarModelosPorTipoVeiculoEMarca);
    }
}
exports.tipoDeVeiculo = new TipoVeiculoRoute().getRouter();
//# sourceMappingURL=tipo.veiculo.route.js.map