import { Request, Response, NextFunction, Router } from "express";
import { MarcaDAO } from "../dao/index";
import { logger } from "../utils";
import { Marca, Mensagem, Resposta } from "../model";


export class MarcaController {

    public static buscarMarcasPorTipoDeVeiculo(req: Request, res: Response, next: NextFunction): void {
        let idTipoVeiculo = req.params["idTipoVeiculo"];
        MarcaDAO.buscarMarcasPorTipoDeVeiculo(idTipoVeiculo)
            .then((resultado: Marca[]) => {
                res.json(new Resposta(null, null, resultado));
            }).catch((erro: Mensagem) => {
                res.status(500).json(new Resposta(erro));
            });
    }
}