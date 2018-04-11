"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const index_2 = require("../model/index");
class AnexoVeiculoController {
    static getType() {
        return `type AnexoVeiculo { id: Int, tipoArquivo: Int, url: String, veiculoId: Int,
            principal: Boolean}`;
    }
    static getQueries() {
        return `anexoPrincipal(veiculoId: Int): AnexoVeiculo
            anexos(veiculoId: Int): [AnexoVeiculo]`;
    }
    // public static getMutations(): string {
    //   return `uploadFile(file: Upload): Boolean`;
    // }
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
    static getResolvers() {
        return {};
    }
}
exports.AnexoVeiculoController = AnexoVeiculoController;
//# sourceMappingURL=anexo-veiculo.controller.js.map