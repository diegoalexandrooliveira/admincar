"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("../utils/index");
class CustomExpress {
    constructor() {
        this._express = express();
        this._express.use((req, res) => {
            index_1.logger.info("Teste");
            res.send("Funcionou");
        });
    }
    getExpress() {
        return this._express;
    }
}
exports.CustomExpress = CustomExpress;
//# sourceMappingURL=custom.express.js.map