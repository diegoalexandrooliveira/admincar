"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg = require("pg");
const dataBaseConfigObject = require("../../database.config");
class ConnectionFactory {
    constructor() {
        this._client = new pg.Client(dataBaseConfigObject);
    }
    getConnection() {
        console.log(dataBaseConfigObject);
        this._client.connect();
        return this._client;
    }
}
exports.ConnectionFactory = ConnectionFactory;
//# sourceMappingURL=connection.factory.js.map