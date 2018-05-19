import {
  VeiculoDAO,
  ModeloDAO,
  CidadeDAO,
  AnexoVeiculoDAO,
  OpcionalDAO
} from "../dao/index";
import { Veiculo, AnexoVeiculo, Mensagem, Opcional } from "../model/index";
import { cores, combustiveis } from "../cache/index";
import { clientFactory } from "../database";
import { Client } from "pg";
import { AnexoVeiculoController } from ".";

export class VeiculoController {
  public static getType(): string {
    return `type Veiculo { id: Int, modelo: Modelo, anoFabricacao: Int, anoModelo: Int,
    placa: String, renavam: String, chassi: String, cor: Cor, cidade: Cidade, 
  dataInclusao: Date, dataAquisicao: Date, dataVenda: Date, valorCompra: Float, valorVenda: Float,
valorAnuncio: Float, observacoes: String, combustivel: Combustivel, anexoPrincipal: AnexoVeiculo, anexos: [AnexoVeiculo],
opcionais: [Opcional] }

input VeiculoInput { id: Int, modelo: Int, anoFabricacao: Int, anoModelo: Int,
  placa: String, renavam: String, chassi: String, cor: Int, cidade: Int, 
dataInclusao: Date, dataAquisicao: Date, dataVenda: Date, valorCompra: Float, valorVenda: Float,
valorAnuncio: Float, observacoes: String, combustivel: Int, opcionais: [OpcionalInput] }`;
  }

  public static getQueries(): string {
    return `veiculos(limite: Int = 0, situacao: String = "todos"): [Veiculo]
            veiculo(id: Int): Veiculo`;
  }

  public static getMutations(): string {
    return `excluirVeiculo(id: Int): Boolean
    inserirVeiculo(veiculo: VeiculoInput): Int
    atualizarVeiculo(veiculo: VeiculoInput): Int`;
  }

  public static getQueryResolvers(): Object {
    return {
      veiculos: this.buscarVeiculos,
      veiculo: (root, args) => VeiculoDAO.buscarVeiculoPorId(args.id)
    };
  }

  public static getMutationsResolvers(): Object {
    return {
      excluirVeiculo: this.excluirVeiculo.bind(this),
      inserirVeiculo: this.inserirVeiculo,
      atualizarVeiculo: this.atualizarVeiculo
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
          ),
        anexos: (veiculo: Veiculo) =>
          AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(veiculo.$id).then(
            (anexos: AnexoVeiculo[]) => anexos
          ),
        opcionais: (veiculo: Veiculo) =>
          OpcionalDAO.buscarTodosOpcionaisPorVeiculo(veiculo.$id).then(
            (opcionais: Opcional[]) => opcionais
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
    let client = null;
    return new Promise((resolve, reject) => {
      this.excluirTodosAnexosDoVeiculo(args.id)
        .then(() => clientFactory.getClient())
        .then((result: Client) => {
          client = result;
          return AnexoVeiculoDAO.excluirTodosAnexoPorVeiculo(client, args.id);
        })
        .then((row: number) => {
          return VeiculoDAO.deletarVeiculo(client, args.id);
        })
        .then(rows => {
          clientFactory.commit(client);
          if (rows) {
            return resolve(true);
          } else {
            return reject(
              JSON.stringify(
                Array.of(new Mensagem("Nenhum veículo removido.", "warn"))
              )
            );
          }
        })
        .catch(erro => {
          if (client) {
            clientFactory.rollback(client);
          }
          reject(erro);
        });
    });
  }

  public static inserirVeiculo(root, args): Promise<number> {
    return new Promise((resolve, reject) => {
      let veiculo = new Veiculo();
      veiculo.toModel(args.veiculo);
      let opcionais = args.veiculo["opcionais"];
      veiculo.validarVeiculo(true).then((erros: Mensagem[]) => {
        if (erros.length > 0) {
          reject(JSON.stringify(erros));
        } else {
          veiculo.$dataInclusao = new Date();
          let client = null;
          let idVeiculo = 0;
          clientFactory
            .getClient()

            .then((cliente: Client) => {
              client = cliente;
              return VeiculoDAO.inserirVeiculo(client, veiculo);
            })
            .then(id => {
              idVeiculo = id;
              return Promise.all(
                opcionais.map(opcional =>
                  OpcionalDAO.inserirOpcionalPorVeiculo(
                    client,
                    opcional.id,
                    idVeiculo
                  )
                )
              );
            })
            .then(() => {
              clientFactory.commit(client);
              resolve(idVeiculo);
            })
            .catch(erro => {
              if (client) {
                clientFactory.rollback(client);
              }
              reject(erro);
            });
        }
      });
    });
  }

  public static atualizarVeiculo(root, args): Promise<number> {
    return new Promise((resolve, reject) => {
      let veiculo = new Veiculo();
      veiculo.toModel(args.veiculo);
      let opcionais = args.veiculo["opcionais"];
      if (!opcionais) {
        opcionais = [];
      }
      veiculo.validarVeiculo(false).then((erros: Mensagem[]) => {
        if (erros.length > 0) {
          reject(JSON.stringify(erros));
        } else {
          let client = null;
          clientFactory
            .getClient()
            .then((cliente: Client) => (client = cliente))
            .then(() =>
              OpcionalDAO.excluirTodosOpcionaisVeiculo(client, veiculo.$id)
            )
            .then(() =>
              Promise.all(
                opcionais.map(opcional =>
                  OpcionalDAO.inserirOpcionalPorVeiculo(
                    client,
                    opcional.id,
                    veiculo.$id
                  )
                )
              )
            )
            .then(() => VeiculoDAO.atualizarVeiculo(client, veiculo))
            .then(rows => {
              clientFactory.commit(client);
              resolve(rows);
            })
            .catch(erro => {
              if (client) {
                clientFactory.rollback(client);
              }
              reject(erro);
            });
        }
      });
    });
  }

  private static excluirTodosAnexosDoVeiculo(id: number) {
    return AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(id).then(
      (anexos: AnexoVeiculo[]) =>
        Promise.all(
          anexos.map(anexo =>
            AnexoVeiculoController.deleteImageFromStorage(anexo.$id)
          )
        )
    );
  }
}
