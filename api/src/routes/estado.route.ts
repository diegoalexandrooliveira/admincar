import { Router } from "express";
import { EstadoController, CidadeController } from "../controllers/index";
import { graphqlExpress } from "apollo-server-express";
import { schema } from "../graphql/index";

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
    this.router.post("/", graphqlExpress({ schema }));
  }
}

export let estado: Router = new EstadoRoute().getRouter();
