"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
let tmp;
index_1.CorDAO.buscarTodasCores().then(value => (tmp = value));
function cores() {
    return tmp;
}
exports.cores = cores;
//# sourceMappingURL=cor.cache.js.map