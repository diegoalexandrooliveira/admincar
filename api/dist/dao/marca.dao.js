"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class MarcaDAO {
    static buscarMarcasPorTipoDeVeiculo(tipoVeiculoId) {
        let query = `select id, descricao
                    from marca where tipo_veiculo_id = $1
                    order by id`;
        return new Promise((resolve, reject) => {
            index_1.connection
                .query(query, [tipoVeiculoId])
                .then((result) => {
                let retorno;
                if (result.rows.length > 0) {
                    retorno = [];
                    result.rows.map(dado => retorno.push(new index_2.Marca(dado.id, dado.descricao, tipoVeiculoId)));
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`marca.dao.buscarMarcas - ${error}`);
                reject(new index_2.Erro("Erro ao tentar recuperar as marcas"));
            });
        });
    }
    static buscaMarcaPorId(id) {
        let query = `select descricao, tipo_veiculo_id
                     from marca where id = $1`;
        return new Promise((resolve, reject) => {
            index_1.connection.query(query, [id]).then((result) => {
                let retorno;
                if (result.rowCount > 0) {
                    retorno = new index_2.Marca(id, result.rows[0].descricao, result.rows[0].tipo_veiculo_id);
                }
                resolve(retorno);
            }).catch((error) => {
                utils_1.logger.error(`marca.dao.buscaMarcaPorId - ${error}`);
                reject(new index_2.Erro(`Erro ao tentar recuperar a marca ${id}`));
            });
        });
    }
}
exports.MarcaDAO = MarcaDAO;
//# sourceMappingURL=marca.dao.js.map