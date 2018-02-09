"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class CustomExpress {
    constructor() {
        this._express = express();
        this._express.use((req, res) => {
            res.send("Funcionou");
        });
    }
    getExpress() {
        return this._express;
    }
}
exports.CustomExpress = CustomExpress;
//# sourceMappingURL=custom.express.js.map