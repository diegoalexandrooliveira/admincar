"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const index_2 = require("../model/index");
const database_1 = require("../database");
const configs_1 = require("../config/configs");
const utils_1 = require("../utils");
const awsS3 = require("aws-sdk");
class AnexoVeiculoController {
    static getType() {
        return `type AnexoVeiculo { id: Int, tipoArquivo: Int, url: String, veiculoId: Int,
            principal: Boolean}
            input AnexoVeiculoInput { id: Int, tipoArquivo: Int, principal: Boolean}`;
    }
    static getQueries() {
        return `anexoPrincipal(veiculoId: Int): AnexoVeiculo
            anexos(veiculoId: Int): [AnexoVeiculo]`;
    }
    static getMutations() {
        return `atualizarAnexo(anexo: AnexoVeiculoInput): Int,
            excluirAnexo(id: Int): Int`;
    }
    static getQueryResolvers() {
        return {
            anexoPrincipal: (root, args) => {
                return index_1.AnexoVeiculoDAO.buscaAnexoPrincipalPorVeiculo(args.veiculoId).then((anexo) => {
                    if (!anexo || !anexo.$url) {
                        return new index_2.AnexoVeiculo(-1, 0, "/public/images/veiculoSemImagem.jpg", true, args.veiculoId);
                    }
                    else {
                        return anexo;
                    }
                });
            },
            anexos: (root, args) => {
                return index_1.AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(args.veiculoId);
            }
        };
    }
    static getMutationsResolvers() {
        return {
            atualizarAnexo: this.atualizarAnexo,
            excluirAnexo: this.deletarAnexo.bind(this)
        };
    }
    static atualizarAnexo(root, args) {
        return new Promise((resolve, reject) => {
            let client = null;
            let anexo = new index_2.AnexoVeiculo(args.anexo.id, args.anexo.tipoArquivo, null, args.anexo.principal);
            database_1.clientFactory
                .getClient()
                .then((result) => {
                client = result;
                return index_1.AnexoVeiculoDAO.atualizarAnexo(client, anexo);
            })
                .then(retorno => {
                database_1.clientFactory.commit(client);
                resolve(retorno);
            })
                .catch(erro => {
                if (client) {
                    database_1.clientFactory.rollback(client);
                }
                reject(erro);
            });
        });
    }
    static deletarAnexo(root, args) {
        let client = null;
        return new Promise((resolve, reject) => {
            this.deletarImagemCloudinary(args.id)
                .then(() => database_1.clientFactory.getClient())
                .then((result) => {
                client = result;
                return index_1.AnexoVeiculoDAO.excluirAnexoVeiculo(client, args.id);
            })
                .then((rows) => {
                database_1.clientFactory.commit(client);
                resolve(rows);
            })
                .catch(erro => {
                if (client) {
                    database_1.clientFactory.rollback(client);
                }
                utils_1.logger.error(`anexo-veiculo.controller.deletarAnexo - ${erro}`);
                reject(erro);
            });
        });
    }
    static deletarImagemCloudinary(idAnexo) {
        return index_1.AnexoVeiculoDAO.buscaAnexoPorId(idAnexo).then((anexo) => {
            // let idCloudinary = anexo.$url.substring(
            //   anexo.$url.lastIndexOf("/") + 1,
            //   anexo.$url.lastIndexOf(".j")
            // );
            let objectKey = anexo.$url.substring(anexo.$url.lastIndexOf("/") + 1, anexo.$url.length);
            let s3 = new awsS3.S3();
            return s3
                .deleteObject({
                Bucket: configs_1.configs.S3Bucket.bucketName,
                Key: objectKey
            })
                .promise();
            // cloudinary.config({
            //   cloud_name: configs.Cloudinary.cloudName,
            //   api_key: configs.Cloudinary.apiKey,
            //   api_secret: configs.Cloudinary.apiSecret
            // });
            // return cloudinary.v2.uploader.destroy(idCloudinary);
        });
    }
    static getResolvers() {
        return {};
    }
}
exports.AnexoVeiculoController = AnexoVeiculoController;
//# sourceMappingURL=anexo-veiculo.controller.js.map