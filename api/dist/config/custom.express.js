"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../routes/index");
class CustomExpress {
    constructor() {
        this._express = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        this._express.use("/api/v1/marca", routes.marca);
        this._express.use("/api/v1/modelo", routes.modelo);
    }
    getExpress() {
        return this._express;
    }
}
exports.CustomExpress = CustomExpress;
//# sourceMappingURL=custom.express.js.map