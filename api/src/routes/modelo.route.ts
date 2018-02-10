import { Request, Response, NextFunction, Router } from "express";


class ModeloRoute {

    private router: Router;


    constructor() {
        this.router = Router();
        this.init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private getModelos(req: Request, res: Response, next: NextFunction) {
        console.log(req.params["marcaId"]);
        let retorno: Object[] = [{
            id: 1,
            nome: "Gol",
            marcaId: 1
        }];
        res.json(retorno);
    }

    private init(): void {
        this.router.get("/:marcaId", this.getModelos);
    }

}

export let modelo: Router = new ModeloRoute().getRouter();