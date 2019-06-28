"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const index_2 = require("../model/index");
const database_1 = require("../database");
const configs_1 = require("../config/configs");
const utils_1 = require("../utils");
const storage_1 = require("@google-cloud/storage");
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
                return this.getAnexoPrincipal(args.veiculoId);
            },
            anexos: (root, args) => {
                return index_1.AnexoVeiculoDAO.buscarTodosAnexosPorVeiculo(args.veiculoId);
            }
        };
    }
    static getAnexoPrincipal(idVeiculo) {
        return index_1.AnexoVeiculoDAO.buscaAnexoPrincipalPorVeiculo(idVeiculo).then((anexo) => {
            // if (!anexo || !anexo.$url) {
            //   return new AnexoVeiculo(
            //     -1,
            //     0,
            //     "/public/images/veiculoSemImagem.jpg",
            //     true,
            //     idVeiculo
            //   );
            // } else {
            //   return anexo;
            // }
            return anexo;
        });
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
            this.deleteImageFromStorage(args.id)
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
    static deleteImageFromStorage(idAnexo) {
        return index_1.AnexoVeiculoDAO.buscaAnexoPorId(idAnexo).then((anexo) => {
            let objectKey = anexo.$object_key;
            let gcs = new storage_1.Storage();
            return gcs.bucket(configs_1.configs.GCS.bucketId).file(objectKey).delete();
        });
    }
    static getResolvers() {
        return {};
    }
}
exports.AnexoVeiculoController = AnexoVeiculoController;
//# sourceMappingURL=anexo-veiculo.controller.js.map