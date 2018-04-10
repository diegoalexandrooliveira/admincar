import { clientFactory } from "../database/index";
import { QueryResult, Client } from "pg";
import { Veiculo, Mensagem } from "../model/index";
import { logger } from "../utils";

export class VeiculoDAO {
  public static buscarVeiculoPorId(idVeiculo: number): Promise<Veiculo> {
    return new Promise((resolve, reject) => {
      VeiculoDAO.buscarVeiculos(idVeiculo)
        .then((veiculos: Veiculo[]) => resolve(veiculos[0]))
        .catch((erro: Mensagem) => reject(erro));
    });
  }

  public static buscarTodosVeiculos(): Promise<Veiculo[]> {
    return VeiculoDAO.buscarVeiculos();
  }

  private static buscarVeiculos(idVeiculo?: number): Promise<Veiculo[]> {
    let query = `select id, modelo_id, ano_fabricacao, ano_modelo, placa, renavam, chassi, cor_id,
    cidade_id, data_inclusao, data_aquisicao, data_venda, valor_compra, valor_venda, valor_anunciado, observacoes,
    combustivel_id                    
    from veiculo `;

    let parameters = [];
    if (idVeiculo) {
      parameters.push(idVeiculo);
      query = query + " where id = $1 ";
    }

    query = query + " order by id ";

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, parameters)
        .then((result: QueryResult) => {
          let retorno: Veiculo[] = [];
          if (result.rows.length > 0) {
            result.rows.map(row => {
              retorno.push(
                new Veiculo(
                  row.id,
                  row.modelo_id,
                  row.ano_fabricacao,
                  row.ano_modelo,
                  row.placa,
                  row.renavam,
                  row.chassi,
                  row.cor_id,
                  row.cidade_id,
                  row.data_inclusao,
                  row.data_aquisicao,
                  row.data_venda,
                  row.valor_compra,
                  row.valor_venda,
                  row.valor_anunciado,
                  row.observacoes,
                  row.combustivel_id
                )
              );
            });
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`veiculo.dao.buscarTodosVeiculos - ${error}`);
          reject("Erro ao tentar recuperar os veículos.");
        });
    });
  }

  public static inserirVeiculo(
    client: Client,
    veiculo: Veiculo
  ): Promise<{ id: number; client: Client }> {
    let insert = `INSERT INTO veiculo(
      modelo_id, ano_fabricacao, ano_modelo, placa, renavam, chassi, 
      cidade_id, data_inclusao, valor_compra, valor_anunciado, valor_venda, 
      data_venda, observacoes, data_aquisicao, cor_id, combustivel_id)
      VALUES ($1, $2, $3, $4, $5, $6, 
        $7, $8, $9, $10, $11, 
        $12, $13, $14, $15, $16) returning id`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() =>
          client.query(insert, [
            veiculo.$modelo_id,
            veiculo.$anoFabricacao,
            veiculo.$anoModelo,
            veiculo.$placa,
            veiculo.$renavam,
            veiculo.$chassi,
            veiculo.$cidade_id,
            veiculo.$dataInclusao,
            veiculo.$valorCompra,
            veiculo.$valorAnuncio,
            veiculo.$valorVenda,
            veiculo.$dataVenda,
            veiculo.$observacoes,
            veiculo.$dataAquisicao,
            veiculo.$cor_id,
            veiculo.$combustivel_id
          ])
        )
        .then((result: QueryResult) =>
          resolve({ id: result.rows[0].id, client: client })
        )
        .catch(error => {
          logger.error(`veiculo.dao.inserirVeiculo - ${error}`);
          reject(new Mensagem(`Erro ao inserir o veículo.`, "erro"));
        });
    });
  }

  public static atualizarVeiculo(
    client: Client,
    veiculo: Veiculo
  ): Promise<{ rows: number; client: Client }> {
    let update = `UPDATE veiculo
    SET modelo_id=$1, ano_fabricacao=$2, ano_modelo=$3, placa=$4, renavam=$5, 
        chassi=$6, cidade_id=$7, valor_compra=$8, valor_anunciado=$9, 
        valor_venda=$10, data_venda=$11, observacoes=$12, data_aquisicao=$13, 
        cor_id=$14, combustivel_id=$15
  WHERE id = $16`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() =>
          client.query(update, [
            veiculo.$modelo_id,
            veiculo.$anoFabricacao,
            veiculo.$anoModelo,
            veiculo.$placa,
            veiculo.$renavam,
            veiculo.$chassi,
            veiculo.$cidade_id,
            veiculo.$valorCompra,
            veiculo.$valorAnuncio,
            veiculo.$valorVenda,
            veiculo.$dataVenda,
            veiculo.$observacoes,
            veiculo.$dataAquisicao,
            veiculo.$cor_id,
            veiculo.$combustivel_id,
            veiculo.$id
          ])
        )
        .then((result: QueryResult) => {
          resolve({ rows: result.rowCount, client: client });
        })
        .catch(error => {
          logger.error(`veiculo.dao.atualizarVeiculo - ${error}`);
          reject(
            new Mensagem(`Erro ao atualizar o veículo ${veiculo.$id}.`, "erro")
          );
        });
    });
  }

  public static deletarVeiculo(
    client: Client,
    idVeiculo: number
  ): Promise<number> {
    let deleteQ = `DELETE FROM veiculo WHERE id = $1`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() => client.query(deleteQ, [idVeiculo]))
        .then((result: QueryResult) => {
          resolve(result.rowCount);
        })
        .catch(error => {
          logger.error(`veiculo.dao.deletarVeiculo - ${error}`);
          reject(
            new Mensagem(`Erro ao deletar o veículo ${idVeiculo}.`, "erro")
          );
        });
    });
  }
}
