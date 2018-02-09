"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_express_1 = require("./config/custom.express");
class AdminCarApi {
    constructor() {
        this._port = 8080;
        this._express = new custom_express_1.CustomExpress().getExpress();
        this._express.listen(this._port, () => {
            console.log("API admincar rodando na porta " + this._port);
        });
    }
}
new AdminCarApi();
//# sourceMappingURL=admincar-api.js.map