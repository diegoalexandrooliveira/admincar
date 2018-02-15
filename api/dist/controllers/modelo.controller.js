"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const model_1 = require("../model");
class ModeloController {
    static buscarModelosPorTipoVeiculoEMarca(req, res, next) {
        let idTipoVeiculo = req.params["idTipoVeiculo"];
        let idMarca = req.params["idMarca"];
        index_1.ModeloDAO.buscarModelosPorTipoVeiculoEMarca(idTipoVeiculo, idMarca)
            .then((result) => {
            res.json(new model_1.Resposta(null, null, result));
        }).catch((erro) => {
            res.status(500).json(new model_1.Resposta(erro));
        });
    }
}
exports.ModeloController = ModeloController;
//# sourceMappingURL=modelo.controller.js.map