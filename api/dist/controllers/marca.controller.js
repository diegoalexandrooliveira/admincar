"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const model_1 = require("../model");
class MarcaController {
    static buscarMarcasPorTipoDeVeiculo(req, res, next) {
        let idTipoVeiculo = req.params["idTipoVeiculo"];
        index_1.MarcaDAO.buscarMarcasPorTipoDeVeiculo(idTipoVeiculo)
            .then((resultado) => {
            res.json(new model_1.Resposta(null, null, resultado));
        }).catch((erro) => {
            res.status(500).json(new model_1.Resposta(erro));
        });
    }
}
exports.MarcaController = MarcaController;
//# sourceMappingURL=marca.controller.js.map