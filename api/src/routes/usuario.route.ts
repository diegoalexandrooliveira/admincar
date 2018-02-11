import { Request, Response, NextFunction, Router } from "express";
import { UsuarioDAO } from "../dao/index";
import { logger } from "../utils";
import { Usuario, Mensagem } from "../model";
import { clientFactory } from "../database";
import { Client } from "pg";


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

        usuario.validarUsuario(true)
            .then((erros: Mensagem[]) => {
                if (erros.length > 0) {
                    res.status(400).json(erros);
                } else {
                    clientFactory.getClient()
                        .then((client: Client) => {
                            usuario.encodeSenha();
                            UsuarioDAO.inserirUsuario(client, usuario)
                                .then(() =>
                                    clientFactory.commit(client)
                                )
                                .then(() =>
                                    res.json({ "usuario": usuario.$usuario })
                                )
                                .catch(erro => {
                                    res.status(500).json(erro);
                                    clientFactory.rollback(client);
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

    private init(): void {
        this.router.post("/", this.inserirUsuario);
    }
}

export let usuario: Router = new UsuarioRoute().getRouter();