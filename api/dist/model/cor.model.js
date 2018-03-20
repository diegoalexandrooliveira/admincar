"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cor {
    constructor(id, descricao) {
        this.id = id;
        this.descricao = descricao;
    }
    get $id() {
        return this.id;
    }
    set $id(value) {
        this.id = value;
    }
    get $descricao() {
        return this.descricao;
    }
    set $descricao(value) {
        this.descricao = value;
    }
}
exports.Cor = Cor;
//# sourceMappingURL=cor.model.js.map