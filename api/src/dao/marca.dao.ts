import { connection } from "../database/index";
import { QueryResult } from "pg";
import { Marca, Erro } from "../model/index";
import { logger } from "../utils";


export class MarcaDAO {
    public static buscarMarcasPorTipoDeVeiculo(tipoVeiculoId: Number): Promise<Marca[]> {
        let query = `select id, descricao
                    from marca where tipo_veiculo_id = $1
                    order by id`;

        return new Promise((resolve, reject) => {
            connection
                .query(query, [tipoVeiculoId])
                .then((result: QueryResult) => {
                    let retorno: Marca[];
                    if (result.rows.length > 0) {
                        retorno = [];
                        result.rows.map(dado => retorno.push(new Marca(dado.id, dado.descricao, tipoVeiculoId)));
                    }
                    resolve(retorno);
                })
                .catch(error => {
                    logger.error(`marca.dao.buscarMarcas - ${error}`);
                    reject(new Erro("Erro ao tentar recuperar as marcas"));
                });
        });
    }

    public static buscaMarcaPorId(id: number): Promise<Marca> {
        let query = `select descricao, tipo_veiculo_id
                     from marca where id = $1`;
        return new Promise((resolve, reject) => {
            connection.query(query, [id]).then((result: QueryResult) => {
                let retorno: Marca;
                if (result.rowCount > 0) {
                    retorno = new Marca(id, result.rows[0].descricao, result.rows[0].tipo_veiculo_id);
                }
                resolve(retorno);
            }).catch((error) => {
                logger.error(`marca.dao.buscaMarcaPorId - ${error}`);
                reject(new Erro(`Erro ao tentar recuperar a marca ${id}`));
            });
        });
    }
}