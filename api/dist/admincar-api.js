"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_express_1 = require("./express/custom.express");
const index_1 = require("./utils/index");
class AdminCarApi {
    constructor() {
        this._port = 8080;
        this._express = new custom_express_1.CustomExpress().getExpress();
        this._express.listen(this._port, () => {
            let mensagem = "API admincar rodando na porta " + this._port;
            index_1.logger.info(mensagem);
        });
    }
}
new AdminCarApi();
//# sourceMappingURL=admincar-api.js.map