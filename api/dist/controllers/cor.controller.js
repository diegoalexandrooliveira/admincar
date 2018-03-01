"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../cache/index");
class CorController {
    static getType() {
        return `type Cor { id: Int, descricao: String }`;
    }
    static getQueries() {
        return `cores: [Cor]
            cor(id: Int): Cor`;
    }
    static getQueryResolvers() {
        return {
            cores: () => index_1.cores(),
            cor: (root, args) => index_1.cores()[args.id - 1]
        };
    }
    static getResolvers() {
        return {};
    }
}
exports.CorController = CorController;
//# sourceMappingURL=cor.controller.js.map