import { Router } from "express";
import { EstadoController, CidadeController } from "../controllers/index";

class EstadoRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public getRouter(): Router {
    return this.router;
  }

  private init(): void {
    this.router.get("/", EstadoController.buscarTodosEstados);
    this.router.get(
      "/:idEstado/cidades",
      CidadeController.buscarTodasCidadesPorEstado
    );
  }
}

export let estado: Router = new EstadoRoute().getRouter();
