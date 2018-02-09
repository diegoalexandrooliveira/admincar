import * as express from 'express';
import { logger } from "../utils/index";

export class CustomExpress {

    private _express: express.Express;

    constructor() {
        this._express = express();
        this._express.use((req: express.Request, res: express.Response) => {
            logger.info("Teste");
            res.send("Funcionou");

        });
    }

    public getExpress(): express.Express {
        return this._express;
    }
}
