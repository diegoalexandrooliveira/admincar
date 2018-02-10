"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../database/index");
const utils_1 = require("../utils");
class MarcaRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    getMarcas(req, res, next) {
        let connection = new index_1.ConnectionFactory().getConnection();
        connection.query("select id, descricao from marca order by id").then(result => {
            connection.end();
            res.json(result.rows);
        }).catch(error => {
            connection.end();
            utils_1.logger.error(error);
            res.status(500).send("Ocorreu um problema ao tentar recuperar as marcas.");
        });
    }
    init() {
        this.router.get("/", this.getMarcas);
    }
}
exports.marca = new MarcaRoute().getRouter();
//# sourceMappingURL=marca.route.js.map