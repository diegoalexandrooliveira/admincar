"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Marca {
    constructor(id, descricao, tipo_veiculo_id) {
        this.id = id;
        this.descricao = descricao;
        this.tipo_veiculo_id = tipo_veiculo_id;
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
    get $tipo_veiculo_id() {
        return this.tipo_veiculo_id;
    }
    set $tipo_veiculo_id(value) {
        this.tipo_veiculo_id = value;
    }
}
exports.Marca = Marca;
//# sourceMappingURL=marca.model.js.map