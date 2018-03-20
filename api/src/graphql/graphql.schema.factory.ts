import { makeExecutableSchema } from "graphql-tools";
import * as GraphQLToolsTypes from "graphql-tools-types";
import {
  EstadoController,
  CidadeController,
  TipoVeiculoController,
  MarcaController,
  ModeloController,
  CombustivelController,
  CorController,
  VeiculoController,
  ChartComparativoController,
  UsuarioController,
  AnexoVeiculoController
} from "../controllers/index";
import { IResolvers } from "graphql-tools/dist/Interfaces";
import { GraphQLSchema } from "graphql";

export class GraphQlSchemaFactory {
  public static createSchema(): GraphQLSchema {
    let typesDefs = GraphQlSchemaFactory.createTypeDefs();
    let resolvers = GraphQlSchemaFactory.createResolvers();
    return makeExecutableSchema({ typeDefs: typesDefs, resolvers: resolvers });
  }

  private static createTypeDefs(): string {
    let queryTypes = `scalar Date
        type Query {
        ${EstadoController.getQueries()}
        ${CidadeController.getQueries()}
        ${TipoVeiculoController.getQueries()}
        ${MarcaController.getQueries()}
        ${ModeloController.getQueries()}
        ${CombustivelController.getQueries()}
        ${CorController.getQueries()}
        ${VeiculoController.getQueries()}
        ${ChartComparativoController.getQueries()}
        ${UsuarioController.getQueries()}
        ${AnexoVeiculoController.getQueries()}
    }
    type Mutation {
      ${UsuarioController.getMutations()}
    }`;
    let types = `
    ${EstadoController.getType()}
    ${CidadeController.getType()}
    ${TipoVeiculoController.getType()}
    ${MarcaController.getType()}
    ${ModeloController.getType()}
    ${CombustivelController.getType()}
    ${CorController.getType()}
    ${VeiculoController.getType()}
    ${ChartComparativoController.getType()}
    ${UsuarioController.getType()}
    ${AnexoVeiculoController.getType()}
    `;
    let schema = `schema { query: Query
                           mutation: Mutation }`;
    return queryTypes.concat(types).concat(schema);
  }

  private static createResolvers(): IResolvers {
    let resolvers = {
      Query: {},
      Mutation: {},
      Date: GraphQLToolsTypes.Date({ name: "Date time" })
    };
    resolvers.Query = Object.assign(
      {},
      EstadoController.getQueryResolvers(),
      CidadeController.getQueryResolvers(),
      TipoVeiculoController.getQueryResolvers(),
      MarcaController.getQueryResolvers(),
      ModeloController.getQueryResolvers(),
      CombustivelController.getQueryResolvers(),
      CorController.getQueryResolvers(),
      VeiculoController.getQueryResolvers(),
      ChartComparativoController.getQueryResolvers(),
      UsuarioController.getQueryResolvers(),
      AnexoVeiculoController.getQueryResolvers()
    );
    resolvers.Mutation = Object.assign(
      {},
      UsuarioController.getMutationsResolvers()
    );
    let objectResolvers = {};
    objectResolvers = Object.assign(
      {},
      EstadoController.getResolvers(),
      CidadeController.getResolvers(),
      TipoVeiculoController.getResolvers(),
      MarcaController.getResolvers(),
      ModeloController.getResolvers(),
      CombustivelController.getResolvers(),
      CorController.getResolvers(),
      VeiculoController.getResolvers(),
      ChartComparativoController.getResolvers(),
      UsuarioController.getResolvers(),
      AnexoVeiculoController.getResolvers()
    );

    return Object.assign({}, resolvers, objectResolvers);
  }
}
