"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class ChartComparativo {
    constructor(mesAno, adquiridos, vendidos) {
        this.mesAno = mesAno;
        this.adquiridos = adquiridos;
        this.vendidos = vendidos;
        this.converterMesAno();
    }
    get $mesAno() {
        return this.mesAno;
    }
    set $mesAno(value) {
        this.mesAno = value;
        this.converterMesAno();
    }
    get $adquiridos() {
        return this.adquiridos;
    }
    set $adquiridos(value) {
        this.adquiridos = value;
    }
    get $vendidos() {
        return this.vendidos;
    }
    set $vendidos(value) {
        this.vendidos = value;
    }
    get $mesDescAno() {
        return this.mesDescAno;
    }
    set $mesDescAno(value) {
        this.mesDescAno = value;
    }
    converterMesAno() {
        if (this.$mesAno) {
            let mes = parseInt(this.$mesAno.slice(0, 2));
            let ano = parseInt(this.$mesAno.slice(3));
            let mesDesc = utils_1.meses()[mes - 1];
            this.$mesDescAno = mesDesc + "/" + ano.toString();
        }
    }
}
exports.ChartComparativo = ChartComparativo;
//# sourceMappingURL=chart.comparativo.model.js.map