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

        ModeloDAO.buscarModeloPorId(req.params["modeloId"])
            .then((resultado: Modelo) => {
                res.status(resultado ? 200 : 204).json(resultado);
            }).catch((erro: Erro) => {
                res.status(500).json(erro);
            });
    }

    private getModelosPorMarca(req: Request, res: Response, next: NextFunction): void {
        ModeloDAO.buscarModelosPorMarca(req.params["marcaId"])
            .then((result: Modelo[]) => {
                res.status(result ? 200 : 204).json(result);
            }).catch((erro: Erro) => {
                res.status(500).json(erro);
            });
    }

    private init(): void {
        this.router.get("/:modeloId", this.getModeloPorId);
        this.router.get("/marca/:marcaId", this.getModelosPorMarca);
    }

}

export let modelo: Router = new ModeloRoute().getRouter();