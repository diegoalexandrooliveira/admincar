import { connection } from "../database/index";
import { QueryResult } from "pg";
import { Marca, Erro, Modelo } from "../model/index";
import { logger } from "../utils";


export class ModeloDAO {
    public static buscarModelosPorMarca(marcaId: Number): Promise<Modelo[]> {
        let query = `   select id, descricao 
                        from modelo where marca_id = $1
                        order by id`;

        return new Promise((resolve, reject) => {
            connection
                .query(query, [marcaId])
                .then((result: QueryResult) => {
                    let retorno: Modelo[];
                    if (result.rowCount > 0) {
                        retorno = [];
                        let marca = new Marca();
                        marca.setId(marcaId);
                        result.rows.map(dado => retorno.push(new Modelo(dado.id, dado.descricao, marca)));
                    }
                    resolve(retorno);
                })
                .catch(error => {
                    logger.error(`modelo.dao.buscarModelosPorMarca - ${error}`);
                    reject(new Erro(`Erro ao tentar recuperar os modelos da marca ${marcaId}`));
                });
        });
    }

    public static buscarModeloPorId(id: Number): Promise<Modelo> {
        let query = `   select modelo.descricao as modelo_descricao, marca.id as marca_id,
                        marca.descricao as marca_descricao, marca.tipo_veiculo_id 
                        from modelo inner join 
                        marca on modelo.marca_id = marca.id
                        where modelo.id = $1`;

        return new Promise((resolve, reject) => {
            connection
                .query(query, [id])
                .then((result: QueryResult) => {
                    let retorno: Modelo;
                    let dado = result.rows[0];
                    if (dado) {
                        retorno = new Modelo(id, dado.modelo_descricao,
                            new Marca(dado.marca_id, dado.marca_descricao, dado.tipo_veiculo_id));
                    }
                    resolve(retorno);
                })
                .catch(error => {
                    logger.error(`modelo.dao.buscarModeloPorId - ${error}`);
                    reject(new Erro(`Erro ao tentar recuperar o modelo ${id}`));
                });
        });
    }
}