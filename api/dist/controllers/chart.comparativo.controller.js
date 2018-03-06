"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
class ChartComparativoController {
    static getType() {
        return `type ChartComparativo { mesAno: String, mesDescAno: String, adquiridos: Int, vendidos: Int }`;
    }
    static getQueries() {
        return `comparativo: [ChartComparativo]`;
    }
    static getQueryResolvers() {
        return {
            comparativo: () => index_1.ChartDAO.comparativoMesAnoVendidosEAdquiridos()
        };
    }
    static getResolvers() {
        return {};
    }
}
exports.ChartComparativoController = ChartComparativoController;
//# sourceMappingURL=chart.comparativo.controller.js.map