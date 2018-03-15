"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Modelo {
    constructor(id, descricao, marca_id) {
        this.id = id;
        this.descricao = descricao;
        this.marca_id = marca_id;
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
    get $marca_id() {
        return this.marca_id;
    }
    set $marca_id(value) {
        this.marca_id = value;
    }
}
exports.Modelo = Modelo;
//# sourceMappingURL=modelo.model.js.map