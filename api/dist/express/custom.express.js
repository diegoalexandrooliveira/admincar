"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../routes/index");
const passport = require("passport");
const index_1 = require("../auth/index");
class CustomExpress {
    constructor() {
        this._express = express();
        this.middlewares();
        this.privateRoutes();
        this.publicRoutes();
    }
    middlewares() {
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(passport.initialize());
        index_1.PassportStrategy.initialize(passport);
    }
    privateRoutes() {
        this._express.use("/api/v1/usuarios", passport.authenticate("jwt", { session: false }), routes.usuario);
        this._express.use("/api/v1/marcas", passport.authenticate("jwt", { session: false }), routes.marca);
        this._express.use("/api/v1/modelos", passport.authenticate("jwt", { session: false }), routes.modelo);
    }
    publicRoutes() {
        this._express.use("/api/v1/public/autenticar", routes.autenticacao);
    }
    getExpress() {
        return this._express;
    }
}
exports.CustomExpress = CustomExpress;
//# sourceMappingURL=custom.express.js.map