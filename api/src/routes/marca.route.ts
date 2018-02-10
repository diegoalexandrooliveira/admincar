import { Request, Response, NextFunction, Router } from "express";
import { MarcaDAO } from "../dao/index";
import { logger } from "../utils";
import { Marca, Erro } from "../model";


class MarcaRoute {

    private router: Router;


    constructor() {
        this.router = Router();
        this.init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private getMarcasPorTipoDeVeiculo(req: Request, res: Response, next: NextFunction): void {

        MarcaDAO.buscarMarcasPorTipoDeVeiculo(req.params["tipoVeiculoId"])
            .then((resultado: Marca[]) => {
                res.status(resultado ? 200 : 204).json(resultado);
            }).catch((erro: Erro) => {
                res.status(500).json(erro);
            });
    }

    private getMarcaPorId(req: Request, res: Response, next: NextFunction): void {
        MarcaDAO.buscaMarcaPorId(req.params["marcaId"])
            .then((resultado: Marca) => {
                res.status(resultado ? 200 : 204).json(resultado);
            }).catch((erro: Erro) => {
                res.status(500).json(erro);
            });
    }

    private init(): void {
        this.router.get("/tipoVeiculo/:tipoVeiculoId", this.getMarcasPorTipoDeVeiculo);
        this.router.get("/:marcaId", this.getMarcaPorId);
    }

}

export let marca: Router = new MarcaRoute().getRouter();