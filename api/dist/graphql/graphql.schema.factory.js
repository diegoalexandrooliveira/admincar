"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const GraphQLToolsTypes = require("graphql-tools-types");
const index_1 = require("../controllers/index");
class GraphQlSchemaFactory {
    static createSchema() {
        let typesDefs = GraphQlSchemaFactory.createTypeDefs();
        let resolvers = GraphQlSchemaFactory.createResolvers();
        return graphql_tools_1.makeExecutableSchema({ typeDefs: typesDefs, resolvers: resolvers });
    }
    static createTypeDefs() {
        let queryTypes = `scalar Date
        type Query {
        ${index_1.EstadoController.getQueries()}
        ${index_1.CidadeController.getQueries()}
        ${index_1.TipoVeiculoController.getQueries()}
        ${index_1.MarcaController.getQueries()}
        ${index_1.ModeloController.getQueries()}
        ${index_1.CombustivelController.getQueries()}
        ${index_1.CorController.getQueries()}
        ${index_1.VeiculoController.getQueries()}
        ${index_1.ChartComparativoController.getQueries()}
        ${index_1.UsuarioController.getQueries()}
        ${index_1.AnexoVeiculoController.getQueries()}
        ${index_1.OpcionalController.getQueries()}
    }
    type Mutation {
      ${index_1.UsuarioController.getMutations()}
      ${index_1.VeiculoController.getMutations()}
      ${index_1.AnexoVeiculoController.getMutations()}
    }`;
        let types = `
    ${index_1.EstadoController.getType()}
    ${index_1.CidadeController.getType()}
    ${index_1.TipoVeiculoController.getType()}
    ${index_1.MarcaController.getType()}
    ${index_1.ModeloController.getType()}
    ${index_1.CombustivelController.getType()}
    ${index_1.CorController.getType()}
    ${index_1.VeiculoController.getType()}
    ${index_1.ChartComparativoController.getType()}
    ${index_1.UsuarioController.getType()}
    ${index_1.AnexoVeiculoController.getType()}
    ${index_1.OpcionalController.getType()}
    `;
        let schema = `schema { query: Query
                           mutation: Mutation }`;
        return queryTypes.concat(types).concat(schema);
    }
    static createResolvers() {
        let resolvers = {
            Query: {},
            Mutation: {},
            Date: GraphQLToolsTypes.Date({ name: "Date time" })
        };
        resolvers.Query = Object.assign({}, index_1.EstadoController.getQueryResolvers(), index_1.CidadeController.getQueryResolvers(), index_1.TipoVeiculoController.getQueryResolvers(), index_1.MarcaController.getQueryResolvers(), index_1.ModeloController.getQueryResolvers(), index_1.CombustivelController.getQueryResolvers(), index_1.CorController.getQueryResolvers(), index_1.VeiculoController.getQueryResolvers(), index_1.ChartComparativoController.getQueryResolvers(), index_1.UsuarioController.getQueryResolvers(), index_1.AnexoVeiculoController.getQueryResolvers(), index_1.OpcionalController.getQueryResolvers());
        resolvers.Mutation = Object.assign({}, index_1.UsuarioController.getMutationsResolvers(), index_1.VeiculoController.getMutationsResolvers(), index_1.AnexoVeiculoController.getMutationsResolvers());
        let objectResolvers = {};
        objectResolvers = Object.assign({}, index_1.EstadoController.getResolvers(), index_1.CidadeController.getResolvers(), index_1.TipoVeiculoController.getResolvers(), index_1.MarcaController.getResolvers(), index_1.ModeloController.getResolvers(), index_1.CombustivelController.getResolvers(), index_1.CorController.getResolvers(), index_1.VeiculoController.getResolvers(), index_1.ChartComparativoController.getResolvers(), index_1.UsuarioController.getResolvers(), index_1.AnexoVeiculoController.getResolvers(), index_1.OpcionalController.getResolvers());
        return Object.assign({}, resolvers, objectResolvers);
    }
}
exports.GraphQlSchemaFactory = GraphQlSchemaFactory;
//# sourceMappingURL=graphql.schema.factory.js.map