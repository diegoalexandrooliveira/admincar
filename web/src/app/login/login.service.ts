import { Injectable } from "@angular/core";

import { Http, Response } from "@angular/http";
import { Usuario } from "../models/usuario.model";
import { Observable } from "rxjs";
import { Mensagem } from "../models/mensagem.model";

@Injectable()
export class LoginService {
  constructor(private http: Http) {}

  public autenticar(usuario: Usuario): Observable<void> {
    let payload = { usuario: usuario.nome, senha: usuario.senha };
    return this.http
      .post("http://192.168.0.114:8080/api/v1/public/autenticar", payload)
      .map((res: Response) => localStorage.setItem("jwt", res.json().data.JWT))
      .catch(erro => {
        let erros = JSON.parse(erro._body).mensagens;
        let mensagens: Mensagem[] = [];
        erros.forEach(element => {
          mensagens.push(new Mensagem(element.message, element.level));
        });
        return Observable.throw(mensagens);
      });
  }
}
