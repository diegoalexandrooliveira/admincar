"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../routes/index");
const passport = require("passport");
const jwt = require("jwt-simple");
const index_1 = require("../auth/index");
const moment = require("moment");
class CustomExpress {
    constructor() {
        this._express = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(passport.initialize());
        index_1.PassportStrategy.initialize(passport);
    }
    routes() {
        this._express.use("/api/v1/usuarios", routes.usuario);
        this._express.use("/api/v1/marcas", routes.marca);
        this._express.use("/api/v1/modelos", routes.modelo);
        this._express.get("/api/v1/authenticate", ((req, res) => {
            let expires = moment().add(1, "minutes").valueOf();
            let token = jwt.encode({
                iss: "diego",
                exp: expires
            }, "123");
            res.send(token);
        }));
        // let opts: passport.AuthenticateOptions = {};
        this._express.get("/restrito", passport.authenticate("jwt", { session: false }), (req, res) => {
            res.send("Ok");
        });
    }
    getExpress() {
        return this._express;
    }
}
exports.CustomExpress = CustomExpress;
//# sourceMappingURL=custom.express.js.map