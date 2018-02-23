"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const index_1 = require("../controllers/index");
class GraphQlSchemaFactory {
    static createSchema() {
        let typesDefs = GraphQlSchemaFactory.createTypeDefs();
        let resolvers = GraphQlSchemaFactory.createResolvers();
        return graphql_tools_1.makeExecutableSchema({ typeDefs: typesDefs, resolvers: resolvers });
    }
    static createTypeDefs() {
        let queryTypes = `type Query {
        ${index_1.EstadoController.getQueries()}
        ${index_1.CidadeController.getQueries()}        
    }`;
        let types = `
    ${index_1.EstadoController.getType()}
    ${index_1.CidadeController.getType()}
    `;
        let schema = `schema { query: Query }`;
        return queryTypes.concat(types).concat(schema);
    }
    static createResolvers() {
        let queryResolvers = { Query: {} };
        queryResolvers.Query = Object.assign({}, index_1.EstadoController.getQueryResolvers(), index_1.CidadeController.getQueryResolvers());
        let resolvers = {};
        resolvers = Object.assign({}, index_1.EstadoController.getResolvers(), index_1.CidadeController.getResolvers());
        return Object.assign({}, queryResolvers, resolvers);
    }
}
exports.GraphQlSchemaFactory = GraphQlSchemaFactory;
//# sourceMappingURL=graphql.schema.factory.js.map