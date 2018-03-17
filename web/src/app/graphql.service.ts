import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { LoginService } from "./login.service";
import { configs } from "./config/configs";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Resposta } from "./models/resposta.model";

@Injectable()
export class GraphqlService {
  private url: string;
  constructor(private loginService: LoginService, private http: Http) {
    this.url = configs.url + "/api/graphql";
  }

  private headers(): Headers {
    let JWT: string = this.loginService.pegarToken();
    let header: Headers = new Headers();
    header.append("Authorization", "Bearer ".concat(JWT));
    header.append("Content-Type", "application/graphql");
    return header;
  }

  public request(payload: string): Observable<Resposta> {
    return this.http
      .post(this.url, payload, {
        headers: this.headers()
      })
      .map((res: Response) => new Resposta(res.json().data, res.json().errors));
  }
}
