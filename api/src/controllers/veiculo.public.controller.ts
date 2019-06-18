import {
  VeiculoDAO,
  ModeloDAO,
  AnexoVeiculoDAO,
  OpcionalDAO
} from "../dao/index";
import {AnexoVeiculoController} from "./anexo-veiculo.controller";
import { Veiculo, AnexoVeiculo, Opcional } from "../model/index";
import { cores, combustiveis } from "../cache/index";

export class VeiculoPublicController {
  public static getType(): string {
    return `type Veiculo { id: Int, modelo: Modelo, anoFabricacao: Int, anoModelo: Int,
    cor: Cor, valorAnuncio: Float, combustivel: Combustivel, anexoPrincipal: AnexoVeiculo, anexos: [AnexoVeiculo],
    opcionais: [Opcional] }`;
  }

  public static getQueries(): string {
    return `veiculos(limite: Int = 0): [Veiculo]
            veiculo(id: Int): Veiculo`;
  }

  public static getQueryResolvers(): Object {
    return {
      veiculos: this.buscarVeiculosDisponiveis,
      veiculo: (root, args) => VeiculoDAO.buscarVeiculoPorId(args.id, true)
    };
  }

  public static getResolvers(): Object {
    return {
      Veiculo: {
        modelo: (veiculo: Veiculo) =>
          ModeloDAO.buscarModeloPorId(veiculo.$modelo_id),
        cor: (veiculo: Veiculo) => cores()[veiculo.$cor_id - 1],
        combustivel: (veiculo: Veiculo) =>
          combustiveis()[veiculo.$combustivel_id - 1],
        anexoPrincipal: (veiculo: Veiculo) =>
        AnexoVeiculoController.getAnexoPrincipal(veiculo.$id).then(
            (anexo: AnexoVeiculo) => anexo
          ),
        anexos: (veiculo: Veiculo) =>
          AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(veiculo.$id, true).then(
            (anexos: AnexoVeiculo[]) => anexos
          ),
        opcionais: (veiculo: Veiculo) =>
          OpcionalDAO.buscarTodosOpcionaisPorVeiculo(veiculo.$id).then(
            (opcionais: Opcional[]) => opcionais
          )
      }
    };
  }

  private static buscarVeiculosDisponiveis(root, args) {
    return VeiculoDAO.buscarTodosVeiculosDisponiveis().then((veiculos: Veiculo[]) => {
      return args.limite
        ? veiculos.slice(0, args.limite)
        : veiculos;
    });
  }
}
