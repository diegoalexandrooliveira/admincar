import { clientFactory } from "../database/index";
import { QueryResult } from "pg";
import { Combustivel, Mensagem } from "../model/index";
import { logger } from "../utils";

export class CombustivelDAO {
  public static buscaCombustivelPorId(
    idCombustivel: number
  ): Promise<Combustivel> {
    let query = `select descricao
                     from combustivel where id = $1`;
    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [idCombustivel])
        .then((result: QueryResult) => {
          let retorno: Combustivel;
          if (result.rowCount > 0) {
            retorno = new Combustivel(idCombustivel, result.rows[0].descricao);
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`combustivel.dao.buscaCombustivelPorId - ${error}`);
          reject(`Erro ao tentar recuperar o combustível ${idCombustivel}.`);
        });
    });
  }

  public static buscarTodosCombustiveis(): Promise<Combustivel[]> {
    let query = `select id, descricao
                     from combustivel order by descricao`;
    return new Promise((resolve, reject) => {
      clientFactory
        .query(query)
        .then((result: QueryResult) => {
          let retorno: Combustivel[];
          if (result.rowCount > 0) {
            retorno = [];
            result.rows.map(row =>
              retorno.push(new Combustivel(row.id, row.descricao))
            );
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`combustivel.dao.buscarTodosCombustiveis - ${error}`);
          reject(`Erro ao tentar recuperar os combustíveis.`);
        });
    });
  }
}
