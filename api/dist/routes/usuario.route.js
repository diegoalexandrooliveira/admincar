"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../dao/index");
const model_1 = require("../model");
const database_1 = require("../database");
const moment = require("moment");
const jwt = require("jwt-simple");
const configs_1 = require("../config/configs");
class UsuarioRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    inserirUsuario(req, res, next) {
        let usuario = new model_1.Usuario(req.body.usuario, req.body.senha);
        usuario.validaUsuario(true)
            .then((erros) => {
            if (erros.length > 0) {
                res.status(400).json(new model_1.Resposta(null, erros));
            }
            else {
                database_1.clientFactory.getClient()
                    .then((client) => {
                    usuario.codificaSenha();
                    index_1.UsuarioDAO.inserirUsuario(client, usuario)
                        .then(() => database_1.clientFactory.commit(client))
                        .then(() => res.json(new model_1.Resposta(new model_1.Mensagem(`Usuário ${usuario.$usuario} incluído com sucesso.`, "info"), null, { "usuario": usuario.$usuario })))
                        .catch((erro) => {
                        res.status(500).json(new model_1.Resposta(erro));
                        database_1.clientFactory.rollback(client);
                    });
                })
                    .catch((erro) => {
                    res.status(500).json(new model_1.Resposta(erro));
                });
            }
        })
            .catch(error => {
            res.status(500).json(new model_1.Resposta(error));
        });
    }
    autenticarUsuario(req, res, next) {
        let usuario = new model_1.Usuario(req.body.usuario, req.body.senha);
        usuario.validaUsuario(false)
            .then((erros) => {
            if (erros.length > 0) {
                res.status(401).json(new model_1.Resposta(null, erros));
            }
            else {
                index_1.UsuarioDAO.buscaUsuario(usuario.$usuario)
                    .then((usuarioEncontrado) => {
                    let respostaUsuarioSenha = new model_1.Resposta(new model_1.Mensagem("Usuário e/ou senha inválidos.", "erro"));
                    if (!usuarioEncontrado.$usuario) {
                        res.status(401).json(respostaUsuarioSenha);
                        return;
                    }
                    if (!usuarioEncontrado.senhaIgual(usuario.$senha)) {
                        res.status(401).json(respostaUsuarioSenha);
                        return;
                    }
                    let usuarioJWT = {
                        "usuario": usuario.$usuario,
                        "expires": moment().add(1, "minutes").valueOf()
                    };
                    let token = jwt.encode(usuarioJWT, configs_1.configs.JWT.secret);
                    res.json(new model_1.Resposta(new model_1.Mensagem(`Usuário ${usuario.$usuario} autenticado com sucesso.`, "info"), null, { "JWT": token }));
                })
                    .catch((erro) => {
                    res.status(500).json(new model_1.Resposta(erro));
                });
            }
        })
            .catch(error => {
            res.status(500).json(new model_1.Resposta(error));
        });
    }
    init() {
        this.router.post("/", this.inserirUsuario);
        this.router.post("/autenticar", this.autenticarUsuario);
    }
}
exports.usuario = new UsuarioRoute().getRouter();
//# sourceMappingURL=usuario.route.js.map