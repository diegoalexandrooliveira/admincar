import {
  VeiculoDAO,
  ModeloDAO,
  AnexoVeiculoDAO,
  OpcionalDAO
} from "../dao/index";
import { AnexoVeiculoController } from "./anexo-veiculo.controller";
import { Veiculo, AnexoVeiculo, Opcional } from "../model/index";
import { cores, combustiveis } from "../cache/index";
import { Client, PoolClient } from "pg";
import { clientFactory } from "../database";

export class VeiculoPublicController {
  public static getType(): string {
    return `type Veiculo { id: Int, modelo: Modelo, anoFabricacao: Int, anoModelo: Int,
    cor: Cor, valorAnuncio: Float, combustivel: Combustivel, anexoPrincipal: AnexoVeiculo, anexos: [AnexoVeiculo],
    opcionais: [Opcional] }`;
  }

  public static getQueries(): string {
    return `veiculo(id: Int = 0, aleatorios: Boolean = FALSE, procurar: String = ""): [Veiculo]`;
  }

  public static getQueryResolvers(): Object {
    return {
      veiculo: (root, args) => this.veiculos(args.id, args.aleatorios, args.procurar)
    };
  }

  public static veiculos(id: number, aleatorio: Boolean, procurar: String) {
    if (id) {
      return VeiculoDAO.buscarVeiculoPorId(id, true).then((veiculo: Veiculo) => {
        if (veiculo) {
          clientFactory.getClient().then((client: PoolClient) =>
            VeiculoDAO.atualizarHitCount(client, veiculo.$id).then((rows) =>
              clientFactory.commit(client).then())
          );
        }
        return Array.of(veiculo);
      });
    } else {
      if (aleatorio) {
        return VeiculoDAO.buscarTodosVeiculosDisponiveisAleatoriamenteLimitados();
      } else {
        return VeiculoDAO.buscarTodosVeiculosDisponiveis(procurar);
      }
    }

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
}
