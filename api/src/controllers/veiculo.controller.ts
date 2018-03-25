import {
  VeiculoDAO,
  ModeloDAO,
  CidadeDAO,
  AnexoVeiculoDAO
} from "../dao/index";
import { Veiculo, AnexoVeiculo, Mensagem } from "../model/index";
import { cores, combustiveis } from "../cache/index";
import { clientFactory } from "../database";
import { Client } from "pg";

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

  public static getMutations(): string {
    return `excluirVeiculo(id: Int): Boolean`;
  }

  public static getQueryResolvers(): Object {
    return {
      veiculos: this.buscarVeiculos,
      veiculo: (root, args) => VeiculoDAO.buscarVeiculoPorId(args.id)
    };
  }

  public static getMutationsResolvers(): Object {
    return {
      excluirVeiculo: this.excluirVeiculo
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
          CidadeDAO.buscaCidadePorId(veiculo.$cidade_id),
        anexoPrincipal: (veiculo: Veiculo) =>
          AnexoVeiculoDAO.buscaAnexoPrincipalPorVeiculo(veiculo.$id).then(
            (anexo: AnexoVeiculo) => anexo
          )
      }
    };
  }

  private static buscarVeiculos(root, args) {
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
  }

  private static situacaoDesejada(situacao: string, vendido: boolean): boolean {
    if (situacao == "vendidos" && vendido) {
      return true;
    } else if (situacao == "disponiveis" && !vendido) {
      return true;
    } else {
      return false;
    }
  }

  private static excluirVeiculo(root, args): Promise<boolean> {
    return new Promise((resolve, reject) => {
      clientFactory
        .getClient()
        .then((client: Client) => {
          AnexoVeiculoDAO.excluirTodosAnexoPorVeiculo(client, args.id)
            .then((row: number) => {
              VeiculoDAO.deletarVeiculo(client, args.id)
                .then(rows => {
                  clientFactory.commit(client);
                  if (rows) {
                    return resolve(true);
                  } else {
                    return reject(
                      JSON.stringify(
                        Array.of(
                          new Mensagem("Nenhum veículo removido.", "warn")
                        )
                      )
                    );
                  }
                })
                .catch(erro => {
                  clientFactory.rollback(client);
                  reject(erro);
                });
            })
            .catch(erro => {
              clientFactory.rollback(client);
              reject(erro);
            });
        })
        .catch(erro => reject(erro));
    });
  }
}
