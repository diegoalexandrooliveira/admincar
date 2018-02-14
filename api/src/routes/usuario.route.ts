import { Request, Response, NextFunction, Router } from "express";
import { UsuarioDAO } from "../dao/index";
import { logger } from "../utils";
import { Usuario, Mensagem, Resposta } from "../model";
import { clientFactory } from "../database";
import { Client } from "pg";
import * as moment from "moment";
import * as jwt from "jwt-simple";


class UsuarioRoute {

    private router: Router;


    constructor() {
        this.router = Router();
        this.init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private inserirUsuario(req: Request, res: Response, next: NextFunction): void {
        let usuario = new Usuario(req.body.usuario, req.body.senha);

        usuario.validaUsuario(true)
            .then((erros: Mensagem[]) => {
                if (erros.length > 0) {
                    res.status(400).json(new Resposta(null, erros));
                } else {
                    clientFactory.getClient()
                        .then((client: Client) => {
                            usuario.codificaSenha();
                            UsuarioDAO.inserirUsuario(client, usuario)
                                .then(() =>
                                    clientFactory.commit(client)
                                )
                                .then(() =>
                                    res.status(201).json(new Resposta(new Mensagem(`Usuário ${usuario.$usuario} incluído com sucesso.`, "info"), null, { "usuario": usuario.$usuario }))
                                )
                                .catch((erro: Mensagem) => {
                                    res.status(500).json(new Resposta(erro));
                                    clientFactory.rollback(client);
                                });
                        })
                        .catch((erro: Mensagem) => {
                            res.status(500).json(new Resposta(erro));
                        });
                }
            })
            .catch(error => {
                res.status(500).json(new Resposta(error));
            });
    }


    private init(): void {
        this.router.post("/", this.inserirUsuario);
    }
}

export let usuario: Router = new UsuarioRoute().getRouter();