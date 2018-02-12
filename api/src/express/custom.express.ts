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
        this.routes();
    }

    private middlewares(): void {
        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(passport.initialize());
        PassportStrategy.initialize(passport);
    }

    private routes(): void {
        this._express.use("/api/v1/usuarios", routes.usuario);
        this._express.use("/api/v1/marcas", routes.marca);
        this._express.use("/api/v1/modelos", routes.modelo);

        // this._express.get("/restrito", passport.authenticate("jwt", { session: false }),
        //     (req, res) => {
        //         res.send("Ok");
        //     });
    }

    public getExpress(): express.Express {
        return this._express;
    }
}
