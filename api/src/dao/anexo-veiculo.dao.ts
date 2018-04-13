import { Mensagem, AnexoVeiculo } from "../model/index";
import { clientFactory } from "../database/index";
import { QueryResult, Client, Query } from "pg";
import { logger } from "../utils";

export class AnexoVeiculoDAO {
  public static buscaAnexoPrincipalPorVeiculo(
    veiculoId: number
  ): Promise<AnexoVeiculo> {
    let query = `select id, tipo_arquivo, 
    url, principal from anexo_veiculo where veiculo_id = $1 and principal = TRUE`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [veiculoId])
        .then((result: QueryResult) => {
          let anexo = new AnexoVeiculo();
          if (result.rowCount > 0) {
            anexo.$id = result.rows[0].id;
            anexo.$tipoArquivo = result.rows[0].tipo_arquivo;
            anexo.$url = result.rows[0].url;
            anexo.$principal = result.rows[0].principal;
          }
          resolve(anexo);
        })
        .catch(error => {
          logger.error(
            `anexo-veiculo.dao.buscaAnexoPrincipalPorVeiculo - ${error}`
          );
          reject(`Erro ao tentar recuperar o anexo do veículo ${veiculoId}`);
        });
    });
  }

  public static buscarTodosAnexosPorVeiculo(
    veiculoId: number
  ): Promise<AnexoVeiculo[]> {
    let query = `select id, tipo_arquivo, 
    url, principal from anexo_veiculo where veiculo_id = $1 order by principal desc, id`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [veiculoId])
        .then((result: QueryResult) => {
          let anexo = new AnexoVeiculo();
          let retorno: AnexoVeiculo[] = [];
          if (result.rowCount > 0) {
            anexo.$id = result.rows[0].id;
            anexo.$tipoArquivo = result.rows[0].tipo_arquivo;
            anexo.$url = result.rows[0].url;
            anexo.$principal = result.rows[0].principal;
          }
          if (result.rows.length) {
            retorno = result.rows.map(
              anexo =>
                new AnexoVeiculo(
                  anexo.id,
                  anexo.tipo_arquivo,
                  anexo.url,
                  anexo.principal
                )
            );
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(
            `anexo-veiculo.dao.buscarTodosAnexosPorVeiculo - ${error}`
          );
          reject(`Erro ao tentar recuperar os anexos do veículo ${veiculoId}`);
        });
    });
  }

  public static inserirAnexo(
    client: Client,
    anexo: AnexoVeiculo
  ): Promise<number> {
    let insert = `insert into anexo_veiculo (tipo_arquivo, url, principal, veiculo_id) 
                  values ($1, $2, $3, $4) returning id`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() =>
          client.query(insert, [
            anexo.$tipoArquivo,
            anexo.$url,
            anexo.$principal,
            anexo.$veiculoId
          ])
        )
        .then((result: QueryResult) => {
          resolve(result.rows[0].id);
        })
        .catch(error => {
          logger.error(`anexo-veiculo.dao.inserirAnexo - ${error}`);
          reject(`Erro ao inserir o anexo ${anexo.$url}`);
        });
    });
  }

  public static atualizarAnexo(
    client: Client,
    anexo: AnexoVeiculo
  ): Promise<number> {
    let update = `update anexo_veiculo set tipo_arquivo = $1, principal= $2
                  where id = $3`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() =>
          client.query(update, [
            anexo.$tipoArquivo,
            anexo.$principal,
            anexo.$id
          ])
        )
        .then((result: QueryResult) => {
          resolve(result.rowCount);
        })
        .catch(error => {
          logger.error(`anexo-veiculo.dao.atualizarAnexo - ${error}`);
          reject(`Erro ao atualizar o anexo ${anexo.$url}`);
        });
    });
  }

  public static excluirAnexoVeiculo(
    client: Client,
    id: number
  ): Promise<number> {
    let sqlDelete = `delete from anexo_veiculo where id = $1`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() => client.query(sqlDelete, [id]))
        .then((result: QueryResult) => resolve(result.rowCount))
        .catch(error => {
          logger.error(`anexo-veiculo.dao.excluirAnexoVeiculo - ${error}`);
          reject(`Erro ao excluir o anexo ${id}`);
        });
    });
  }

  public static excluirTodosAnexoPorVeiculo(
    client: Client,
    veiculoId: number
  ): Promise<number> {
    let sqlDelete = `delete from anexo_veiculo where veiculo_id = $1`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() => client.query(sqlDelete, [veiculoId]))
        .then((result: QueryResult) => resolve(result.rowCount))
        .catch(error => {
          logger.error(
            `anexo-veiculo.dao.excluirTodosAnexoPorVeiculo - ${error}`
          );
          reject(`Erro ao excluir os anexos do veículo ${veiculoId}`);
        });
    });
  }
}
