import { Request, Response, NextFunction, Router } from "express";
import { TipoVeiculoController, MarcaController, ModeloController } from "../controllers/index";


class TipoVeiculoRoute {

    private router: Router;


    constructor() {
        this.router = Router();
        this.init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private init(): void {
        this.router.get("/", TipoVeiculoController.buscarTodosTiposDeVeiculo);
        this.router.get("/:idTipoVeiculo", TipoVeiculoController.buscarTipoDeVeiculoPorId);
        this.router.get("/:idTipoVeiculo/marcas", MarcaController.buscarMarcasPorTipoDeVeiculo);
        this.router.get("/:idTipoVeiculo/marcas/:idMarca/modelos", ModeloController.buscarModelosPorTipoVeiculoEMarca);
    }

}

export let tipoDeVeiculo: Router = new TipoVeiculoRoute().getRouter();