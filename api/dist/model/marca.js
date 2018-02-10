"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Marca {
    constructor(id, descricao, tipo_veiculo_id) {
        this.id = id;
        this.descricao = descricao;
        this.tipo_veiculo_id = tipo_veiculo_id;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getDescricao() {
        return this.descricao;
    }
    setDescricao(descricao) {
        this.descricao = descricao;
    }
    getTipoVeiculoId() {
        return this.tipo_veiculo_id;
    }
    setTipoVeiculoId(tipo_veiculo_id) {
        this.tipo_veiculo_id = tipo_veiculo_id;
    }
}
exports.Marca = Marca;
//# sourceMappingURL=marca.js.map