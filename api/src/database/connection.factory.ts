import { Pool, Client, QueryResult, QueryConfig } from "pg";
import { logger } from "../utils";
import * as dataBaseConfigObject from "../../database.config";
import { Erro } from "../model";


class ConnectionFactory {
    private _pool: Pool = new Pool(dataBaseConfigObject);
    private _client: Client;

    public getConnection(): Promise<Client> {
        return new Promise((resolve, reject) => {
            this._pool.connect()
                .then((client: Client) =>
                    resolve(client)
                )
                .catch(error => {
                    logger.error(error);
                    reject(new Erro("Não foi possível conectar ao banco de dados"));
                });
        });
    }

    public query(query: string | QueryConfig, params?: any[]): Promise<QueryResult> {
        if (typeof query === 'string') {
            return this._pool.query(query, params);
        } else {
            return this._pool.query(query);
        }
    }
}

export let connection = new ConnectionFactory();