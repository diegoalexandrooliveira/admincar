"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class MarcaDAO {
    static buscarMarcas(tipoVeiculoId) {
        let query = "select id, descricao ";
        query += "from marca where tipo_veiculo_id = $1 ";
        query += "order by id";
        return new Promise((resolve, reject) => {
            index_1.connection
                .query(query, [tipoVeiculoId])
                .then((result) => {
                let retorno = [];
                result.rows.map(dado => retorno.push(new index_2.Marca(dado.id, dado.descricao, tipoVeiculoId)));
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(error);
                reject(new index_2.Erro("Erro ao tentar recuperar as marcas"));
            });
        });
    }
}
exports.MarcaDAO = MarcaDAO;
//# sourceMappingURL=marca.dao.js.map