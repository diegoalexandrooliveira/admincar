import { Request, Response, NextFunction, Router } from "express";
import { VeiculoDAO } from "../dao/index";
import { logger } from "../utils";
import { Veiculo, Mensagem, Resposta } from "../model";
import * as graphql from "graphql";
import * as graphqlDate from "graphql-date";
import * as graphqlExpress from "express-graphql";

export class VeiculoController {
  private static veiculoType: graphql.GraphQLObjectType = new graphql.GraphQLObjectType(
    {
      name: "Veiculo",
      fields: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        idModelo: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        descricaoModelo: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        idMarca: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        descricaoMarca: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        anoFabricacao: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        anoModelo: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        placa: { type: graphql.GraphQLString },
        renavam: { type: graphql.GraphQLString },
        chassi: { type: graphql.GraphQLString },
        idCor: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        descricaoCor: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        idCidade: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        nomeCidade: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        idEstado: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        nomeEstado: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        siglaEstado: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        dataInclusao: { type: new graphql.GraphQLNonNull(graphqlDate) },
        dataAquisicao: { type: graphqlDate },
        dataVenda: { type: graphqlDate },
        valorAnuncio: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
        },
        valorCompra: { type: graphql.GraphQLFloat },
        valorVenda: { type: graphql.GraphQLFloat },
        observacoes: { type: graphql.GraphQLString },
        idCombustivel: { type: graphql.GraphQLInt },
        descricaoCombustivel: { type: graphql.GraphQLString }
      }
    }
  );

  private static schemaVeiculo(): graphql.GraphQLSchema {
    return new graphql.GraphQLSchema({
      query: new graphql.GraphQLObjectType({
        name: "VeiculoSchema",
        fields: {
          veiculos: {
            type: new graphql.GraphQLList(VeiculoController.veiculoType),
            resolve: () => VeiculoDAO.buscarTodosVeiculos()
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
}
