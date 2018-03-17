import { Injectable } from "@angular/core";
import { GraphqlService } from "./graphql.service";
import { Observable } from "rxjs/Observable";
import { Usuario } from "./models/usuario.model";
import { Resposta } from "./models/resposta.model";
import { Mensagem } from "./models/mensagem.model";

@Injectable()
export class UsuarioService {
  private inserir: string;
  private excluir: string;
  private alterar: string;
  private todos: string;
  private porUsuario: string;
  constructor(private graphql: GraphqlService) {
    this.todos = `{ usuarios { usuario } }`;
    this.excluir = `mutation { 
        excluirUsuario(usuario:"$user")
      }`;
    this.inserir = `mutation {
          inserirUsuario(usuario:{
            usuario:"$nome"
            senha: "$senha"
          }) {
            usuario
          }
        }`;
    this.alterar = `mutation {
            alterarUsuario(usuario:{
              usuario:"$nome"
              senha: "$senha"
            }) {
              usuario
            }
          }`;
  }

  public recuperarTodos(): Observable<Usuario[]> {
    return this.graphql
      .request(this.todos)
      .map((resposta: Resposta) =>
        resposta.dados["usuarios"].map(
          usuario => new Usuario(usuario.usuario, usuario.senha)
        )
      );
  }

  public excluirUsuario(nome: string): Observable<Mensagem[]> {
    return this.graphql
      .request(this.excluir.replace("$user", nome))
      .map((resposta: Resposta) => {
        if (resposta.erro) {
          let erros = JSON.parse(resposta.erro[0].message).map(
            mensagem => new Mensagem(mensagem.message, mensagem.level)
          );
          return erros;
        }
        return null;
      });
  }

  public incluirUsuario(usuario: Usuario): Observable<Mensagem[]> {
    return this.graphql
      .request(
        this.inserir
          .replace("$nome", usuario.nome)
          .replace("$senha", usuario.senha)
      )
      .map((resposta: Resposta) => {
        if (resposta.erro) {
          let erros = JSON.parse(resposta.erro[0].message).map(
            mensagem => new Mensagem(mensagem.message, mensagem.level)
          );
          return erros;
        }
        return null;
      });
  }

  public alterarUsuario(usuario: Usuario): Observable<Mensagem[]> {
    return this.graphql
      .request(
        this.alterar
          .replace("$nome", usuario.nome)
          .replace("$senha", usuario.senha)
      )
      .map((resposta: Resposta) => {
        if (resposta.erro) {
          let erros = JSON.parse(resposta.erro[0].message).map(
            mensagem => new Mensagem(mensagem.message, mensagem.level)
          );
          return erros;
        }
        return null;
      });
  }
}
