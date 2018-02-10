import { connection } from "../database/index";
import { QueryResult } from "pg";
import { Marca, Erro } from "../model/index";
import { logger } from "../utils";


export class MarcaDAO {
    public static buscarMarcas(tipoVeiculoId: Number): Promise<Marca[]> {
        let query = "select id, descricao ";
        query += "from marca where tipo_veiculo_id = $1 ";
        query += "order by id";

        return new Promise((resolve, reject) => {
            connection
                .query(query, [tipoVeiculoId])
                .then((result: QueryResult) => {
                    let retorno: Marca[] = [];
                    result.rows.map(dado => retorno.push(new Marca(dado.id, dado.descricao, tipoVeiculoId)));
                    resolve(retorno);
                })
                .catch(error => {
                    logger.error(error);
                    reject(new Erro("Erro ao tentar recuperar as marcas"));
                });
        });
    }
}