"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../model/index");
const index_2 = require("../database/index");
const utils_1 = require("../utils");
class AnexoVeiculoDAO {
    static buscaAnexoPrincipalPorVeiculo(veiculoId) {
        let query = `select id, tipo_arquivo, 
    url, principal from anexo_veiculo where veiculo_id = $1 and principal = TRUE`;
        return new Promise((resolve, reject) => {
            index_2.clientFactory
                .query(query, [veiculoId])
                .then((result) => {
                let anexo = new index_1.AnexoVeiculo();
                if (result.rowCount > 0) {
                    anexo.$id = result.rows[0].id;
                    anexo.$tipoArquivo = result.rows[0].tipo_arquivo;
                    anexo.$url = result.rows[0].url;
                    anexo.$principal = result.rows[0].principal;
                }
                resolve(anexo);
            })
                .catch(error => {
                utils_1.logger.error(`anexo-veiculo.dao.buscaAnexoPrincipalPorVeiculo - ${error}`);
                reject(`Erro ao tentar recuperar o anexo do veículo ${veiculoId}`);
            });
        });
    }
    static buscaAnexoPorId(id) {
        let query = `select id, tipo_arquivo, 
    url, principal from anexo_veiculo where id = $1`;
        return new Promise((resolve, reject) => {
            index_2.clientFactory
                .query(query, [id])
                .then((result) => {
                let anexo = new index_1.AnexoVeiculo();
                if (result.rowCount > 0) {
                    anexo.$id = result.rows[0].id;
                    anexo.$tipoArquivo = result.rows[0].tipo_arquivo;
                    anexo.$url = result.rows[0].url;
                    anexo.$principal = result.rows[0].principal;
                }
                resolve(anexo);
            })
                .catch(error => {
                utils_1.logger.error(`anexo-veiculo.dao.buscaAnexoPorId - ${error}`);
                reject(`Erro ao tentar recuperar o anexo ${id}`);
            });
        });
    }
    static buscarTodosAnexosPorVeiculo(veiculoId) {
        let query = `select id, tipo_arquivo, 
    url, principal from anexo_veiculo where veiculo_id = $1 order by principal desc, id`;
        return new Promise((resolve, reject) => {
            index_2.clientFactory
                .query(query, [veiculoId])
                .then((result) => {
                let anexo = new index_1.AnexoVeiculo();
                let retorno = [];
                if (result.rowCount > 0) {
                    anexo.$id = result.rows[0].id;
                    anexo.$tipoArquivo = result.rows[0].tipo_arquivo;
                    anexo.$url = result.rows[0].url;
                    anexo.$principal = result.rows[0].principal;
                }
                if (result.rows.length) {
                    retorno = result.rows.map(anexo => new index_1.AnexoVeiculo(anexo.id, anexo.tipo_arquivo, anexo.url, anexo.principal));
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`anexo-veiculo.dao.buscarTodosAnexosPorVeiculo - ${error}`);
                reject(`Erro ao tentar recuperar os anexos do veículo ${veiculoId}`);
            });
        });
    }
    static inserirAnexo(client, anexo) {
        let insert = `insert into anexo_veiculo (tipo_arquivo, url, principal, veiculo_id) 
                  values ($1, $2, $3, $4) returning id`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(insert, [
                anexo.$tipoArquivo,
                anexo.$url,
                anexo.$principal,
                anexo.$veiculoId
            ]))
                .then((result) => {
                resolve(result.rows[0].id);
            })
                .catch(error => {
                utils_1.logger.error(`anexo-veiculo.dao.inserirAnexo - ${error}`);
                reject(`Erro ao inserir o anexo ${anexo.$url}`);
            });
        });
    }
    static atualizarAnexo(client, anexo) {
        let update = `update anexo_veiculo set tipo_arquivo = $1, principal= $2
                  where id = $3`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(update, [
                anexo.$tipoArquivo,
                anexo.$principal,
                anexo.$id
            ]))
                .then((result) => {
                resolve(result.rowCount);
            })
                .catch(error => {
                utils_1.logger.error(`anexo-veiculo.dao.atualizarAnexo - ${error}`);
                reject(`Erro ao atualizar o anexo ${anexo.$url}`);
            });
        });
    }
    static excluirAnexoVeiculo(client, id) {
        let sqlDelete = `delete from anexo_veiculo where id = $1`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(sqlDelete, [id]))
                .then((result) => resolve(result.rowCount))
                .catch(error => {
                utils_1.logger.error(`anexo-veiculo.dao.excluirAnexoVeiculo - ${error}`);
                reject(`Erro ao excluir o anexo ${id}`);
            });
        });
    }
    static excluirTodosAnexoPorVeiculo(client, veiculoId) {
        let sqlDelete = `delete from anexo_veiculo where veiculo_id = $1`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(sqlDelete, [veiculoId]))
                .then((result) => resolve(result.rowCount))
                .catch(error => {
                utils_1.logger.error(`anexo-veiculo.dao.excluirTodosAnexoPorVeiculo - ${error}`);
                reject(`Erro ao excluir os anexos do veículo ${veiculoId}`);
            });
        });
    }
}
exports.AnexoVeiculoDAO = AnexoVeiculoDAO;
//# sourceMappingURL=anexo-veiculo.dao.js.map