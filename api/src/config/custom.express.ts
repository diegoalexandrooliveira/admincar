import * as express from "express";
import { logger } from "../utils/index";
import * as bodyParser from "body-parser";
import * as routes from "../routes/index";

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
    }

    private routes(): void {
        this._express.use("/api/v1/marca", routes.marca);
        this._express.use("/api/v1/modelo", routes.modelo);
    }

    public getExpress(): express.Express {
        return this._express;
    }
}
