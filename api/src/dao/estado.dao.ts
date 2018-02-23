import { clientFactory } from "../database/index";
import { QueryResult } from "pg";
import { Estado, Mensagem } from "../model/index";
import { logger } from "../utils";
import { CidadeDAO } from ".";

export class EstadoDAO {
  public static buscaTodosEstados(): Promise<Estado[]> {
    let query = `select id, nome, sigla
                    from estados
                    order by nome`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query)
        .then((result: QueryResult) => {
          let retorno: Estado[];
          if (result.rows.length > 0) {
            retorno = [];
            result.rows.map(dado => {
              let estado = new Estado();
              estado.$id = dado.id;
              estado.$nome = dado.nome;
              estado.$sigla = dado.sigla;
              // estado.$cidades = await CidadeDAO.buscaTodasCidadesPorEstado(
              //   dado.id
              // );
              retorno.push(estado);
            });
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`estado.dao.buscaTodosEstados - ${error}`);
          reject("Erro ao tentar recuperar os estados.");
        });
    });
  }
  public static buscaEstadoPorId(id: number): Promise<Estado> {
    let query = `select id, nome, sigla
                    from estados where id = $1`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [id])
        .then((result: QueryResult) => {
          let retorno: Estado = new Estado();
          if (result.rows.length > 0) {
            let dado = result.rows[0];
            // retorno = new Estado(dado.id, dado.nome, dado.sigla);
            retorno.$id = dado.id;
            retorno.$nome = dado.nome;
            retorno.$sigla = dado.sigla;
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`estado.dao.buscaEstadoPorId - ${error}`);
          reject(`Erro ao tentar recuperar o estado ${id}.`);
        });
    });
  }
}
