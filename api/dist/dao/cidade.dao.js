"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class CidadeDAO {
    static buscaTodasCidadesPorEstado(estado_id) {
        let query = `select id, nome
                    from cidades where estado_id = $1 
                    order by nome`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [estado_id])
                .then((result) => {
                let retorno;
                if (result.rows.length > 0) {
                    retorno = [];
                    result.rows.map(dado => {
                        retorno.push(new index_2.Cidade(dado.id, dado.nome, estado_id));
                    });
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`cidade.dao.buscaTodasCidadesPorEstado - ${error}`);
                reject(`Erro ao tentar recuperar as cidades do estado ${estado_id}.`);
            });
        });
    }
    static buscaCidadePorId(id) {
        let query = `select id, nome, estado_id
                    from cidades where id = $1`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [id])
                .then((result) => {
                let retorno;
                if (result.rows.length > 0) {
                    let dado = result.rows[0];
                    retorno = new index_2.Cidade(dado.id, dado.nome, dado.estado_id);
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`cidade.dao.buscaCidadePorId - ${error}`);
                reject(`Erro ao tentar recuperar a cidade ${id}.`);
            });
        });
    }
}
exports.CidadeDAO = CidadeDAO;
//# sourceMappingURL=cidade.dao.js.map