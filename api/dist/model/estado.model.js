"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Estado {
    constructor(id, nome, sigla) {
        this.id = id;
        this.nome = nome;
        this.sigla = sigla;
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
    get $sigla() {
        return this.sigla;
    }
    set $sigla(sigla) {
        this.sigla = sigla;
    }
}
exports.Estado = Estado;
//# sourceMappingURL=estado.model.js.map