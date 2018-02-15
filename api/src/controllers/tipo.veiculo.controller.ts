import { Request, Response, NextFunction, Router } from "express";
import { TipoVeiculoDAO } from "../dao/index";
import { logger } from "../utils";
import { TipoVeiculo, Mensagem, Resposta } from "../model";


export class TipoVeiculoController {
    public static buscarTodosTiposDeVeiculo(req: Request, res: Response, next: NextFunction): void {
        TipoVeiculoDAO.buscaTodosTipoVeiculo()
            .then((resultado: TipoVeiculo[]) => {
                res.json(new Resposta(null, null, resultado));
            }).catch((erro: Mensagem) => {
                res.status(500).json(new Resposta(erro));
            });
    }

    public static buscarTipoDeVeiculoPorId(req: Request, res: Response, next: NextFunction): void {
        let id = req.params["idTipoVeiculo"];
        TipoVeiculoDAO.buscaTipoVeiculoPorId(id)
            .then((resultado: TipoVeiculo) => {
                res.json(new Resposta(null, null, resultado));
            }).catch((erro: Mensagem) => {
                res.status(500).json(new Resposta(erro));
            });
    }
}