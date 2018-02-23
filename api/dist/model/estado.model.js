"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Estado {
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
    get $cidades() {
        return this.cidades;
    }
    set $cidades(value) {
        this.cidades = value;
    }
}
exports.Estado = Estado;
//# sourceMappingURL=estado.model.js.map