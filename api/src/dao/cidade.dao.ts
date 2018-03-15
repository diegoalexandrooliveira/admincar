import { clientFactory } from "../database/index";
import { QueryResult } from "pg";
import { Cidade, Mensagem } from "../model/index";
import { logger } from "../utils";

export class CidadeDAO {
  public static buscaTodasCidadesPorEstado(
    estado_id: number
  ): Promise<Cidade[]> {
    let query = `select id, nome
                    from cidades where estado_id = $1 
                    order by nome`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [estado_id])
        .then((result: QueryResult) => {
          let retorno: Cidade[];
          if (result.rows.length > 0) {
            retorno = [];
            result.rows.map(dado => {
              retorno.push(new Cidade(dado.id, dado.nome, estado_id));
            });
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`cidade.dao.buscaTodasCidadesPorEstado - ${error}`);
          reject(`Erro ao tentar recuperar as cidades do estado ${estado_id}.`);
        });
    });
  }

  public static buscaCidadePorId(id: number): Promise<Cidade> {
    let query = `select id, nome, estado_id
                    from cidades where id = $1`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [id])
        .then((result: QueryResult) => {
          let retorno: Cidade;
          if (result.rows.length > 0) {
            let dado = result.rows[0];
            retorno = new Cidade(dado.id, dado.nome, dado.estado_id);
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`cidade.dao.buscaCidadePorId - ${error}`);
          reject(`Erro ao tentar recuperar a cidade ${id}.`);
        });
    });
  }
}
