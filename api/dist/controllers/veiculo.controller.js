"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_factory_1 = require("../database/client.factory");
const resposta_model_1 = require("../model/resposta.model");
const index_1 = require("../dao/index");
// import * as graphqlExpress from "express-graphql";
// import { VeiculoType } from "../graphql/index";
const model_1 = require("../model");
class VeiculoController {
    // private static schemaVeiculo(): GraphQLSchema {
    //   return new GraphQLSchema({
    //     query: new GraphQLObjectType({
    //       name: "VeiculoSchema",
    //       fields: {
    //         veiculos: {
    //           type: new GraphQLList(VeiculoType),
    //           resolve: () => VeiculoDAO.buscarTodosVeiculos()
    //         },
    //         veiculo: {
    //           type: VeiculoType,
    //           args: {
    //             id: {
    //               type: GraphQLInt
    //             }
    //           },
    //           resolve: (obj, args) => VeiculoDAO.buscarVeiculoPorId(args.id)
    //         }
    //       }
    //     })
    //   });
    // }
    static veiculoGraphQL() {
        // return graphqlExpress({
        //   schema: VeiculoController.schemaVeiculo(),
        //   pretty: false
        // });
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
    static atualizarVeiculo(req, res) {
        let veiculo = new model_1.Veiculo();
        veiculo.bodyParaModel(req.body);
        veiculo
            .validarVeiculo(false)
            .then((erros) => {
            if (erros.length > 0) {
                return res.status(400).json(new resposta_model_1.Resposta(null, erros));
            }
            client_factory_1.clientFactory
                .getClient()
                .then((client) => {
                index_1.VeiculoDAO.atualizarVeiculo(client, veiculo)
                    .then((veiculo) => {
                    client_factory_1.clientFactory.commit(client);
                    return veiculo;
                })
                    .then((veiculo) => res
                    .status(200)
                    .json(new resposta_model_1.Resposta(new model_1.Mensagem(`Veículo atualizado com sucesso.`, "info"), null, veiculo)))
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
    static excluirVeiculo(req, res) {
        let veiculo = new model_1.Veiculo();
        veiculo.$id = req.params["idVeiculo"];
        veiculo
            .validarExclusao()
            .then((erros) => {
            if (erros.length > 0) {
                return res.status(400).json(new resposta_model_1.Resposta(null, erros));
            }
            client_factory_1.clientFactory
                .getClient()
                .then((client) => {
                index_1.VeiculoDAO.deletarVeiculo(client, veiculo.$id)
                    .then(() => client_factory_1.clientFactory.commit(client))
                    .then(() => res
                    .status(204)
                    .json(new resposta_model_1.Resposta(new model_1.Mensagem(`Veículo excluído com sucesso.`, "info"))))
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