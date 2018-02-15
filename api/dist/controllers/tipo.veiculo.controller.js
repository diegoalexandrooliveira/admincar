"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const model_1 = require("../model");
class TipoVeiculoController {
    static buscarTodosTiposDeVeiculo(req, res, next) {
        index_1.TipoVeiculoDAO.buscaTodosTipoVeiculo()
            .then((resultado) => {
            res.json(new model_1.Resposta(null, null, resultado));
        }).catch((erro) => {
            res.status(500).json(new model_1.Resposta(erro));
        });
    }
    static buscarTipoDeVeiculoPorId(req, res, next) {
        let id = req.params["idTipoVeiculo"];
        index_1.TipoVeiculoDAO.buscaTipoVeiculoPorId(id)
            .then((resultado) => {
            res.json(new model_1.Resposta(null, null, resultado));
        }).catch((erro) => {
            res.status(500).json(new model_1.Resposta(erro));
        });
    }
}
exports.TipoVeiculoController = TipoVeiculoController;
//# sourceMappingURL=tipo.veiculo.controller.js.map