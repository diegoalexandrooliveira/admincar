import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { LoginService } from "./login.service";
import { configs } from "./config/configs";
import { Observable } from "rxjs/Observable";
import { Resposta } from "./models/resposta.model";

@Injectable()
export class HttpService {
  private url: string;
  constructor(private loginService: LoginService, private http: Http) {
    this.url = configs.url + "/api/";
  }

  private headers(): Headers {
    let JWT: string = this.loginService.pegarToken();
    let header: Headers = new Headers();
    header.append("Authorization", "Bearer ".concat(JWT));
    return header;
  }

  public postMultiPart(service: string, body: FormData): Observable<Resposta> {
    let url = this.url + service;
    return this.http
      .post(url, body, {
        headers: this.headers()
      })
      .map(
        (res: Response) =>
          new Resposta(Array.of(res.json().data), Array.of(res.json().erro))
      );
  }
}
