"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const index_2 = require("../model/index");
const index_3 = require("../cache/index");
const database_1 = require("../database");
const _1 = require(".");
class VeiculoController {
    static getType() {
        return `type Veiculo { id: Int, modelo: Modelo, anoFabricacao: Int, anoModelo: Int,
    placa: String, renavam: String, chassi: String, cor: Cor, cidade: Cidade, 
  dataInclusao: Date, dataAquisicao: Date, dataVenda: Date, valorCompra: Float, valorVenda: Float,
valorAnuncio: Float, observacoes: String, combustivel: Combustivel, anexoPrincipal: AnexoVeiculo, anexos: [AnexoVeiculo] }

input VeiculoInput { id: Int, modelo: Int, anoFabricacao: Int, anoModelo: Int,
  placa: String, renavam: String, chassi: String, cor: Int, cidade: Int, 
dataInclusao: Date, dataAquisicao: Date, dataVenda: Date, valorCompra: Float, valorVenda: Float,
valorAnuncio: Float, observacoes: String, combustivel: Int }`;
    }
    static getQueries() {
        return `veiculos(limite: Int = 0, situacao: String = "todos"): [Veiculo]
            veiculo(id: Int): Veiculo`;
    }
    static getMutations() {
        return `excluirVeiculo(id: Int): Boolean
    inserirVeiculo(veiculo: VeiculoInput): Int
    atualizarVeiculo(veiculo: VeiculoInput): Int`;
    }
    static getQueryResolvers() {
        return {
            veiculos: this.buscarVeiculos,
            veiculo: (root, args) => index_1.VeiculoDAO.buscarVeiculoPorId(args.id)
        };
    }
    static getMutationsResolvers() {
        return {
            excluirVeiculo: this.excluirVeiculo.bind(this),
            inserirVeiculo: this.inserirVeiculo,
            atualizarVeiculo: this.atualizarVeiculo
        };
    }
    static getResolvers() {
        return {
            Veiculo: {
                modelo: (veiculo) => index_1.ModeloDAO.buscarModeloPorId(veiculo.$modelo_id),
                cor: (veiculo) => index_3.cores()[veiculo.$cor_id - 1],
                combustivel: (veiculo) => index_3.combustiveis()[veiculo.$combustivel_id - 1],
                cidade: (veiculo) => index_1.CidadeDAO.buscaCidadePorId(veiculo.$cidade_id),
                anexoPrincipal: (veiculo) => index_1.AnexoVeiculoDAO.buscaAnexoPrincipalPorVeiculo(veiculo.$id).then((anexo) => anexo),
                anexos: (veiculo) => index_1.AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(veiculo.$id).then((anexos) => anexos)
            }
        };
    }
    static buscarVeiculos(root, args) {
        return index_1.VeiculoDAO.buscarTodosVeiculos().then((veiculos) => {
            let veiculosFiltrados = veiculos;
            if (args.situacao &&
                (args.situacao == "vendidos" || args.situacao == "disponiveis")) {
                veiculosFiltrados = veiculos.filter((veiculo) => VeiculoController.situacaoDesejada(args.situacao, veiculo.$dataVenda != undefined));
            }
            return args.limite
                ? veiculosFiltrados.slice(0, args.limite)
                : veiculosFiltrados;
        });
    }
    static situacaoDesejada(situacao, vendido) {
        if (situacao == "vendidos" && vendido) {
            return true;
        }
        else if (situacao == "disponiveis" && !vendido) {
            return true;
        }
        else {
            return false;
        }
    }
    // private static excluirVeiculo(root, args): Promise<boolean> {
    //   return new Promise((resolve, reject) => {
    //     clientFactory
    //       .getClient()
    //       .then((client: Client) => {
    //         AnexoVeiculoDAO.excluirTodosAnexoPorVeiculo(client, args.id)
    //           .then((row: number) => {
    //             VeiculoDAO.deletarVeiculo(client, args.id)
    //               .then(rows => {
    //                 clientFactory.commit(client);
    //                 if (rows) {
    //                   return resolve(true);
    //                 } else {
    //                   return reject(
    //                     JSON.stringify(
    //                       Array.of(
    //                         new Mensagem("Nenhum veículo removido.", "warn")
    //                       )
    //                     )
    //                   );
    //                 }
    //               })
    //               .catch(erro => {
    //                 clientFactory.rollback(client);
    //                 reject(erro);
    //               });
    //           })
    //           .catch(erro => {
    //             clientFactory.rollback(client);
    //             reject(erro);
    //           });
    //       })
    //       .catch(erro => reject(erro));
    //   });
    // }
    static excluirVeiculo(root, args) {
        let client = null;
        return new Promise((resolve, reject) => {
            this.excluirTodosAnexosDoVeiculo(args.id)
                .then(() => database_1.clientFactory.getClient())
                .then((result) => {
                client = result;
                return index_1.AnexoVeiculoDAO.excluirTodosAnexoPorVeiculo(client, args.id);
            })
                .then((row) => {
                return index_1.VeiculoDAO.deletarVeiculo(client, args.id);
            })
                .then(rows => {
                database_1.clientFactory.commit(client);
                if (rows) {
                    return resolve(true);
                }
                else {
                    return reject(JSON.stringify(Array.of(new index_2.Mensagem("Nenhum veículo removido.", "warn"))));
                }
            })
                .catch(erro => {
                if (client) {
                    database_1.clientFactory.rollback(client);
                }
                reject(erro);
            });
        });
    }
    static inserirVeiculo(root, args) {
        return new Promise((resolve, reject) => {
            let veiculo = new index_2.Veiculo();
            veiculo.toModel(args.veiculo);
            veiculo.validarVeiculo(true).then((erros) => {
                if (erros.length > 0) {
                    reject(JSON.stringify(erros));
                }
                else {
                    veiculo.$dataInclusao = new Date();
                    database_1.clientFactory
                        .getClient()
                        .then((client) => index_1.VeiculoDAO.inserirVeiculo(client, veiculo))
                        .then(retorno => {
                        database_1.clientFactory.commit(retorno.client);
                        resolve(retorno.id);
                    })
                        .catch(erro => reject(erro));
                }
            });
        });
    }
    static atualizarVeiculo(root, args) {
        return new Promise((resolve, reject) => {
            let veiculo = new index_2.Veiculo();
            veiculo.toModel(args.veiculo);
            veiculo.validarVeiculo(false).then((erros) => {
                if (erros.length > 0) {
                    reject(JSON.stringify(erros));
                }
                else {
                    database_1.clientFactory
                        .getClient()
                        .then((client) => index_1.VeiculoDAO.atualizarVeiculo(client, veiculo))
                        .then(retorno => {
                        database_1.clientFactory.commit(retorno.client);
                        resolve(retorno.rows);
                    })
                        .catch(erro => reject(erro));
                }
            });
        });
    }
    static excluirTodosAnexosDoVeiculo(id) {
        return index_1.AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(id).then((anexos) => Promise.all(anexos.map(anexo => _1.AnexoVeiculoController.deleteImageFromStorage(anexo.$id))));
    }
}
exports.VeiculoController = VeiculoController;
//# sourceMappingURL=veiculo.controller.js.map