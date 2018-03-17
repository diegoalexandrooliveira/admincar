"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const utils_1 = require("../utils");
const configs_1 = require("../config/configs");
const model_1 = require("../model");
class ClientFactory {
    constructor() {
        this._pool = new pg_1.Pool(configs_1.configs.database);
    }
    getClient() {
        return new Promise((resolve, reject) => {
            this._pool
                .connect()
                .then((client) => resolve(client))
                .catch(error => {
                utils_1.logger.error(`connection.factory.getClient - ${error}`);
                reject("Não foi possível conectar ao banco de dados");
            });
        });
    }
    commit(client) {
        return new Promise((resolve, reject) => {
            client
                .query("COMMIT")
                .then((result) => client.release())
                .then(() => resolve())
                .catch(error => {
                utils_1.logger.error(`connection.factory.commit - ${error}`);
                reject(new model_1.Mensagem(`Erro ao realizar o commit.`, "erro"));
            });
        });
    }
    rollback(client) {
        return new Promise((resolve, reject) => {
            client
                .query("ROLLBACK")
                .then((result) => client.release())
                .then(() => resolve())
                .catch(error => {
                utils_1.logger.error(`connection.factory.rollback - ${error}`);
                reject(new model_1.Mensagem(`Erro ao realizar o rollback.`, "erro"));
            });
        });
    }
    query(query, params) {
        return this._pool.query(query, params);
    }
}
exports.clientFactory = new ClientFactory();
//# sourceMappingURL=client.factory.js.map