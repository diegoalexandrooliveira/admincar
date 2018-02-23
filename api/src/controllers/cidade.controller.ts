import { Request, Response, NextFunction, Router } from "express";
import { CidadeDAO } from "../dao/index";
import { logger } from "../utils";
import { Cidade, Mensagem, Resposta } from "../model";

export class CidadeController {
  public static buscarTodasCidadesPorEstado(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    let idEstado = req.params["idEstado"];
    CidadeDAO.buscaTodasCidadesPorEstado(idEstado)
      .then((resultado: Cidade[]) => {
        res.json(new Resposta(null, null, resultado));
      })
      .catch((erro: Mensagem) => {
        res.status(500).json(new Resposta(erro));
      });
  }

  public static bucarTodasCidades(): Promise<Cidade[]> {
    return CidadeDAO.buscaTodasCidades();
  }
}
