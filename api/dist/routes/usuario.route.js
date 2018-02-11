"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../dao/index");
const model_1 = require("../model");
const database_1 = require("../database");
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
        usuario.validarUsuario(true)
            .then((erros) => {
            if (erros.length > 0) {
                res.status(400).json(erros);
            }
            else {
                database_1.clientFactory.getClient()
                    .then((client) => {
                    usuario.encodeSenha();
                    index_1.UsuarioDAO.inserirUsuario(client, usuario)
                        .then(() => database_1.clientFactory.commit(client))
                        .then(() => res.json({ "usuario": usuario.$usuario }))
                        .catch(erro => {
                        res.status(500).json(erro);
                        database_1.clientFactory.rollback(client);
                    });
                })
                    .catch(erro => {
                    res.status(500).json(erro);
                });
            }
        })
            .catch(error => {
            res.status(500).json(error);
        });
    }
    init() {
        this.router.post("/", this.inserirUsuario);
    }
}
exports.usuario = new UsuarioRoute().getRouter();
//# sourceMappingURL=usuario.route.js.map