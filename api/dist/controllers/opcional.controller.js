"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../cache/index");
class OpcionalController {
    static getType() {
        return `type Opcional { id: Int, descricao: String }`;
    }
    static getQueries() {
        return `opcionais: [Opcional]
            opcional(id: Int): Opcional`;
    }
    static getQueryResolvers() {
        return {
            opcionais: () => index_1.opcionais(),
            opcional: (root, args) => index_1.opcionais()[args.id - 1]
        };
    }
    static getResolvers() {
        return {};
    }
}
exports.OpcionalController = OpcionalController;
//# sourceMappingURL=opcional.controller.js.map