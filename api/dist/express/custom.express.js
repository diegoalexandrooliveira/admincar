"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../routes/index");
const passport = require("passport");
const index_1 = require("../auth/index");
const gzip = require("compression");
const cors = require("cors");
const helmet = require("helmet");
class CustomExpress {
    constructor() {
        this._express = express();
        this.middlewares();
        this.privateRoutes();
        this.publicRoutes();
    }
    middlewares() {
        this._express.use(helmet());
        this._express.use(cors({
            methods: "*",
            allowedHeaders: "*",
            origin: "*"
        }));
        this._express.use(gzip());
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(passport.initialize());
        index_1.PassportStrategy.initialize(passport);
        this._passportMiddleware = passport.authenticate("jwt", { session: false });
    }
    privateRoutes() {
        this._express.use("/api/v1/usuarios", this._passportMiddleware, routes.usuario);
        this._express.use("/api/v1/tiposVeiculo", this._passportMiddleware, routes.tipoDeVeiculo);
        this._express.use("/api/v1/estados", this._passportMiddleware, routes.estado);
        this._express.use("/api/v1/cidades", this._passportMiddleware, routes.cidade);
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