"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const anexo_veiculo_controller_1 = require("./anexo-veiculo.controller");
const index_2 = require("../cache/index");
class VeiculoPublicController {
    static getType() {
        return `type Veiculo { id: Int, modelo: Modelo, anoFabricacao: Int, anoModelo: Int,
    cor: Cor, valorAnuncio: Float, combustivel: Combustivel, anexoPrincipal: AnexoVeiculo, anexos: [AnexoVeiculo],
    opcionais: [Opcional] }`;
    }
    static getQueries() {
        return `veiculo(id: Int = 0, aleatorios: Boolean = FALSE): [Veiculo]`;
    }
    static getQueryResolvers() {
        return {
            veiculo: (root, args) => this.veiculos(args.id, args.aleatorios)
        };
    }
    static veiculos(id, aleatorio) {
        if (id) {
            return index_1.VeiculoDAO.buscarVeiculoPorId(id, true).then((veiculo) => Array.of(veiculo));
        }
        else {
            if (aleatorio) {
                return index_1.VeiculoDAO.buscarTodosVeiculosDisponiveisAleatoriamenteLimitados();
            }
            else {
                return index_1.VeiculoDAO.buscarTodosVeiculosDisponiveis();
            }
        }
    }
    static getResolvers() {
        return {
            Veiculo: {
                modelo: (veiculo) => index_1.ModeloDAO.buscarModeloPorId(veiculo.$modelo_id),
                cor: (veiculo) => index_2.cores()[veiculo.$cor_id - 1],
                combustivel: (veiculo) => index_2.combustiveis()[veiculo.$combustivel_id - 1],
                anexoPrincipal: (veiculo) => anexo_veiculo_controller_1.AnexoVeiculoController.getAnexoPrincipal(veiculo.$id).then((anexo) => anexo),
                anexos: (veiculo) => index_1.AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(veiculo.$id, true).then((anexos) => anexos),
                opcionais: (veiculo) => index_1.OpcionalDAO.buscarTodosOpcionaisPorVeiculo(veiculo.$id).then((opcionais) => opcionais)
            }
        };
    }
}
exports.VeiculoPublicController = VeiculoPublicController;
//# sourceMappingURL=veiculo.public.controller.js.map