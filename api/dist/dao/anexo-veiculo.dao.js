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
}
exports.AnexoVeiculoDAO = AnexoVeiculoDAO;
//# sourceMappingURL=anexo-veiculo.dao.js.map