import { Pool, QueryResult, PoolClient } from "pg";
import { logger } from "../utils";
import { configs } from "../config/configs";
import { Mensagem } from "../model";

class ClientFactory {
  private _pool: Pool = new Pool(configs.database);

  public getClient(): Promise<PoolClient> {
    return new Promise((resolve, reject) => {
      this._pool
        .connect()
        .then((client: PoolClient) => resolve(client))
        .catch(error => {
          logger.error(`connection.factory.getClient - ${error}`);
          reject("Não foi possível conectar ao banco de dados");
        });
    });
  }

  public commit(client: PoolClient): Promise<void> {
    return new Promise((resolve, reject) => {
      client
        .query("COMMIT")
        .then((result: QueryResult) => client.release())
        .then(() => resolve())
        .catch(error => {
          logger.error(`connection.factory.commit - ${error}`);
          reject(new Mensagem(`Erro ao realizar o commit.`, "erro"));
        });
    });
  }

  public rollback(client: PoolClient): Promise<PoolClient> {
    return new Promise((resolve, reject) => {
      client
        .query("ROLLBACK")
        .then((result: QueryResult) => client.release())
        .then(() => resolve())
        .catch(error => {
          logger.error(`connection.factory.rollback - ${error}`);
          reject(new Mensagem(`Erro ao realizar o rollback.`, "erro"));
        });
    });
  }

  public query(query: string, params?: any[]): Promise<QueryResult> {
    return this._pool.query(query, params);
  }
}

export let clientFactory = new ClientFactory();
