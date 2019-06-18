"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const index_2 = require("../cache/index");
class VeiculoController {
    static getType() {
        return `type Veiculo { id: Int, modelo: Modelo, anoFabricacao: Int, anoModelo: Int,
    cor: Cor, valorAnuncio: Float, combustivel: Combustivel, anexoPrincipal: AnexoVeiculo, anexos: [AnexoVeiculo],
    opcionais: [Opcional] }`;
    }
    static getQueries() {
        return `veiculos(limite: Int = 0): [Veiculo]
            veiculo(id: Int): Veiculo`;
    }
    static getQueryResolvers() {
        return {
            veiculos: this.buscarVeiculosDisponiveis,
            veiculo: (root, args) => index_1.VeiculoDAO.buscarVeiculoPorId(args.id)
        };
    }
    static getResolvers() {
        return {
            Veiculo: {
                modelo: (veiculo) => index_1.ModeloDAO.buscarModeloPorId(veiculo.$modelo_id),
                cor: (veiculo) => index_2.cores()[veiculo.$cor_id - 1],
                combustivel: (veiculo) => index_2.combustiveis()[veiculo.$combustivel_id - 1],
                anexoPrincipal: (veiculo) => index_1.AnexoVeiculoDAO.buscaAnexoPrincipalPorVeiculo(veiculo.$id).then((anexo) => anexo),
                anexos: (veiculo) => index_1.AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(veiculo.$id, true).then((anexos) => anexos),
                opcionais: (veiculo) => index_1.OpcionalDAO.buscarTodosOpcionaisPorVeiculo(veiculo.$id).then((opcionais) => opcionais)
            }
        };
    }
    static buscarVeiculosDisponiveis(root, args) {
        return index_1.VeiculoDAO.buscarTodosVeiculosDisponiveis().then((veiculos) => {
            return args.limite
                ? veiculos.slice(0, args.limite)
                : veiculos;
        });
    }
}
exports.VeiculoController = VeiculoController;
//# sourceMappingURL=veiculo.public.controller..js.map