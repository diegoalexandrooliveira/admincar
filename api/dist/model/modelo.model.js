"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const marca_model_1 = require("./marca.model");
class Modelo {
    constructor(id, descricao, marca) {
        this.id = id;
        this.descricao = descricao;
        this.marca = marca;
        marca = new marca_model_1.Marca();
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
    getMarca() {
        return this.marca;
    }
    setMarca(marca) {
        this.marca = marca;
    }
}
exports.Modelo = Modelo;
//# sourceMappingURL=modelo.model.js.map