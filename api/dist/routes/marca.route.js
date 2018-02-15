// import { Request, Response, NextFunction, Router } from "express";
// import { MarcaDAO } from "../dao/index";
// import { logger } from "../utils";
// import { Marca, Mensagem, Resposta } from "../model";
// class MarcaRoute {
//     private router: Router;
//     constructor() {
//         this.router = Router();
//         this.init();
//     }
//     public getRouter(): Router {
//         return this.router;
//     }
//     private getMarcasPorTipoDeVeiculo(req: Request, res: Response, next: NextFunction): void {
//         let tipoVeiculoId = req.query["tipoVeiculo"];
//         if (!tipoVeiculoId) {
//             res.status(400).json(new Resposta(new Mensagem("Este resource deve conter uma query string no seguinte formato: tipoVeiculo={id}", "erro")));
//         } else {
//             MarcaDAO.buscarMarcasPorTipoDeVeiculo(tipoVeiculoId)
//                 .then((resultado: Marca[]) => {
//                     res.json(new Resposta(null, null, resultado));
//                 }).catch((erro: Mensagem) => {
//                     res.status(500).json(new Resposta(erro));
//                 });
//         }
//     }
//     private getMarcaPorId(req: Request, res: Response, next: NextFunction): void {
//         MarcaDAO.buscaMarcaPorId(req.params["id"])
//             .then((resultado: Marca) => {
//                 res.json(new Resposta(null, null, resultado));
//             }).catch((erro: Mensagem) => {
//                 res.status(500).json(new Resposta(erro));
//             });
//     }
//     private init(): void {
//         this.router.get("/", this.getMarcasPorTipoDeVeiculo);
//         this.router.get("/:id", this.getMarcaPorId);
//     }
// }
// export let marca: Router = new MarcaRoute().getRouter();
//# sourceMappingURL=marca.route.js.map