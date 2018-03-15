import { VeiculoDAO, ModeloDAO, CidadeDAO } from "../dao/index";
import { Veiculo } from "../model/index";
import { cores, combustiveis } from "../cache/index";

export class VeiculoController {
  public static getType(): string {
    return `type Veiculo { id: Int, modelo: Modelo, anoFabricacao: Int, anoModelo: Int,
    placa: String, renavam: String, chassi: String, cor: Cor, cidade: Cidade, 
  dataInclusao: Date, dataAquisicao: Date, dataVenda: Date, valorCompra: Float, valorVenda: Float,
valorAnuncio: Float, observacoes: String, combustivel: Combustivel }`;
  }

  public static getQueries(): string {
    return `veiculos(limite: Int = 0, disponiveis: Boolean = false): [Veiculo]
            veiculo(id: Int): Veiculo`;
  }

  public static getQueryResolvers(): Object {
    return {
      veiculos: (root, args) => {
        return VeiculoDAO.buscarTodosVeiculos().then((veiculos: Veiculo[]) => {
          let veiculosFiltrados: Veiculo[] = veiculos;
          if (args.disponiveis) {
            veiculosFiltrados = veiculos.filter(
              (veiculo: Veiculo) => !veiculo.$dataVenda
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

  public static getResolvers(): Object {
    return {
      Veiculo: {
        modelo: (veiculo: Veiculo) =>
          ModeloDAO.buscarModeloPorId(veiculo.$modelo_id),
        cor: (veiculo: Veiculo) => cores()[veiculo.$cor_id - 1],
        combustivel: (veiculo: Veiculo) =>
          combustiveis()[veiculo.$combustivel_id - 1],
        cidade: (veiculo: Veiculo) =>
          CidadeDAO.buscaCidadePorId(veiculo.$cidade_id)
      }
    };
  }
}
