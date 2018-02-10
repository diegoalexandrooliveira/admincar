import { Request, Response, NextFunction, Router } from "express";
import { ModeloDAO } from "../dao/index";
import { logger } from "../utils";
import { Modelo, Erro } from "../model";


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
                res.status(resultado ? 200 : 204).json(resultado);
            }).catch((erro: Erro) => {
                res.status(500).json(erro);
            });
    }

    private getModelosPorMarca(req: Request, res: Response, next: NextFunction): void {
        let marca: number = req.query["marca"];
        if (!marca) {
            res.status(400).json(new Erro("Este resource deve conter uma query string no seguinte formato: marca={id}"));
        } else {
            ModeloDAO.buscarModelosPorMarca(marca)
                .then((result: Modelo[]) => {
                    res.status(result ? 200 : 204).json(result);
                }).catch((erro: Erro) => {
                    res.status(500).json(erro);
                });
        }
    }

    private init(): void {
        this.router.get("/:id", this.getModeloPorId);
        this.router.get("/", this.getModelosPorMarca);
    }

}

export let modelo: Router = new ModeloRoute().getRouter();