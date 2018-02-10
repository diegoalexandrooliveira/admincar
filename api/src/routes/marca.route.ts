import { Request, Response, NextFunction, Router } from "express";
import { ConnectionFactory } from "../database/index";
import { logger } from "../utils";


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
        let connection = new ConnectionFactory().getConnection();
        connection.query("select id, descricao from marca order by id").then(result => {
            connection.end();
            res.json(result.rows);
        }).catch(error => {
            connection.end();
            logger.error(error);
            res.status(500).send("Ocorreu um problema ao tentar recuperar as marcas.");
        });

    }

    private init(): void {
        this.router.get("/", this.getMarcas);
    }

}

export let marca: Router = new MarcaRoute().getRouter();