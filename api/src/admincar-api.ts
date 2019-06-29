import { CustomExpress } from "./express/custom.express";
import { Express } from "express";
import { logger } from "./utils/index";
import * as fs from "fs";
import * as spdy from "spdy";
import * as path from "path";

class AdminCarApi {
    private _port: Number = 8080;
    private _express: Express;

    constructor() {
        this._express = new CustomExpress().getExpress();


        let credenciais = {
            key: fs.readFileSync(path.join(__dirname, "..", "/privkey.pem"), "utf8"),
            cert: fs.readFileSync(path.join(__dirname, "..", "/cert.pem"), "utf8")
        }

        // SEM SSL
        // this._express
        //     .listen(this._port, () => {
        //         let mensagem = "API admincar rodando na porta " + this._port;
        //         logger.info(mensagem);
        //     });

        // COM SSL HTTP/1.1
        // https.createServer(credenciais, this._express)
        //     .listen(this._port, () => {
        //         let mensagem = "API admincar rodando na porta " + this._port;
        //         logger.info(mensagem);
        //     });

        // COM SSL HTTP/2
        spdy.createServer(credenciais, this._express).listen(this._port, () => {
            let mensagem = "API admincar rodando na porta " + this._port;
            logger.info(mensagem);
        });
    }
}
new AdminCarApi();