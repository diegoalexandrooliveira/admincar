"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const model_1 = require("../model");
class CidadeController {
    static buscarTodasCidadesPorEstado(req, res, next) {
        let idEstado = req.params["idEstado"];
        index_1.CidadeDAO.buscaTodasCidadesPorEstado(idEstado)
            .then((resultado) => {
            res.json(new model_1.Resposta(null, null, resultado));
        })
            .catch((erro) => {
            res.status(500).json(new model_1.Resposta(erro));
        });
    }
}
exports.CidadeController = CidadeController;
//# sourceMappingURL=cidade.controller.js.map