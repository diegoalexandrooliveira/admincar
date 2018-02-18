import { Request, Response, NextFunction, Router } from "express";
import { EstadoDAO } from "../dao/index";
import { logger } from "../utils";
import { Estado, Mensagem, Resposta } from "../model";

export class EstadoController {
  public static buscarTodosEstados(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    EstadoDAO.buscaTodosEstados()
      .then((resultado: Estado[]) => {
        res.json(new Resposta(null, null, resultado));
      })
      .catch((erro: Mensagem) => {
        res.status(500).json(new Resposta(erro));
      });
  }
}
