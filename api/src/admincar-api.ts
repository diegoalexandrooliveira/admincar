import { CustomExpress } from "./express/custom.express";
import { Express } from "express";
import { logger } from "./utils/index";
import * as fs from "fs";
import * as https from "https";

class AdminCarApi {
    private _port: Number = 8080;
    private _express: Express;

    constructor() {
        this._express = new CustomExpress().getExpress();

        // let credenciais = {
        //     key: fs.readFileSync("certificado/localhost.key", "utf8"),
        //     cert: fs.readFileSync("certificado/localhost.cert", "utf8")
        // }

        this._express
            .listen(this._port, () => {
                let mensagem = "API admincar rodando na porta " + this._port;
                logger.info(mensagem);
            });

        // https.createServer(credenciais, this._express)
        //     .listen(this._port, () => {
        //         let mensagem = "API admincar rodando na porta " + this._port;
        //         logger.info(mensagem);
        //     });
    }
}
new AdminCarApi();