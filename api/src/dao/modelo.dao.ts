import { clientFactory } from "../database/index";
import { QueryResult } from "pg";
import { Marca, Mensagem, Modelo } from "../model/index";
import { logger } from "../utils";

export class ModeloDAO {
  public static buscarModelosPorMarca(marcaId: number): Promise<Modelo[]> {
    let query = `   select id, descricao from modelo where marca_id = $1`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [marcaId])
        .then((result: QueryResult) => {
          let retorno: Modelo[];
          if (result.rowCount > 0) {
            retorno = [];
            result.rows.map(dado =>
              retorno.push(new Modelo(dado.id, dado.descricao, marcaId))
            );
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`modelo.dao.buscarModelosPorMarca - ${error}`);
          reject(`Erro ao tentar recuperar os modelos da marca ${marcaId}`);
        });
    });
  }

  public static buscarModeloPorId(id: number): Promise<Modelo> {
    let query = ` select id, descricao, marca_id from modelo where id = $1`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [id])
        .then((result: QueryResult) => {
          let retorno: Modelo;
          let dado = result.rows[0];
          if (dado) {
            retorno = new Modelo(id, dado.descricao, dado.marca_id);
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(`modelo.dao.buscarModeloPorId - ${error}`);
          reject(`Erro ao tentar recuperar o modelo ${id}`);
        });
    });
  }
}
