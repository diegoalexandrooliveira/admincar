import { Request, Response, NextFunction, Router } from "express";
import { ModeloDAO } from "../dao/index";
import { logger } from "../utils";
import { Modelo, Mensagem, Resposta } from "../model";


export class ModeloController {

    public static buscarModelosPorTipoVeiculoEMarca(req: Request, res: Response, next: NextFunction): void {
        let idTipoVeiculo = req.params["idTipoVeiculo"];
        let idMarca: number = req.params["idMarca"];
        ModeloDAO.buscarModelosPorTipoVeiculoEMarca(idTipoVeiculo, idMarca)
            .then((result: Modelo[]) => {
                res.json(new Resposta(null, null, result));
            }).catch((erro: Mensagem) => {
                res.status(500).json(new Resposta(erro));
            });
    }
}