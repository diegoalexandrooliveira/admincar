"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const graphql = require("graphql");
const graphqlDate = require("graphql-date");
const graphqlExpress = require("express-graphql");
class VeiculoController {
    static schemaVeiculo() {
        return new graphql.GraphQLSchema({
            query: new graphql.GraphQLObjectType({
                name: "VeiculoSchema",
                fields: {
                    veiculos: {
                        type: new graphql.GraphQLList(VeiculoController.veiculoType),
                        resolve: function () {
                            return __awaiter(this, void 0, void 0, function* () {
                                return yield index_1.VeiculoDAO.buscarTodosVeiculos();
                            });
                        }
                    }
                }
            })
        });
    }
    static veiculoGraphQL() {
        return graphqlExpress({
            schema: VeiculoController.schemaVeiculo(),
            pretty: true
        });
    }
}
VeiculoController.veiculoType = new graphql.GraphQLObjectType({
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
});
exports.VeiculoController = VeiculoController;
//# sourceMappingURL=veiculo.controller.js.map