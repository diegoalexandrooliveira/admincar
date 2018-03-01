"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class ModeloDAO {
    static buscarModelosPorMarca(marcaId) {
        let query = `   select id, descricao from modelo where marca_id = $1`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [marcaId])
                .then((result) => {
                let retorno;
                if (result.rowCount > 0) {
                    retorno = [];
                    result.rows.map(dado => retorno.push(new index_2.Modelo(dado.id, dado.descricao, marcaId)));
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`modelo.dao.buscarModelosPorMarca - ${error}`);
                reject(`Erro ao tentar recuperar os modelos da marca ${marcaId}`);
            });
        });
    }
    static buscarModeloPorId(id) {
        let query = ` select id, descricao, marca_id from modelo where id = $1`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [id])
                .then((result) => {
                let retorno;
                let dado = result.rows[0];
                if (dado) {
                    retorno = new index_2.Modelo(id, dado.descricao, dado.marca_id);
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`modelo.dao.buscarModeloPorId - ${error}`);
                reject(`Erro ao tentar recuperar o modelo ${id}`);
            });
        });
    }
}
exports.ModeloDAO = ModeloDAO;
//# sourceMappingURL=modelo.dao.js.map