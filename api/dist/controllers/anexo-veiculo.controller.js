"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const index_2 = require("../model/index");
const database_1 = require("../database");
class AnexoVeiculoController {
    static getType() {
        return `type AnexoVeiculo { id: Int, tipoArquivo: Int, url: String, veiculoId: Int,
            principal: Boolean}
            input AnexoVeiculoInput { id: Int, tipoArquivo: Int, principal: Boolean}`;
    }
    static getQueries() {
        return `anexoPrincipal(veiculoId: Int): AnexoVeiculo
            anexos(veiculoId: Int): [AnexoVeiculo]`;
    }
    static getMutations() {
        return `atualizarAnexo(anexo: AnexoVeiculoInput): Int`;
    }
    static getQueryResolvers() {
        return {
            anexoPrincipal: (root, args) => {
                return index_1.AnexoVeiculoDAO.buscaAnexoPrincipalPorVeiculo(args.veiculoId).then((anexo) => {
                    if (!anexo || !anexo.$url) {
                        return new index_2.AnexoVeiculo(-1, 0, "/public/images/veiculoSemImagem.jpg", true, args.veiculoId);
                    }
                    else {
                        return anexo;
                    }
                });
            },
            anexos: (root, args) => {
                return index_1.AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(args.veiculoId);
            }
        };
    }
    static getMutationsResolvers() {
        return { atualizarAnexo: this.atualizarAnexo };
    }
    static atualizarAnexo(root, args) {
        return new Promise((resolve, reject) => {
            let client = null;
            let anexo = new index_2.AnexoVeiculo(args.anexo.id, args.anexo.tipoArquivo, null, args.anexo.principal);
            database_1.clientFactory
                .getClient()
                .then((result) => {
                client = result;
                return index_1.AnexoVeiculoDAO.atualizarAnexo(client, anexo);
            })
                .then(retorno => {
                database_1.clientFactory.commit(client);
                resolve(retorno);
            })
                .catch(erro => {
                if (client) {
                    database_1.clientFactory.rollback(client);
                }
                reject(erro);
            });
        });
    }
    static getResolvers() {
        return {};
    }
}
exports.AnexoVeiculoController = AnexoVeiculoController;
//# sourceMappingURL=anexo-veiculo.controller.js.map