import {
  VeiculoDAO,
  ModeloDAO,
  CidadeDAO,
  AnexoVeiculoDAO
} from "../dao/index";
import { Veiculo, AnexoVeiculo } from "../model/index";
import { cores, combustiveis } from "../cache/index";

export class VeiculoController {
  public static getType(): string {
    return `type Veiculo { id: Int, modelo: Modelo, anoFabricacao: Int, anoModelo: Int,
    placa: String, renavam: String, chassi: String, cor: Cor, cidade: Cidade, 
  dataInclusao: Date, dataAquisicao: Date, dataVenda: Date, valorCompra: Float, valorVenda: Float,
valorAnuncio: Float, observacoes: String, combustivel: Combustivel, anexoPrincipal: AnexoVeiculo }`;
  }

  public static getQueries(): string {
    return `veiculos(limite: Int = 0, situacao: String = "todos"): [Veiculo]
            veiculo(id: Int): Veiculo`;
  }

  public static getQueryResolvers(): Object {
    return {
      veiculos: (root, args) => {
        return VeiculoDAO.buscarTodosVeiculos().then((veiculos: Veiculo[]) => {
          let veiculosFiltrados: Veiculo[] = veiculos;
          if (
            args.situacao &&
            (args.situacao == "vendidos" || args.situacao == "disponiveis")
          ) {
            veiculosFiltrados = veiculos.filter((veiculo: Veiculo) =>
              VeiculoController.situacaoDesejada(
                args.situacao,
                veiculo.$dataVenda != undefined
              )
            );
          }
          return args.limite
            ? veiculosFiltrados.slice(0, args.limite)
            : veiculosFiltrados;
        });
      },
      veiculo: (root, args) => VeiculoDAO.buscarVeiculoPorId(args.id)
    };
  }

  private static situacaoDesejada(situacao: string, vendido: boolean): boolean {
    if (situacao == "vendidos" && vendido) {
      return true;
    } else if (situacao == "disponiveis" && !vendido) {
      return true;
    } else {
      false;
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
        cidade: (veiculo: Veiculo) =>
          CidadeDAO.buscaCidadePorId(veiculo.$cidade_id),
        anexoPrincipal: (veiculo: Veiculo) =>
          AnexoVeiculoDAO.buscaAnexoPrincipalPorVeiculo(veiculo.$id).then(
            (anexo: AnexoVeiculo) => {
              return anexo;
            }
          )
      }
    };
  }
}
