"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
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
                // if (result.rowCount > 0) {
                //   retorno = [];
                //   let marca = new Marca();
                //   marca.setId(marcaId);
                //   result.rows.map(dado =>
                //     retorno.push(new Modelo(dado.id, dado.descricao, marca))
                //   );
                // }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`modelo.dao.buscarModelosPorMarca - ${error}`);
                reject(`Erro ao tentar recuperar os modelos da marca ${marcaId}`);
            });
        });
    }
    static buscarModeloPorId(id) {
        let query = `   select modelo.descricao as modelo_descricao, marca.id as marca_id,
                        marca.descricao as marca_descricao, marca.tipo_veiculo_id 
                        from modelo inner join 
                        marca on modelo.marca_id = marca.id
                        where modelo.id = $1`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [id])
                .then((result) => {
                let retorno;
                let dado = result.rows[0];
                // if (dado) {
                //   retorno = new Modelo(
                //     id,
                //     dado.modelo_descricao,
                //     new Marca(
                //       dado.marca_id,
                //       dado.marca_descricao,
                //       dado.tipo_veiculo_id
                //     )
                //   );
                // }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`modelo.dao.buscarModeloPorId - ${error}`);
                reject(`Erro ao tentar recuperar o modelo ${id}`);
            });
        });
    }
}
exports.ModeloDAO = ModeloDAO;
//# sourceMappingURL=modelo.dao.js.map