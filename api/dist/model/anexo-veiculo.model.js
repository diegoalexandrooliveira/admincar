"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AnexoVeiculo {
    constructor(id, tipoArquivo, url, principal, veiculoId, object_key) {
        this.id = id;
        this.tipoArquivo = tipoArquivo;
        this.url = url;
        this.principal = principal;
        this.veiculoId = veiculoId;
        this.object_key = object_key;
    }
    get $id() {
        return this.id;
    }
    set $id(id) {
        this.id = id;
    }
    get $tipoArquivo() {
        return this.tipoArquivo;
    }
    set $tipoArquivo(tipoArquivo) {
        this.tipoArquivo = tipoArquivo;
    }
    get $url() {
        return this.url;
    }
    set $url(url) {
        this.url = url;
    }
    get $principal() {
        return this.principal;
    }
    set $principal(principal) {
        this.principal = principal;
    }
    get $veiculoId() {
        return this.veiculoId;
    }
    set $veiculoId(veiculoId) {
        this.veiculoId = veiculoId;
    }
    get $object_key() {
        return this.object_key;
    }
    set $object_key(object_key) {
        this.object_key = object_key;
    }
}
exports.AnexoVeiculo = AnexoVeiculo;
//# sourceMappingURL=anexo-veiculo.model.js.map