"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Marca {
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
    get $tipoVeiculo() {
        return this.tipoVeiculo;
    }
    set $tipoVeiculo(value) {
        this.tipoVeiculo = value;
    }
    get $modelos() {
        return this.modelos;
    }
    set $modelos(value) {
        this.modelos = value;
    }
}
exports.Marca = Marca;
//# sourceMappingURL=marca.model.js.map