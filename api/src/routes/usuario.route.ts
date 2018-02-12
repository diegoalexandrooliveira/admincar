import { Request, Response, NextFunction, Router } from "express";
import { UsuarioDAO } from "../dao/index";
import { logger } from "../utils";
import { Usuario, Mensagem, Resposta } from "../model";
import { clientFactory } from "../database";
import { Client } from "pg";
import * as moment from "moment";
import * as jwt from "jwt-simple";
import { configs } from "../config/configs";


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
                                    res.json(new Resposta(new Mensagem(`Usuário ${usuario.$usuario} incluído com sucesso.`, "info"), null, { "usuario": usuario.$usuario }))
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

    private autenticarUsuario(req: Request, res: Response, next: NextFunction): void {
        let usuario = new Usuario(req.body.usuario, req.body.senha);
        usuario.validaUsuario(false)
            .then((erros: Mensagem[]) => {
                if (erros.length > 0) {
                    res.status(401).json(new Resposta(null, erros));
                } else {
                    UsuarioDAO.buscaUsuario(usuario.$usuario)
                        .then((usuarioEncontrado: Usuario) => {
                            let respostaUsuarioSenha = new Resposta(new Mensagem("Usuário e/ou senha inválidos.", "erro"));
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
                            let token = jwt.encode(usuarioJWT, configs.JWT.secret);

                            res.json(new Resposta(new Mensagem(`Usuário ${usuario.$usuario} autenticado com sucesso.`, "info"), null, { "JWT": token }));

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
        this.router.post("/autenticar", this.autenticarUsuario);
    }
}

export let usuario: Router = new UsuarioRoute().getRouter();