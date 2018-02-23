import { clientFactory } from "../database/index";
import { QueryResult } from "pg";
import { Cor, Mensagem } from "../model/index";
import { logger } from "../utils";

export class CorDAO {
  public static buscaCorPorId(idCor: number): Promise<Cor> {
    let query = `select descricao
                     from cor where id = $1`;
    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [idCor])
        .then((result: QueryResult) => {
          let retorno: Cor;
          if (result.rowCount > 0) {
            retorno = new Cor(idCor, result.rows[0].descricao);
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`cor.dao.buscaCorPorId - ${error}`);
          reject(`Erro ao tentar recuperar a cor ${idCor}.`);
        });
    });
  }

  public static buscarTodasCores(): Promise<Cor[]> {
    let query = `select id, descricao
                     from cor`;
    return new Promise((resolve, reject) => {
      clientFactory
        .query(query)
        .then((result: QueryResult) => {
          let retorno: Cor[];
          if (result.rowCount > 0) {
            retorno = [];
            result.rows.map(row =>
              retorno.push(new Cor(row.id, row.descricao))
            );
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`cor.dao.buscarTodasCores - ${error}`);
          reject(`Erro ao tentar recuperar as cores.`);
        });
    });
  }
}
