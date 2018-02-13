"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class TipoVeiculoDAO {
    static buscaTodosTipoVeiculo() {
        let query = `select id, descricao
                    from tipo_veiculo
                    order by id`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query)
                .then((result) => {
                let retorno;
                if (result.rows.length > 0) {
                    retorno = [];
                    result.rows.map(dado => retorno.push(new index_2.TipoVeiculo(dado.id, dado.descricao)));
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`tipo.veiculo.dao.buscaTodosTipoVeiculo - ${error}`);
                reject(new index_2.Mensagem("Erro ao tentar recuperar os tipos de veículo.", "erro"));
            });
        });
    }
    static buscaTipoVeiculoPorId(id) {
        let query = `select id, descricao
                    from tipo_veiculo where id = $1`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [id])
                .then((result) => {
                let retorno;
                if (result.rows.length > 0) {
                    let dado = result.rows[0];
                    retorno = new index_2.TipoVeiculo(dado.id, dado.descricao);
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`tipo.veiculo.dao.buscaTipoVeiculoPorId - ${error}`);
                reject(new index_2.Mensagem(`Erro ao tentar recuperar o tipo de veículo ${id}.`, "erro"));
            });
        });
    }
}
exports.TipoVeiculoDAO = TipoVeiculoDAO;
//# sourceMappingURL=tipo.veiculo.dao.js.map