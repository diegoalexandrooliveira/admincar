"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class ModeloDAO {
    static buscarModelosPorMarca(marcaId) {
        let query = `   select id, descricao 
                        from modelo where marca_id = $1
                        order by id`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, [marcaId])
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
                if (dado) {
                    retorno = new index_2.Modelo(id, dado.modelo_descricao, new index_2.Marca(dado.marca_id, dado.marca_descricao, dado.tipo_veiculo_id));
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`modelo.dao.buscarModeloPorId - ${error}`);
                reject(new index_2.Mensagem(`Erro ao tentar recuperar o modelo ${id}`, "erro"));
            });
        });
    }
}
exports.ModeloDAO = ModeloDAO;
//# sourceMappingURL=modelo.dao.js.map