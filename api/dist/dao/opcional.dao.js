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
                     order by op.id`;
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
    static excluirTodosOpcionaisVeiculo(client, idVeiculo) {
        let sqlDelete = `delete from veiculo_opcional where veiculo_id = $1`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(sqlDelete, [idVeiculo]))
                .then((result) => {
                resolve(result.rowCount);
            })
                .catch(error => {
                utils_1.logger.error(`opcional.dao.excluirTodosOpcionaisVeiculo - ${error}`);
                reject(`Erro ao excluir os opcionais do veículo ${idVeiculo}`);
            });
        });
    }
    static inserirOpcionalPorVeiculo(client, idOpcional, idVeiculo) {
        let insert = `insert into veiculo_opcional (veiculo_id, opcional_id) values ($1, $2)`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(insert, [idVeiculo, idOpcional]))
                .then((result) => {
                resolve(result.rowCount);
            })
                .catch(error => {
                utils_1.logger.error(`opcional.dao.inserirOpcionalPorVeiculo - ${error}`);
                reject(`Erro ao inserir o opcional ${idOpcional} no veículo ${idVeiculo}`);
            });
        });
    }
}
exports.OpcionalDAO = OpcionalDAO;
//# sourceMappingURL=opcional.dao.js.map