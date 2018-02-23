import { makeExecutableSchema } from "graphql-tools";
import { EstadoController, CidadeController } from "../controllers/index";
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
    }`;
    let types = `
    ${EstadoController.getType()}
    ${CidadeController.getType()}
    `;
    let schema = `schema { query: Query }`;
    return queryTypes.concat(types).concat(schema);
  }

  private static createResolvers(): IResolvers {
    let queryResolvers = { Query: {} };
    queryResolvers.Query = Object.assign(
      {},
      EstadoController.getQueryResolvers(),
      CidadeController.getQueryResolvers()
    );
    let resolvers = {};
    resolvers = Object.assign(
      {},
      EstadoController.getResolvers(),
      CidadeController.getResolvers()
    );

    return Object.assign({}, queryResolvers, resolvers);
  }
}
