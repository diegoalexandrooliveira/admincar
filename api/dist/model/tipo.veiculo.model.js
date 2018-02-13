"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TipoVeiculo {
    constructor(id, descricao) {
        this.id = id;
        this.descricao = descricao;
    }
    get $id() {
        return this.id;
    }
    set $id(id) {
        this.id = id;
    }
    get $descricao() {
        return this.descricao;
    }
    set $descricao(descricao) {
        this.descricao = descricao;
    }
}
exports.TipoVeiculo = TipoVeiculo;
//# sourceMappingURL=tipo.veiculo.model.js.map