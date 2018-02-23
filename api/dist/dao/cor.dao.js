"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class CorDAO {
    static buscaCorPorId(idCor) {
        let query = `select descricao
                     from cor where id = $1`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [idCor])
                .then((result) => {
                let retorno;
                if (result.rowCount > 0) {
                    retorno = new index_2.Cor(idCor, result.rows[0].descricao);
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`cor.dao.buscaCorPorId - ${error}`);
                reject(`Erro ao tentar recuperar a cor ${idCor}.`);
            });
        });
    }
    static buscarTodasCores() {
        let query = `select id, descricao
                     from cor`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query)
                .then((result) => {
                let retorno;
                if (result.rowCount > 0) {
                    retorno = [];
                    result.rows.map(row => retorno.push(new index_2.Cor(row.id, row.descricao)));
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`cor.dao.buscarTodasCores - ${error}`);
                reject(`Erro ao tentar recuperar as cores.`);
            });
        });
    }
}
exports.CorDAO = CorDAO;
//# sourceMappingURL=cor.dao.js.map