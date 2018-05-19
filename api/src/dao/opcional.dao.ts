import { clientFactory } from "../database/index";
import { QueryResult, Client } from "pg";
import { Opcional, Mensagem } from "../model/index";
import { logger } from "../utils";

export class OpcionalDAO {
  public static buscaOpcionalPorId(idOpcional: number): Promise<Opcional> {
    let query = `select descricao
                     from opcional where id = $1`;
    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [idOpcional])
        .then((result: QueryResult) => {
          let retorno: Opcional;
          if (result.rowCount > 0) {
            retorno = new Opcional(idOpcional, result.rows[0].descricao);
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`opcional.dao.buscaOpcionalPorId - ${error}`);
          reject(`Erro ao tentar recuperar o opcional ${idOpcional}.`);
        });
    });
  }

  public static buscarTodosOpcionais(): Promise<Opcional[]> {
    let query = `select id, descricao
                     from opcional
                     order by id`;
    return new Promise((resolve, reject) => {
      clientFactory
        .query(query)
        .then((result: QueryResult) => {
          let retorno: Opcional[];
          if (result.rowCount > 0) {
            retorno = result.rows.map(
              row => new Opcional(row.id, row.descricao)
            );
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`opcional.dao.buscarTodosOpcionais - ${error}`);
          reject(`Erro ao tentar recuperar os opcionais.`);
        });
    });
  }

  public static buscarTodosOpcionaisPorVeiculo(
    idVeiculo: number
  ): Promise<Opcional[]> {
    let query = `select op.id, op.descricao
                     from opcional op inner join veiculo_opcional vop
                     on op.id = vop.opcional_id
                     where vop.veiculo_id = $1
                     order by op.id`;
    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [idVeiculo])
        .then((result: QueryResult) => {
          let retorno: Opcional[];
          if (result.rowCount > 0) {
            retorno = result.rows.map(
              row => new Opcional(row.id, row.descricao)
            );
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(
            `opcional.dao.buscarTodosOpcionaisPorVeiculo - ${error}`
          );
          reject(
            `Erro ao tentar recuperar os opcionais do veículo ${idVeiculo}.`
          );
        });
    });
  }

  public static excluirTodosOpcionaisVeiculo(
    client: Client,
    idVeiculo: number
  ): Promise<number> {
    let sqlDelete = `delete from veiculo_opcional where veiculo_id = $1`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() => client.query(sqlDelete, [idVeiculo]))
        .then((result: QueryResult) => {
          resolve(result.rowCount);
        })
        .catch(error => {
          logger.error(`opcional.dao.excluirTodosOpcionaisVeiculo - ${error}`);
          reject(`Erro ao excluir os opcionais do veículo ${idVeiculo}`);
        });
    });
  }

  public static inserirOpcionalPorVeiculo(
    client: Client,
    idOpcional: number,
    idVeiculo: number
  ): Promise<number> {
    let insert = `insert into veiculo_opcional (veiculo_id, opcional_id) values ($1, $2)`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() => client.query(insert, [idVeiculo, idOpcional]))
        .then((result: QueryResult) => {
          resolve(result.rowCount);
        })
        .catch(error => {
          logger.error(`opcional.dao.inserirOpcionalPorVeiculo - ${error}`);
          reject(
            `Erro ao inserir o opcional ${idOpcional} no veículo ${idVeiculo}`
          );
        });
    });
  }
}
