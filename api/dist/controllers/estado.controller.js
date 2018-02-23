"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const model_1 = require("../model");
class EstadoController {
    static buscarTodosEstados(req, res, next) {
        index_1.EstadoDAO.buscaTodosEstados()
            .then((resultado) => {
            res.json(new model_1.Resposta(null, null, resultado));
        })
            .catch((erro) => {
            res.status(500).json(new model_1.Resposta(erro));
        });
    }
    static buscarEstados() {
        return index_1.EstadoDAO.buscaTodosEstados();
    }
}
exports.EstadoController = EstadoController;
//# sourceMappingURL=estado.controller.js.map