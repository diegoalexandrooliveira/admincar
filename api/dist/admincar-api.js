"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_express_1 = require("./express/custom.express");
const index_1 = require("./utils/index");
class AdminCarApi {
    constructor() {
        this._port = 8080;
        this._express = new custom_express_1.CustomExpress().getExpress();
        // let credenciais = {
        //     key: fs.readFileSync("certificado/localhost.key", "utf8"),
        //     cert: fs.readFileSync("certificado/localhost.cert", "utf8")
        // }
        this._express
            .listen(this._port, () => {
            let mensagem = "API admincar rodando na porta " + this._port;
            index_1.logger.info(mensagem);
        });
        // https.createServer(credenciais, this._express)
        //     .listen(this._port, () => {
        //         let mensagem = "API admincar rodando na porta " + this._port;
        //         logger.info(mensagem);
        //     });
    }
}
new AdminCarApi();
//# sourceMappingURL=admincar-api.js.map