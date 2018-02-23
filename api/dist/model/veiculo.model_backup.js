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
    constructor() { }
    get $id() {
        return this.id;
    }
    set $id(value) {
        this.id = value;
    }
    get $idModelo() {
        return this.idModelo;
    }
    set $idModelo(value) {
        this.idModelo = value;
    }
    get $descricaoModelo() {
        return this.descricaoModelo;
    }
    set $descricaoModelo(value) {
        this.descricaoModelo = value;
    }
    get $idMarca() {
        return this.idMarca;
    }
    set $idMarca(value) {
        this.idMarca = value;
    }
    get $descricaoMarca() {
        return this.descricaoMarca;
    }
    set $descricaoMarca(value) {
        this.descricaoMarca = value;
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
    get $idCor() {
        return this.idCor;
    }
    set $idCor(value) {
        this.idCor = value;
    }
    get $descricaoCor() {
        return this.descricaoCor;
    }
    set $descricaoCor(value) {
        this.descricaoCor = value;
    }
    get $idCidade() {
        return this.idCidade;
    }
    set $idCidade(value) {
        this.idCidade = value;
    }
    get $nomeCidade() {
        return this.nomeCidade;
    }
    set $nomeCidade(value) {
        this.nomeCidade = value;
    }
    get $idEstado() {
        return this.idEstado;
    }
    set $idEstado(value) {
        this.idEstado = value;
    }
    get $nomeEstado() {
        return this.nomeEstado;
    }
    set $nomeEstado(value) {
        this.nomeEstado = value;
    }
    get $siglaEstado() {
        return this.siglaEstado;
    }
    set $siglaEstado(value) {
        this.siglaEstado = value;
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
    get $idCombustivel() {
        return this.idCombustivel;
    }
    set $idCombustivel(value) {
        this.idCombustivel = value;
    }
    get $descricaoCombustivel() {
        return this.descricaoCombustivel;
    }
    set $descricaoCombustivel(value) {
        this.descricaoCombustivel = value;
    }
    validarVeiculo(ehInsercao) {
        return __awaiter(this, void 0, void 0, function* () {
            let erros = [];
            if (!ehInsercao && !this.$id) {
                erros.push(new index_1.Mensagem("Identificador do veículo não informado.", "erro"));
            }
            if (!this.$idModelo) {
                erros.push(new index_1.Mensagem("É obrigatório informar um modelo.", "erro"));
            }
            else {
                let modelo = yield dao_1.ModeloDAO.buscarModeloPorId(this.$idModelo);
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
            if (this.$idCidade) {
                let cidade = yield dao_1.CidadeDAO.buscaCidadePorId(this.$idCidade);
                if (!cidade) {
                    erros.push(new index_1.Mensagem(`Cidade informada (${this.$idCidade}) não cadastrada.`, "erro"));
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
            if (!this.$idCor) {
                erros.push(new index_1.Mensagem("É obrigatório informar uma cor.", "erro"));
            }
            else {
                let cor = yield dao_1.CorDAO.buscaCorPorId(this.$idCor);
                if (!cor) {
                    erros.push(new index_1.Mensagem(`Cor informada (${this.$idCor}) não cadastrada.`, "erro"));
                }
            }
            if (this.$idCombustivel) {
                let combustivel = yield dao_1.CombustivelDAO.buscaCombustivelPorId(this.$idCombustivel);
                if (!combustivel) {
                    erros.push(new index_1.Mensagem(`Combustível informado (${this.$idCombustivel}) não cadastrado.`, "erro"));
                }
            }
            return erros;
        });
    }
    validarExclusao() {
        return __awaiter(this, void 0, void 0, function* () {
            let erros = [];
            if (!this.$id) {
                erros.push(new index_1.Mensagem("Identificador do veículo não informado.", "erro"));
            }
            return erros;
        });
    }
    bodyParaModel(body) {
        let instanciaObj = this;
        let atributos = Object.keys(body);
        atributos.forEach((atributo) => {
            if (typeof instanciaObj[atributo] !== "function") {
                instanciaObj[atributo] = body[atributo];
            }
        });
    }
}
exports.Veiculo = Veiculo;
//# sourceMappingURL=veiculo.model_backup.js.map