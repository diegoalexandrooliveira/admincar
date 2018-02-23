"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const index_1 = require("../graphql/index");
class EstadoRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    init() {
        this.router.post("/", apollo_server_express_1.graphqlExpress({ schema: index_1.schema }));
    }
}
exports.estado = new EstadoRoute().getRouter();
//# sourceMappingURL=estado.route.js.map