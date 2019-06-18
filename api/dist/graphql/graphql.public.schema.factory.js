"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const GraphQLToolsTypes = require("graphql-tools-types");
const index_1 = require("../controllers/index");
class GraphQlPublicSchemaFactory {
    static createSchema() {
        let typesDefs = GraphQlPublicSchemaFactory.createTypeDefs();
        let resolvers = GraphQlPublicSchemaFactory.createResolvers();
        return graphql_tools_1.makeExecutableSchema({ typeDefs: typesDefs, resolvers: resolvers });
    }
    static createTypeDefs() {
        let queryTypes = `scalar Date
        type Query {
        ${index_1.VeiculoPublicController.getQueries()}
    }`;
        let types = `
    ${index_1.VeiculoPublicController.getType()}
    ${index_1.TipoVeiculoController.getType()}
    ${index_1.MarcaController.getType()}
    ${index_1.ModeloController.getType()}
    ${index_1.CombustivelController.getType()}
    ${index_1.CorController.getType()}
    ${index_1.AnexoVeiculoController.getType()}
    ${index_1.OpcionalController.getType()}
    `;
        let schema = `schema { query: Query }`;
        return queryTypes.concat(types).concat(schema);
    }
    static createResolvers() {
        let resolvers = {
            Query: {},
            Date: GraphQLToolsTypes.Date({ name: "Date time" })
        };
        resolvers.Query = Object.assign({}, index_1.VeiculoPublicController.getQueryResolvers());
        let objectResolvers = {};
        objectResolvers = Object.assign({}, index_1.VeiculoPublicController.getResolvers(), index_1.ModeloController.getResolvers());
        return Object.assign({}, resolvers, objectResolvers);
    }
}
exports.GraphQlPublicSchemaFactory = GraphQlPublicSchemaFactory;
//# sourceMappingURL=graphql.public.schema.factory.js.map