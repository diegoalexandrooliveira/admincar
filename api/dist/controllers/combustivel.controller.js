"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../cache/index");
class CombustivelController {
    static getType() {
        return `type Combustivel { id: Int, descricao: String }`;
    }
    static getQueries() {
        return `combustiveis: [Combustivel]
            combustivel(id: Int): Combustivel`;
    }
    static getQueryResolvers() {
        return {
            combustiveis: () => index_1.combustiveis(),
            combustivel: (root, args) => index_1.combustiveis()[args.id - 1]
        };
    }
    static getResolvers() {
        return {};
    }
}
exports.CombustivelController = CombustivelController;
//# sourceMappingURL=combustivel.controller.js.map