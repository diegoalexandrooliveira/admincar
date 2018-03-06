import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { configs } from "../config/configs";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { ChartComparativo } from "../models/chart.comparativo.model";

@Injectable()
export class DashboardService {
  constructor(private http: Http) {}

  public dadosComparativos(): Observable<ChartComparativo[]> {
    return this.http
      .post(
        configs.url + "/api/graphql",
        `{
      comparativo{
        mesDescAno
        adquiridos
        vendidos
      }
    }`,
        {
          headers: this.headers()
        }
      )
      .map((res: Response) => {
        let comparativos: ChartComparativo[] = [];
        let dados = res.json().data.comparativo;
        dados.forEach(element => {
          comparativos.push(
            new ChartComparativo(
              element.mesDescAno,
              element.adquiridos,
              element.vendidos
            )
          );
        });
        return comparativos;
      });
  }

  private headers(): Headers {
    let JWT = JSON.parse(localStorage.getItem("usuario")).token;
    let header: Headers = new Headers();
    header.append("Authorization", "Bearer ".concat(JWT));
    header.append("Content-Type", "application/graphql");
    return header;
  }
}
