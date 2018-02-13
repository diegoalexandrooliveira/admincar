import { Request, Response, NextFunction, Router } from "express";
import { TipoVeiculoDAO } from "../dao/index";
import { logger } from "../utils";
import { TipoVeiculo, Mensagem, Resposta } from "../model";


class MarcaRoute {

    private router: Router;


    constructor() {
        this.router = Router();
        this.init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private getTodosTipoDeVeiculo(req: Request, res: Response, next: NextFunction): void {
        TipoVeiculoDAO.buscaTodosTipoVeiculo()
            .then((resultado: TipoVeiculo[]) => {
                res.json(new Resposta(null, null, resultado));
            }).catch((erro: Mensagem) => {
                res.status(500).json(new Resposta(erro));
            });
    }

    private getTipoDeVeiculoPorId(req: Request, res: Response, next: NextFunction): void {
        let id = req.params["id"];
        TipoVeiculoDAO.buscaTipoVeiculoPorId(id)
            .then((resultado: TipoVeiculo) => {
                res.json(new Resposta(null, null, resultado));
            }).catch((erro: Mensagem) => {
                res.status(500).json(new Resposta(erro));
            });
    }
    private init(): void {
        this.router.get("/", this.getTodosTipoDeVeiculo);
        this.router.get("/:id", this.getTipoDeVeiculoPorId);
    }

}

export let tipoDeVeiculo: Router = new MarcaRoute().getRouter();