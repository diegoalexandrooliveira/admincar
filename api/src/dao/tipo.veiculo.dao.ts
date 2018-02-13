import { clientFactory } from "../database/index";
import { QueryResult } from "pg";
import { TipoVeiculo, Mensagem } from "../model/index";
import { logger } from "../utils";


export class TipoVeiculoDAO {
    public static buscaTodosTipoVeiculo(): Promise<TipoVeiculo[]> {
        let query = `select id, descricao
                    from tipo_veiculo
                    order by id`;

        return new Promise((resolve, reject) => {
            clientFactory
                .query(query)
                .then((result: QueryResult) => {
                    let retorno: TipoVeiculo[];
                    if (result.rows.length > 0) {
                        retorno = [];
                        result.rows.map(dado => retorno.push(new TipoVeiculo(dado.id, dado.descricao)));
                    }
                    resolve(retorno);
                })
                .catch(error => {
                    logger.error(`tipo.veiculo.dao.buscaTodosTipoVeiculo - ${error}`);
                    reject(new Mensagem("Erro ao tentar recuperar os tipos de veículo.", "erro"));
                });
        });
    }

    public static buscaTipoVeiculoPorId(id: number): Promise<TipoVeiculo> {
        let query = `select id, descricao
                    from tipo_veiculo where id = $1`;

        return new Promise((resolve, reject) => {
            clientFactory
                .query(query, [id])
                .then((result: QueryResult) => {
                    let retorno: TipoVeiculo;
                    if (result.rows.length > 0) {
                        let dado = result.rows[0];
                        retorno = new TipoVeiculo(dado.id, dado.descricao);
                    }
                    resolve(retorno);
                })
                .catch(error => {
                    logger.error(`tipo.veiculo.dao.buscaTipoVeiculoPorId - ${error}`);
                    reject(new Mensagem(`Erro ao tentar recuperar o tipo de veículo ${id}.`, "erro"));
                });
        });
    }
}