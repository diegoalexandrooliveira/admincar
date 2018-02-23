"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class EstadoDAO {
    static buscaTodosEstados() {
        let query = `select id, nome, sigla
                    from estados
                    order by nome`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query)
                .then((result) => {
                let retorno;
                if (result.rows.length > 0) {
                    retorno = [];
                    result.rows.map(dado => {
                        let estado = new index_2.Estado(dado.id, dado.nome, dado.sigla);
                        retorno.push(estado);
                    });
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`estado.dao.buscaTodosEstados - ${error}`);
                reject("Erro ao tentar recuperar os estados.");
            });
        });
    }
    static buscaEstadoPorId(id) {
        let query = `select id, nome, sigla
                    from estados where id = $1`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [id])
                .then((result) => {
                let retorno;
                if (result.rows.length > 0) {
                    let dado = result.rows[0];
                    retorno = new index_2.Estado(dado.id, dado.nome, dado.sigla);
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`estado.dao.buscaEstadoPorId - ${error}`);
                reject(`Erro ao tentar recuperar o estado ${id}.`);
            });
        });
    }
}
exports.EstadoDAO = EstadoDAO;
//# sourceMappingURL=estado.dao.js.map