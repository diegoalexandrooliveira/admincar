"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dao/index");
const index_2 = require("../model/index");
const database_1 = require("../database");
class UsuarioController {
    static getType() {
        return `type Usuario { usuario: String, senha: String }
            input UsuarioInput { usuario: String, senha: String }`;
    }
    static getQueries() {
        return `usuarios: [Usuario]
            usuario(usuario: String): Usuario`;
    }
    static getMutations() {
        return `inserirUsuario(usuario: UsuarioInput): Usuario
    alterarUsuario(usuario: UsuarioInput): Usuario
    excluirUsuario(usuario: String): Boolean`;
    }
    static getQueryResolvers() {
        return {
            usuarios: () => index_1.UsuarioDAO.buscaTodosUsuarios(),
            usuario: (root, args) => index_1.UsuarioDAO.buscaUsuario(args.usuario)
        };
    }
    static getMutationsResolvers() {
        return {
            inserirUsuario: this.inserirUsuario,
            alterarUsuario: this.alterarUsuario,
            excluirUsuario: this.excluirUsuario
        };
    }
    static getResolvers() {
        return {};
    }
    static inserirUsuario(root, args) {
        return new Promise((resolve, reject) => {
            let usuario = new index_2.Usuario();
            if (args.usuario) {
                if (args.usuario.usuario) {
                    usuario.$usuario = args.usuario.usuario;
                }
                if (args.usuario.senha) {
                    usuario.$senha = args.usuario.senha;
                }
            }
            usuario.validaUsuario(true).then((erros) => {
                if (erros.length > 0) {
                    reject(JSON.stringify(erros));
                }
                else {
                    database_1.clientFactory.getClient().then((client) => {
                        usuario.codificaSenha();
                        index_1.UsuarioDAO.inserirUsuario(client, usuario)
                            .then(valor => database_1.clientFactory.commit(client))
                            .then(() => resolve(usuario))
                            .catch(erro => reject(erro));
                    });
                }
            });
        });
    }
    static alterarUsuario(root, args) {
        return new Promise((resolve, reject) => {
            let usuario = new index_2.Usuario();
            if (args.usuario) {
                if (args.usuario.usuario) {
                    usuario.$usuario = args.usuario.usuario;
                }
                if (args.usuario.senha) {
                    usuario.$senha = args.usuario.senha;
                }
            }
            usuario.validaUsuario(false).then((erros) => {
                if (erros.length > 0) {
                    reject(JSON.stringify(erros));
                }
                else {
                    database_1.clientFactory.getClient().then((client) => {
                        usuario.codificaSenha();
                        index_1.UsuarioDAO.alterarUsuario(client, usuario)
                            .then(rows => {
                            database_1.clientFactory.commit(client);
                            return rows;
                        })
                            .then(rows => {
                            if (rows) {
                                resolve(usuario);
                            }
                            else {
                                reject(JSON.stringify(Array.of(new index_2.Mensagem("Nenhum usuário atualizado.", "warn"))));
                            }
                        })
                            .catch(erro => reject(erro));
                    });
                }
            });
        });
    }
    static excluirUsuario(root, args) {
        return new Promise((resolve, reject) => {
            if (args.usuario === "admin") {
                return reject(JSON.stringify(Array.of(new index_2.Mensagem("Não é possível excluir o usuário admin.", "erro"))));
            }
            database_1.clientFactory.getClient().then((client) => {
                index_1.UsuarioDAO.excluirUsuario(client, args.usuario)
                    .then(rows => {
                    database_1.clientFactory.commit(client);
                    return rows;
                })
                    .then(rows => {
                    if (rows) {
                        return resolve(true);
                    }
                    else {
                        return reject(JSON.stringify(Array.of(new index_2.Mensagem("Nenhum usuário removido.", "warn"))));
                    }
                })
                    .catch(erro => reject(erro));
            });
        });
    }
}
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map