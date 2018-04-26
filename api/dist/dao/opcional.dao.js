"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class OpcionalDAO {
    static buscaOpcionalPorId(idOpcional) {
        let query = `select descricao
                     from opcional where id = $1`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [idOpcional])
                .then((result) => {
                let retorno;
                if (result.rowCount > 0) {
                    retorno = new index_2.Opcional(idOpcional, result.rows[0].descricao);
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`opcional.dao.buscaOpcionalPorId - ${error}`);
                reject(`Erro ao tentar recuperar o opcional ${idOpcional}.`);
            });
        });
    }
    static buscarTodosOpcionais() {
        let query = `select id, descricao
                     from opcional
                     order by id`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query)
                .then((result) => {
                let retorno;
                if (result.rowCount > 0) {
                    retorno = result.rows.map(row => new index_2.Opcional(row.id, row.descricao));
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`opcional.dao.buscarTodosOpcionais - ${error}`);
                reject(`Erro ao tentar recuperar os opcionais.`);
            });
        });
    }
    static buscarTodosOpcionaisPorVeiculo(idVeiculo) {
        let query = `select op.id, op.descricao
                     from opcional op inner join veiculo_opcional vop
                     on op.id = vop.opcional_id
                     where vop.veiculo_id = $1
                     order by id`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [idVeiculo])
                .then((result) => {
                let retorno;
                if (result.rowCount > 0) {
                    retorno = result.rows.map(row => new index_2.Opcional(row.id, row.descricao));
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`opcional.dao.buscarTodosOpcionaisPorVeiculo - ${error}`);
                reject(`Erro ao tentar recuperar os opcionais do veículo ${idVeiculo}.`);
            });
        });
    }
}
exports.OpcionalDAO = OpcionalDAO;
//# sourceMappingURL=opcional.dao.js.map