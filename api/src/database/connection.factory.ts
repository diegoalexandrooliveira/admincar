import * as pg from "pg";
import { logger } from "../utils";
import * as dataBaseConfigObject from "../../database.config";


export class ConnectionFactory {
    private _client: pg.Client = new pg.Client(dataBaseConfigObject);

    public getConnection(): pg.Client {
        console.log(dataBaseConfigObject);
        this._client.connect();
        return this._client;
    }
}