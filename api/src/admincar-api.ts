import { CustomExpress } from "./express/custom.express";
import { Express } from "express";
import { logger } from "./utils/index";

class AdminCarApi {
    private _port: Number = 8080;
    private _express: Express;

    constructor() {
        this._express = new CustomExpress().getExpress();
        this._express.listen(this._port, () => {
            let mensagem = "API admincar rodando na porta " + this._port;
            logger.info(mensagem);
        });
    }
}
new AdminCarApi();