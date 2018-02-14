import * as express from "express";
import { logger } from "../utils/index";
import * as bodyParser from "body-parser";
import * as routes from "../routes/index";
import * as passport from "passport";
import * as jwt from "jwt-simple";
import { PassportStrategy } from "../auth/index";
import * as moment from "moment";
import * as gzip from "compression";
import * as cors from "cors";
import * as helmet from "helmet";

export class CustomExpress {

    private _express: express.Express;
    private _passportMiddleware;

    constructor() {
        this._express = express();
        this.middlewares();
        this.privateRoutes();
        this.publicRoutes();
    }

    private middlewares(): void {
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
        PassportStrategy.initialize(passport);
        this._passportMiddleware = passport.authenticate("jwt", { session: false });
    }

    private privateRoutes(): void {
        this._express.use("/api/v1/usuarios", this._passportMiddleware, routes.usuario);
        this._express.use("/api/v1/marcas", this._passportMiddleware, routes.marca);
        this._express.use("/api/v1/modelos", this._passportMiddleware, routes.modelo);
        this._express.use("/api/v1/tiposVeiculo", this._passportMiddleware, routes.tipoDeVeiculo);
        this._express.use("/api/v1/estados", this._passportMiddleware, routes.estado);
        this._express.use("/api/v1/cidades", this._passportMiddleware, routes.cidade);
    }

    private publicRoutes(): void {
        this._express.use("/api/v1/public/autenticar", routes.autenticacao);
    }

    public getExpress(): express.Express {
        return this._express;
    }
}
