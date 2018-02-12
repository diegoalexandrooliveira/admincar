import * as express from "express";
import { logger } from "../utils/index";
import * as bodyParser from "body-parser";
import * as routes from "../routes/index";
import * as passport from "passport";
import * as jwt from "jwt-simple";
import { PassportStrategy } from "../auth/index";
import * as moment from "moment";

export class CustomExpress {

    private _express: express.Express;

    constructor() {
        this._express = express();
        this.middlewares();
        this.privateRoutes();
        this.publicRoutes();
    }

    private middlewares(): void {
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(passport.initialize());
        PassportStrategy.initialize(passport);
    }

    private privateRoutes(): void {
        this._express.use("/api/v1/usuarios", passport.authenticate("jwt", { session: false }), routes.usuario);
        this._express.use("/api/v1/marcas", passport.authenticate("jwt", { session: false }), routes.marca);
        this._express.use("/api/v1/modelos", passport.authenticate("jwt", { session: false }), routes.modelo);
    }

    private publicRoutes(): void {
        this._express.use("/api/v1/public/autenticar", routes.autenticacao);
    }

    public getExpress(): express.Express {
        return this._express;
    }
}
