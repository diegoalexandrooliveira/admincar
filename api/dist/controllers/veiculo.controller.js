"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_factory_1 = require("../database/client.factory");
const resposta_model_1 = require("../model/resposta.model");
const index_1 = require("../dao/index");
const graphql_1 = require("graphql");
const graphqlExpress = require("express-graphql");
const index_2 = require("../graphql/index");
const model_1 = require("../model");
class VeiculoController {
    static schemaVeiculo() {
        return new graphql_1.GraphQLSchema({
            query: new graphql_1.GraphQLObjectType({
                name: "VeiculoSchema",
                fields: {
                    veiculos: {
                        type: new graphql_1.GraphQLList(index_2.VeiculoType),
                        resolve: () => index_1.VeiculoDAO.buscarTodosVeiculos()
                    },
                    veiculo: {
                        type: index_2.VeiculoType,
                        args: {
                            id: {
                                type: graphql_1.GraphQLInt
                            }
                        },
                        resolve: (obj, args) => index_1.VeiculoDAO.buscarVeiculoPorId(args.id)
                    }
                }
            })
        });
    }
    static veiculoGraphQL() {
        return graphqlExpress({
            schema: VeiculoController.schemaVeiculo(),
            pretty: false
        });
    }
    static inserirVeiculo(req, res) {
        let veiculo = new model_1.Veiculo();
        veiculo.bodyParaModel(req.body);
        veiculo
            .validarVeiculo(true)
            .then((erros) => {
            if (erros.length > 0) {
                return res.status(400).json(new resposta_model_1.Resposta(null, erros));
            }
            client_factory_1.clientFactory
                .getClient()
                .then((client) => {
                veiculo.$dataInclusao = new Date();
                index_1.VeiculoDAO.inserirVeiculo(client, veiculo)
                    .then((veiculo) => {
                    client_factory_1.clientFactory.commit(client);
                    return veiculo;
                })
                    .then((veiculo) => res
                    .status(201)
                    .json(new resposta_model_1.Resposta(new model_1.Mensagem(`Veículo incluído com sucesso.`, "info"), null, veiculo)))
                    .catch((erro) => {
                    res.status(500).json(new resposta_model_1.Resposta(erro));
                    client_factory_1.clientFactory.rollback(client);
                });
            })
                .catch((erro) => {
                res.status(500).json(new resposta_model_1.Resposta(erro));
            });
        })
            .catch(erro => {
            res.status(500).json(new resposta_model_1.Resposta(erro));
        });
    }
}
exports.VeiculoController = VeiculoController;
//# sourceMappingURL=veiculo.controller.js.map