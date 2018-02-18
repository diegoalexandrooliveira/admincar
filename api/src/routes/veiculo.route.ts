import { Router } from "express";
import { VeiculoController } from "../controllers/index";

class VeiculoRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public getRouter(): Router {
    return this.router;
  }

  private init(): void {
    this.router.get("/", VeiculoController.veiculoGraphQL());
  }
}

export let veiculo: Router = new VeiculoRoute().getRouter();
