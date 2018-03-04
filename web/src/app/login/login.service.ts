import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Usuario } from "../models/usuario.model";
import { Observable } from "rxjs/Observable";
import { Mensagem } from "../models/mensagem.model";
import { configs } from "../config/configs";

@Injectable()
export class LoginService {
  constructor(private http: Http) {}

  public autenticar(usuario: Usuario): Observable<void> {
    let payload = { usuario: usuario.nome, senha: usuario.senha };
    return this.http
      .post(configs.url + "/api/v1/public/autenticar", payload)
      .map((res: Response) =>
        localStorage.setItem(
          "usuario",
          JSON.stringify({ usuario: usuario.nome, token: res.json().data.JWT })
        )
      )
      .catch(erro => {
        let mensagens: Mensagem[] = [];
        if (!erro.status) {
          mensagens.push(
            new Mensagem("Problema ao comunicar-se com o servidor.", "erro")
          );
        } else {
          let erros = JSON.parse(erro._body).mensagens;
          erros.forEach(element => {
            mensagens.push(new Mensagem(element.message, element.level));
          });
        }
        return Observable.throw(mensagens);
      });
  }

  public estaAutenticado(): Observable<boolean> {
    let jwt = JSON.parse(localStorage.getItem("usuario"));
    if (!jwt) {
      return Observable.of(false);
    } else {
      let header = new Headers();
      header.append("Authorization", "Bearer ".concat(jwt.token));
      return this.http
        .get(configs.url + "/api/autenticacao", { headers: header })
        .map((res: Response) => res.status == 200)
        .catch(erro => {
          console.log(erro);
          return Observable.of(false);
        });
    }
  }

  public excluirToken(): void {
    localStorage.removeItem("usuario");
  }

  public pegarUsuario(): string {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    return usuario.usuario;
  }
}
