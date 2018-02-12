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
        // this._express.get("/restrito", passport.authenticate("jwt", { session: false }),
        //     (req, res) => {
        //         res.send("Ok");
        //     });
    }
    getExpress() {
        return this._express;
    }
}
exports.CustomExpress = CustomExpress;
//# sourceMappingURL=custom.express.js.map