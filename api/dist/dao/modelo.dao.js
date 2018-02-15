"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class ModeloDAO {
    static buscarModelosPorTipoVeiculoEMarca(tipoVeiculoId, marcaId) {
        let query = `   select mo.id, mo.descricao 
                        from modelo mo inner join marca ma
                        on mo.marca_id = ma.id
                        where ma.tipo_veiculo_id = $1
                        and mo.marca_id = $2
                        order by mo.id`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [tipoVeiculoId, marcaId])
                .then((result) => {
                let retorno;
                if (result.rowCount > 0) {
                    retorno = [];
                    let marca = new index_2.Marca();
                    marca.setId(marcaId);
                    result.rows.map(dado => retorno.push(new index_2.Modelo(dado.id, dado.descricao, marca)));
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`modelo.dao.buscarModelosPorMarca - ${error}`);
                reject(new index_2.Mensagem(`Erro ao tentar recuperar os modelos da marca ${marcaId}`, "erro"));
            });
        });
    }
}
exports.ModeloDAO = ModeloDAO;
//# sourceMappingURL=modelo.dao.js.map