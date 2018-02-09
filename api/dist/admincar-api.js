"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_express_1 = require("./config/custom.express");
const index_1 = require("./utils/index");
class AdminCarApi {
    constructor() {
        this._port = 8080;
        this._express = new custom_express_1.CustomExpress().getExpress();
        this._express.listen(this._port, () => {
            let mensagem = "API admincar rodando na porta " + this._port;
            console.log(mensagem);
            index_1.logger.error(mensagem);
            index_1.logger.debug(mensagem);
        });
    }
}
new AdminCarApi();
//# sourceMappingURL=admincar-api.js.map