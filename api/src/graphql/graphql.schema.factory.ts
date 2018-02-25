import { makeExecutableSchema } from "graphql-tools";
import {
  EstadoController,
  CidadeController,
  TipoVeiculoController,
  MarcaController,
  ModeloController
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
    let queryTypes = `type Query {
        ${EstadoController.getQueries()}
        ${CidadeController.getQueries()}
        ${TipoVeiculoController.getQueries()}
        ${MarcaController.getQueries()}
        ${ModeloController.getQueries()}
    }`;
    let types = `
    ${EstadoController.getType()}
    ${CidadeController.getType()}
    ${TipoVeiculoController.getType()}
    ${MarcaController.getType()}
    ${ModeloController.getType()}
    `;
    let schema = `schema { query: Query }`;
    return queryTypes.concat(types).concat(schema);
  }

  private static createResolvers(): IResolvers {
    let queryResolvers = { Query: {} };
    queryResolvers.Query = Object.assign(
      {},
      EstadoController.getQueryResolvers(),
      CidadeController.getQueryResolvers(),
      TipoVeiculoController.getQueryResolvers(),
      MarcaController.getQueryResolvers(),
      ModeloController.getQueryResolvers()
    );
    let resolvers = {};
    resolvers = Object.assign(
      {},
      EstadoController.getResolvers(),
      CidadeController.getResolvers(),
      TipoVeiculoController.getResolvers(),
      MarcaController.getResolvers(),
      ModeloController.getResolvers()
    );

    return Object.assign({}, queryResolvers, resolvers);
  }
}
