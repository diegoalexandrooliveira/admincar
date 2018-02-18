import { clientFactory } from "../database/client.factory";
import { Resposta } from "../model/resposta.model";
import { Router, Request, Response } from "express";
import { VeiculoDAO } from "../dao/index";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} from "graphql";
import * as graphqlDate from "graphql-date";
import * as graphqlExpress from "express-graphql";
import { VeiculoType } from "../graphql/index";
import { Veiculo, Mensagem } from "../model";
import { Client } from "pg";

export class VeiculoController {
  private static schemaVeiculo(): GraphQLSchema {
    return new GraphQLSchema({
      query: new GraphQLObjectType({
        name: "VeiculoSchema",
        fields: {
          veiculos: {
            type: new GraphQLList(VeiculoType),
            resolve: () => VeiculoDAO.buscarTodosVeiculos()
          },
          veiculo: {
            type: VeiculoType,
            args: {
              id: {
                type: GraphQLInt
              }
            },
            resolve: (obj, args) => VeiculoDAO.buscarVeiculoPorId(args.id)
          }
        }
      })
    });
  }

  public static veiculoGraphQL() {
    return graphqlExpress({
      schema: VeiculoController.schemaVeiculo(),
      pretty: false
    });
  }

  public static inserirVeiculo(req: Request, res: Response) {
    let veiculo = new Veiculo();
    veiculo.bodyParaModel(req.body);
    veiculo
      .validarVeiculo(true)
      .then((erros: Mensagem[]) => {
        if (erros.length > 0) {
          return res.status(400).json(new Resposta(null, erros));
        }
        clientFactory
          .getClient()
          .then((client: Client) => {
            veiculo.$dataInclusao = new Date();
            VeiculoDAO.inserirVeiculo(client, veiculo)
              .then((veiculo: Veiculo) => {
                clientFactory.commit(client);
                return veiculo;
              })
              .then((veiculo: Veiculo) =>
                res
                  .status(201)
                  .json(
                    new Resposta(
                      new Mensagem(`Veículo incluído com sucesso.`, "info"),
                      null,
                      veiculo
                    )
                  )
              )
              .catch((erro: Mensagem) => {
                res.status(500).json(new Resposta(erro));
                clientFactory.rollback(client);
              });
          })
          .catch((erro: Mensagem) => {
            res.status(500).json(new Resposta(erro));
          });
      })
      .catch(erro => {
        res.status(500).json(new Resposta(erro));
      });
  }
}
