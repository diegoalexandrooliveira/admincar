"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const dao_1 = require("../dao");
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
    toModel(object) {
        this.$id = object["id"];
        this.$modelo_id = object["modelo"];
        this.$anoFabricacao = object["anoFabricacao"];
        this.$anoModelo = object["anoModelo"];
        this.$placa = object["placa"];
        this.$renavam = object["renavam"];
        this.$chassi = object["chassi"];
        this.$cor_id = object["cor"];
        this.$cidade_id = object["cidade"];
        this.$dataAquisicao = object["dataAquisicao"];
        this.$dataVenda = object["dataVenda"];
        this.$valorCompra = object["valorCompra"];
        this.$valorAnuncio = object["valorAnuncio"];
        this.$valorVenda = object["valorVenda"];
        this.$observacoes = object["observacoes"];
        this.$combustivel_id = object["combustivel"];
    }
    validarVeiculo(ehInsercao) {
        return __awaiter(this, void 0, void 0, function* () {
            let erros = [];
            if (!ehInsercao && !this.$id) {
                erros.push(new index_1.Mensagem("Identificador do veículo não informado.", "erro"));
            }
            if (!this.$modelo_id) {
                erros.push(new index_1.Mensagem("É obrigatório informar um modelo.", "erro"));
            }
            else {
                let modelo = yield dao_1.ModeloDAO.buscarModeloPorId(this.$modelo_id);
                if (!modelo) {
                    erros.push(new index_1.Mensagem("Modelo informado não cadastrado.", "erro"));
                }
            }
            if (!this.$anoFabricacao) {
                erros.push(new index_1.Mensagem("É obrigatório informar o ano de fabricação.", "erro"));
            }
            if (!this.$anoModelo) {
                erros.push(new index_1.Mensagem("É obrigatório informar o ano do modelo.", "erro"));
            }
            if (this.$cidade_id) {
                let cidade = yield dao_1.CidadeDAO.buscaCidadePorId(this.$cidade_id);
                if (!cidade) {
                    erros.push(new index_1.Mensagem(`Cidade informada (${this.$cidade_id}) não cadastrada.`, "erro"));
                }
            }
            if (!this.$valorAnuncio || this.$valorAnuncio <= 0) {
                erros.push(new index_1.Mensagem("É obrigatório informar um valor para anuncio.", "erro"));
            }
            if (this.$valorCompra && this.$valorCompra <= 0) {
                erros.push(new index_1.Mensagem("Valor de compra inválido.", "erro"));
            }
            if (this.$valorVenda && this.$valorVenda <= 0) {
                erros.push(new index_1.Mensagem("Valor de venda inválido.", "erro"));
            }
            if (!this.$cor_id) {
                erros.push(new index_1.Mensagem("É obrigatório informar uma cor.", "erro"));
            }
            else {
                let cor = yield dao_1.CorDAO.buscaCorPorId(this.$cor_id);
                if (!cor) {
                    erros.push(new index_1.Mensagem(`Cor informada (${this.$cor_id}) não cadastrada.`, "erro"));
                }
            }
            if (this.$combustivel_id) {
                let combustivel = yield dao_1.CombustivelDAO.buscaCombustivelPorId(this.$combustivel_id);
                if (!combustivel) {
                    erros.push(new index_1.Mensagem(`Combustível informado (${this.$combustivel_id}) não cadastrado.`, "erro"));
                }
            }
            return erros;
        });
    }
}
exports.Veiculo = Veiculo;
//# sourceMappingURL=veiculo.model.js.map