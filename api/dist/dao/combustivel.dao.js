"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class CombustivelDAO {
    static buscaCombustivelPorId(idCombustivel) {
        let query = `select descricao
                     from combustivel where id = $1`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [idCombustivel])
                .then((result) => {
                let retorno;
                if (result.rowCount > 0) {
                    retorno = new index_2.Combustivel(idCombustivel, result.rows[0].descricao);
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`combustivel.dao.buscaCombustivelPorId - ${error}`);
                reject(`Erro ao tentar recuperar o combustível ${idCombustivel}.`);
            });
        });
    }
    static buscarTodosCombustiveis() {
        let query = `select id, descricao
                     from combustivel order by id`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query)
                .then((result) => {
                let retorno;
                if (result.rowCount > 0) {
                    retorno = [];
                    result.rows.map(row => retorno.push(new index_2.Combustivel(row.id, row.descricao)));
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`combustivel.dao.buscarTodosCombustiveis - ${error}`);
                reject(`Erro ao tentar recuperar os combustíveis.`);
            });
        });
    }
}
exports.CombustivelDAO = CombustivelDAO;
//# sourceMappingURL=combustivel.dao.js.map