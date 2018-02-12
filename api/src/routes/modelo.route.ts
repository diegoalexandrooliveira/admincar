import { Request, Response, NextFunction, Router } from "express";
import { ModeloDAO } from "../dao/index";
import { logger } from "../utils";
import { Modelo, Mensagem, Resposta } from "../model";


class ModeloRoute {

    private router: Router;


    constructor() {
        this.router = Router();
        this.init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private getModeloPorId(req: Request, res: Response, next: NextFunction): void {
        ModeloDAO.buscarModeloPorId(req.params["id"])
            .then((resultado: Modelo) => {
                res.json(new Resposta(null, null, resultado));
            }).catch((erro: Mensagem) => {
                res.status(500).json(new Resposta(erro));
            });
    }

    private getModelosPorMarca(req: Request, res: Response, next: NextFunction): void {
        let marca: number = req.query["marca"];
        if (!marca) {
            res.status(400).json(new Resposta(new Mensagem("Este resource deve conter uma query string no seguinte formato: marca={id}", "erro")));
        } else {
            ModeloDAO.buscarModelosPorMarca(marca)
                .then((result: Modelo[]) => {
                    res.json(new Resposta(null, null, result));
                }).catch((erro: Mensagem) => {
                    res.status(500).json(new Resposta(erro));
                });
        }
    }

    private init(): void {
        this.router.get("/:id", this.getModeloPorId);
        this.router.get("/", this.getModelosPorMarca);
    }

}

export let modelo: Router = new ModeloRoute().getRouter();