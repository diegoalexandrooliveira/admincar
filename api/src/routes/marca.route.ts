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

    private getMarcas(req: Request, res: Response, next: NextFunction) {

        MarcaDAO.buscarMarcas(req.params["tipoVeiculoId"])
            .then((resultado: Marca[]) => {
                res.json(resultado);
            }).catch((erro: Erro) => {
                res.status(500).json(erro);
            });
    }

    private init(): void {
        this.router.get("/:tipoVeiculoId", this.getMarcas);
    }

}

export let marca: Router = new MarcaRoute().getRouter();