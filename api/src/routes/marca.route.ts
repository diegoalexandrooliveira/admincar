import { Request, Response, NextFunction, Router } from "express";
import { MarcaDAO } from "../dao/index";
import { logger } from "../utils";
import { Marca, Mensagem } from "../model";


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
        let tipoVeiculoId = req.query["tipoVeiculo"];
        if (!tipoVeiculoId) {
            res.status(400).json(new Mensagem("Este resource deve conter uma query string no seguinte formato: tipoVeiculo={id}", "erro"));
        } else {
            MarcaDAO.buscarMarcasPorTipoDeVeiculo(tipoVeiculoId)
                .then((resultado: Marca[]) => {
                    res.status(resultado ? 200 : 204).json(resultado);
                }).catch((erro: Mensagem) => {
                    res.status(500).json(erro);
                });
        }
    }

    private getMarcaPorId(req: Request, res: Response, next: NextFunction): void {
        MarcaDAO.buscaMarcaPorId(req.params["id"])
            .then((resultado: Marca) => {
                res.status(resultado ? 200 : 204).json(resultado);
            }).catch((erro: Mensagem) => {
                res.status(500).json(erro);
            });
    }

    private init(): void {
        this.router.get("/", this.getMarcasPorTipoDeVeiculo);
        // this.router.get("/tipoVeiculo/:tipoVeiculoId", this.getMarcasPorTipoDeVeiculo);
        this.router.get("/:id", this.getMarcaPorId);
    }

}

export let marca: Router = new MarcaRoute().getRouter();