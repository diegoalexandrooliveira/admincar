"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const utils_1 = require("../utils");
const dataBaseConfigObject = require("../../database.config");
const model_1 = require("../model");
class ConnectionFactory {
    constructor() {
        this._pool = new pg_1.Pool(dataBaseConfigObject);
    }
    getConnection() {
        return new Promise((resolve, reject) => {
            this._pool.connect()
                .then((client) => resolve(client))
                .catch(error => {
                utils_1.logger.error(error);
                reject(new model_1.Erro("Não foi possível conectar ao banco de dados"));
            });
        });
    }
    query(query, params) {
        return this._pool.query(query, params);
    }
}
exports.connection = new ConnectionFactory();
//# sourceMappingURL=connection.factory.js.map