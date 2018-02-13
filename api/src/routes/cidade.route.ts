import { Request, Response, NextFunction, Router } from "express";
import { CidadeDAO } from "../dao/index";
import { logger } from "../utils";
import { Cidade, Mensagem, Resposta } from "../model";


class CidadeRoute {

    private router: Router;


    constructor() {
        this.router = Router();
        this.init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private getTodasCidadesPorEstado(req: Request, res: Response, next: NextFunction): void {
        let estado: number = req.query["estado"];
        if (!estado) {
            res.status(400).json(new Resposta(new Mensagem("Este resource deve conter uma query string no seguinte formato: estado={id}", "erro")));
        } else {
            CidadeDAO.buscaTodasCidadesPorEstado(estado)
                .then((result: Cidade[]) => {
                    res.json(new Resposta(null, null, result));
                }).catch((erro: Mensagem) => {
                    res.status(500).json(new Resposta(erro));
                });
        }
    }

    private getCidadePorId(req: Request, res: Response, next: NextFunction): void {
        let id = req.params["id"];
        CidadeDAO.buscaCidadePorId(id)
            .then((resultado: Cidade) => {
                res.json(new Resposta(null, null, resultado));
            })
            .catch((erro: Mensagem) => {
                res.status(500).json(new Resposta(erro));
            });
    }

    private init(): void {
        this.router.get("/", this.getTodasCidadesPorEstado);
        this.router.get("/:id", this.getCidadePorId);
    }

}

export let cidade: Router = new CidadeRoute().getRouter();