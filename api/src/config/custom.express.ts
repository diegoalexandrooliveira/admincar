import * as express from 'express';

export class CustomExpress {

    private _express: express.Express;

    constructor() {
        this._express = express();
        this._express.use((req: express.Request, res: express.Response) => {
            res.send("Funcionou");

        });
    }

    public getExpress(): express.Express {
        return this._express;
    }
}
