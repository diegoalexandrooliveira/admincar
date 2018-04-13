import { Injectable } from "@angular/core";
import { Headers, Response, Http } from "@angular/http";
import { LoginService } from "./login.service";
import { configs } from "./config/configs";
import { Observable } from "rxjs/Observable";
import { Resposta } from "./models/resposta.model";
import { ProgressHttp } from "angular-progress-http";

@Injectable()
export class HttpService {
  private url: string;
  constructor(private loginService: LoginService, private http: ProgressHttp) {
    this.url = configs.url + "/api/";
  }

  private headers(): Headers {
    let JWT: string = this.loginService.pegarToken();
    let header: Headers = new Headers();
    header.append("Authorization", "Bearer ".concat(JWT));
    return header;
  }

  public postMultiPart(
    service: string,
    body: FormData,
    callBackProgress: Function
  ): Observable<Resposta> {
    let url = this.url + service;
    return this.http
      .withUploadProgressListener(progress => {
        callBackProgress(progress);
      })
      .post(url, body, {
        headers: this.headers()
      })
      .map(
        (res: Response) =>
          new Resposta(Array.of(res.json().data), Array.of(res.json().erro))
      );
  }
}
