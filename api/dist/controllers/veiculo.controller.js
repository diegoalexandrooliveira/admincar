"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const index_2 = require("../cache/index");
class VeiculoController {
    static getType() {
        return `type Veiculo { id: Int, modelo: Modelo, anoFabricacao: Int, anoModelo: Int,
    placa: String, renavam: String, chassi: String, cor: Cor, cidade: Cidade, 
  dataInclusao: Date, dataAquisicao: Date, dataVenda: Date, valorCompra: Float, valorVenda: Float,
valorAnuncio: Float, observacoes: String, combustivel: Combustivel, anexoPrincipal: AnexoVeiculo }`;
    }
    static getQueries() {
        return `veiculos(limite: Int = 0, situacao: String = "todos"): [Veiculo]
            veiculo(id: Int): Veiculo`;
    }
    static getQueryResolvers() {
        return {
            veiculos: (root, args) => {
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
            },
            veiculo: (root, args) => index_1.VeiculoDAO.buscarVeiculoPorId(args.id)
        };
    }
    static situacaoDesejada(situacao, vendido) {
        if (situacao == "vendidos" && vendido) {
            return true;
        }
        else if (situacao == "disponiveis" && !vendido) {
            return true;
        }
        else {
            false;
        }
    }
    static getResolvers() {
        return {
            Veiculo: {
                modelo: (veiculo) => index_1.ModeloDAO.buscarModeloPorId(veiculo.$modelo_id),
                cor: (veiculo) => index_2.cores()[veiculo.$cor_id - 1],
                combustivel: (veiculo) => index_2.combustiveis()[veiculo.$combustivel_id - 1],
                cidade: (veiculo) => index_1.CidadeDAO.buscaCidadePorId(veiculo.$cidade_id),
                anexoPrincipal: (veiculo) => index_1.AnexoVeiculoDAO.buscaAnexoPrincipalPorVeiculo(veiculo.$id).then((anexo) => {
                    return anexo;
                })
            }
        };
    }
}
exports.VeiculoController = VeiculoController;
//# sourceMappingURL=veiculo.controller.js.map