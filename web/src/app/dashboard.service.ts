import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ChartComparativo } from "./models/chart.comparativo.model";
import { GraphqlService } from "./graphql.service";
import { Resposta } from "./models/resposta.model";

@Injectable()
export class DashboardService {
  constructor(private graphql: GraphqlService) {}

  public dadosComparativos(): Observable<ChartComparativo[]> {
    return this.graphql
      .request(
        `{
      comparativo{
        mesDescAno
        adquiridos
        vendidos
      }
    }`
      )
      .map((resposta: Resposta) => {
        let dados = resposta.dados["comparativo"];
        if (dados) {
          return dados.map(
            element =>
              new ChartComparativo(
                element.mesDescAno,
                element.adquiridos,
                element.vendidos
              )
          );
        } else {
          return Array.of(new ChartComparativo());
        }
      });
  }
}
