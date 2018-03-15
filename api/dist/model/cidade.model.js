"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cidade {
    constructor(id, nome, estado_id) {
        this.id = id;
        this.nome = nome;
        this.estado_id = estado_id;
    }
    get $id() {
        return this.id;
    }
    set $id(id) {
        this.id = id;
    }
    get $nome() {
        return this.nome;
    }
    set $nome(nome) {
        this.nome = nome;
    }
    get $estado_id() {
        return this.estado_id;
    }
    set $estado_id(value) {
        this.estado_id = value;
    }
}
exports.Cidade = Cidade;
//# sourceMappingURL=cidade.model.js.map