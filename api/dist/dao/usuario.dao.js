"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../model/index");
const index_2 = require("../database/index");
const utils_1 = require("../utils");
class UsuarioDAO {
    static buscaUsuario(usuario) {
        let query = `select usuario, senha from usuario where usuario = $1`;
        return new Promise((resolve, reject) => {
            index_2.clientFactory
                .query(query, [usuario])
                .then((result) => {
                let user = new index_1.Usuario();
                if (result.rowCount > 0) {
                    user.$usuario = result.rows[0].usuario;
                    user.$senha = result.rows[0].senha;
                }
                resolve(user);
            })
                .catch(error => {
                utils_1.logger.error(`usuario.dao.buscaUsuario - ${error}`);
                reject(`Erro ao tentar recuperar o usuário ${usuario}`);
            });
        });
    }
    static buscaTodosUsuarios() {
        let query = `select usuario, senha from usuario order by usuario`;
        return new Promise((resolve, reject) => {
            index_2.clientFactory
                .query(query, [])
                .then((result) => {
                let usuarios;
                if (result.rowCount > 0) {
                    usuarios = result.rows.map(usuario => new index_1.Usuario(usuario.usuario, usuario.senha));
                }
                resolve(usuarios);
            })
                .catch(error => {
                utils_1.logger.error(`usuario.dao.buscaTodosUsuarios - ${error}`);
                reject(`Erro ao tentar recuperar os usuários`);
            });
        });
    }
    static inserirUsuario(client, usuario) {
        let insert = `insert into usuario (usuario, senha) values ($1, $2)`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(insert, [usuario.$usuario, usuario.$senha]))
                .then((result) => {
                resolve(result.rowCount);
            })
                .catch(error => {
                utils_1.logger.error(`usuario.dao.inserirUsuario - ${error}`);
                reject(`Erro ao inserir o usuário ${usuario.$usuario}`);
            });
        });
    }
    static alterarUsuario(client, usuario) {
        let update = `update usuario set senha = $1 where usuario = $2`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(update, [usuario.$senha, usuario.$usuario]))
                .then((result) => {
                resolve(result.rowCount);
            })
                .catch(error => {
                utils_1.logger.error(`usuario.dao.alterarUsuario - ${error}`);
                reject(`Erro ao atualizar o usuário ${usuario.$usuario}`);
            });
        });
    }
    static excluirUsuario(client, usuario) {
        let sqlDelete = `delete from usuario where usuario = $1`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(sqlDelete, [usuario]))
                .then((result) => {
                resolve(result.rowCount);
            })
                .catch(error => {
                utils_1.logger.error(`usuario.dao.excluirUsuario - ${error}`);
                reject(`Erro ao excluir o usuário ${usuario}`);
            });
        });
    }
}
exports.UsuarioDAO = UsuarioDAO;
//# sourceMappingURL=usuario.dao.js.map