import { clientFactory } from "../database/index";
import { QueryResult } from "pg";
import { Marca, Mensagem } from "../model/index";
import { logger } from "../utils";

export class MarcaDAO {
  public static buscarMarcasPorTipoDeVeiculo(
    tipoVeiculoId: number
  ): Promise<Marca[]> {
    let query = `select id, descricao
                    from marca where tipo_veiculo_id = $1
                    order by descricao`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [tipoVeiculoId])
        .then((result: QueryResult) => {
          let retorno: Marca[];
          if (result.rows.length > 0) {
            retorno = [];
            result.rows.map(dado =>
              retorno.push(new Marca(dado.id, dado.descricao, tipoVeiculoId))
            );
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`marca.dao.buscarMarcas - ${error}`);
          reject("Erro ao tentar recuperar as marcas");
        });
    });
  }

  public static buscarTodasMarcas(): Promise<Marca[]> {
    let query = `select id, descricao, tipo_veiculo_id
                    from marca
                    order by id`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query)
        .then((result: QueryResult) => {
          let retorno: Marca[];
          if (result.rows.length > 0) {
            retorno = [];
            result.rows.map(dado =>
              retorno.push(
                new Marca(dado.id, dado.descricao, dado.tipo_veiculo_id)
              )
            );
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`marca.dao.buscarTodasMarcas - ${error}`);
          reject("Erro ao tentar recuperar as marcas");
        });
    });
  }

  public static buscaMarcaPorId(id: number): Promise<Marca> {
    let query = `select descricao, tipo_veiculo_id
                     from marca where id = $1`;
    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [id])
        .then((result: QueryResult) => {
          let retorno: Marca;
          if (result.rowCount > 0) {
            retorno = new Marca(
              id,
              result.rows[0].descricao,
              result.rows[0].tipo_veiculo_id
            );
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`marca.dao.buscaMarcaPorId - ${error}`);
          reject(`Erro ao tentar recuperar a marca ${id}`);
        });
    });
  }
}
