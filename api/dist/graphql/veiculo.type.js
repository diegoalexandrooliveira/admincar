"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// import * as graphqlDate from "graphql-date";
exports.VeiculoType = new graphql_1.GraphQLObjectType({
    name: "Veiculo",
    fields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        idModelo: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        descricaoModelo: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        idMarca: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        descricaoMarca: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        anoFabricacao: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        anoModelo: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        placa: { type: graphql_1.GraphQLString },
        renavam: { type: graphql_1.GraphQLString },
        chassi: { type: graphql_1.GraphQLString },
        idCor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        descricaoCor: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        idCidade: { type: graphql_1.GraphQLInt },
        nomeCidade: {
            type: graphql_1.GraphQLString
        },
        idEstado: { type: graphql_1.GraphQLInt },
        nomeEstado: {
            type: graphql_1.GraphQLString
        },
        siglaEstado: {
            type: graphql_1.GraphQLString
        },
        dataInclusao: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        dataAquisicao: { type: graphql_1.GraphQLString },
        dataVenda: { type: graphql_1.GraphQLString },
        valorAnuncio: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat)
        },
        valorCompra: { type: graphql_1.GraphQLFloat },
        valorVenda: { type: graphql_1.GraphQLFloat },
        observacoes: { type: graphql_1.GraphQLString },
        idCombustivel: { type: graphql_1.GraphQLInt },
        descricaoCombustivel: { type: graphql_1.GraphQLString }
    }
});
//# sourceMappingURL=veiculo.type.js.map