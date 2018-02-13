import { Request, Response, NextFunction, Router } from "express";
import { EstadoDAO } from "../dao/index";
import { logger } from "../utils";
import { Estado, Mensagem, Resposta } from "../model";


class EstadoRoute {

    private router: Router;


    constructor() {
        this.router = Router();
        this.init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private getTodosEstados(req: Request, res: Response, next: NextFunction): void {
        EstadoDAO.buscaTodosEstados()
            .then((resultado: Estado[]) => {
                res.json(new Resposta(null, null, resultado));
            }).catch((erro: Mensagem) => {
                res.status(500).json(new Resposta(erro));
            });
    }

    private getEstadoPorId(req: Request, res: Response, next: NextFunction): void {
        let idEstado = req.params["id"];
        EstadoDAO.buscaEstadoPorId(idEstado)
            .then((resultado: Estado) => {
                res.json(new Resposta(null, null, resultado));
            })
            .catch((erro: Mensagem) => {
                res.status(500).json(new Resposta(erro));
            });
    }

    private init(): void {
        this.router.get("/", this.getTodosEstados);
        this.router.get("/:id", this.getEstadoPorId);
    }

}

export let estado: Router = new EstadoRoute().getRouter();