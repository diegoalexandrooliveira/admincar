import { makeExecutableSchema } from "graphql-tools";
import * as GraphQLToolsTypes from "graphql-tools-types";
import {
  VeiculoPublicController,TipoVeiculoController,
  MarcaController,
  ModeloController, CombustivelController, CorController, AnexoVeiculoController, OpcionalController
} from "../controllers/index";
import { IResolvers } from "graphql-tools/dist/Interfaces";
import { GraphQLSchema } from "graphql";
import { Cor } from "../model";

export class GraphQlPublicSchemaFactory {
  public static createSchema(): GraphQLSchema {
    let typesDefs = GraphQlPublicSchemaFactory.createTypeDefs();
    let resolvers = GraphQlPublicSchemaFactory.createResolvers();
    return makeExecutableSchema({ typeDefs: typesDefs, resolvers: resolvers });
  }

  private static createTypeDefs(): string {
    let queryTypes = `scalar Date
        type Query {
        ${VeiculoPublicController.getQueries()}
    }`;
    let types = `
    ${VeiculoPublicController.getType()}
    ${TipoVeiculoController.getType()}
    ${MarcaController.getType()}
    ${ModeloController.getType()}
    ${CombustivelController.getType()}
    ${CorController.getType()}
    ${AnexoVeiculoController.getType()}
    ${OpcionalController.getType()}
    `;
    let schema = `schema { query: Query }`;
    return queryTypes.concat(types).concat(schema);
  }

  private static createResolvers(): IResolvers {
    let resolvers = {
      Query: {},
      Date: GraphQLToolsTypes.Date({ name: "Date time" })
    };
    resolvers.Query = Object.assign(
      {},
      VeiculoPublicController.getQueryResolvers()
    );
    let objectResolvers = {};
    objectResolvers = Object.assign(
      {},
      VeiculoPublicController.getResolvers(),
      ModeloController.getResolvers()
    );

    return Object.assign({}, resolvers, objectResolvers);
  }
}
