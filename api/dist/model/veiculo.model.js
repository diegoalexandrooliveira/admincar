"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Veiculo {
    constructor(id, modelo_id, anoFabricacao, anoModelo, placa, renavam, chassi, cor_id, cidade_id, dataInclusao, dataAquisicao, dataVenda, valorCompra, valorVenda, valorAnuncio, observacoes, combustivel_id) {
        this.id = id;
        this.modelo_id = modelo_id;
        this.anoFabricacao = anoFabricacao;
        this.anoModelo = anoModelo;
        this.placa = placa;
        this.renavam = renavam;
        this.chassi = chassi;
        this.cor_id = cor_id;
        this.cidade_id = cidade_id;
        this.dataInclusao = dataInclusao;
        this.dataAquisicao = dataAquisicao;
        this.dataVenda = dataVenda;
        this.valorCompra = valorCompra;
        this.valorVenda = valorVenda;
        this.valorAnuncio = valorAnuncio;
        this.observacoes = observacoes;
        this.combustivel_id = combustivel_id;
    }
    get $id() {
        return this.id;
    }
    set $id(value) {
        this.id = value;
    }
    get $anoFabricacao() {
        return this.anoFabricacao;
    }
    set $anoFabricacao(value) {
        this.anoFabricacao = value;
    }
    get $anoModelo() {
        return this.anoModelo;
    }
    set $anoModelo(value) {
        this.anoModelo = value;
    }
    get $placa() {
        return this.placa;
    }
    set $placa(value) {
        this.placa = value;
    }
    get $renavam() {
        return this.renavam;
    }
    set $renavam(value) {
        this.renavam = value;
    }
    get $chassi() {
        return this.chassi;
    }
    set $chassi(value) {
        this.chassi = value;
    }
    get $dataInclusao() {
        return this.dataInclusao;
    }
    set $dataInclusao(value) {
        this.dataInclusao = value;
    }
    get $dataAquisicao() {
        return this.dataAquisicao;
    }
    set $dataAquisicao(value) {
        this.dataAquisicao = value;
    }
    get $dataVenda() {
        return this.dataVenda;
    }
    set $dataVenda(value) {
        this.dataVenda = value;
    }
    get $valorCompra() {
        return this.valorCompra;
    }
    set $valorCompra(value) {
        this.valorCompra = value;
    }
    get $valorVenda() {
        return this.valorVenda;
    }
    set $valorVenda(value) {
        this.valorVenda = value;
    }
    get $valorAnuncio() {
        return this.valorAnuncio;
    }
    set $valorAnuncio(value) {
        this.valorAnuncio = value;
    }
    get $observacoes() {
        return this.observacoes;
    }
    set $observacoes(value) {
        this.observacoes = value;
    }
    get $modelo_id() {
        return this.modelo_id;
    }
    set $modelo_id(value) {
        this.modelo_id = value;
    }
    get $cor_id() {
        return this.cor_id;
    }
    set $cor_id(value) {
        this.cor_id = value;
    }
    get $cidade_id() {
        return this.cidade_id;
    }
    set $cidade_id(value) {
        this.cidade_id = value;
    }
    get $combustivel_id() {
        return this.combustivel_id;
    }
    set $combustivel_id(value) {
        this.combustivel_id = value;
    }
}
exports.Veiculo = Veiculo;
//# sourceMappingURL=veiculo.model.js.map