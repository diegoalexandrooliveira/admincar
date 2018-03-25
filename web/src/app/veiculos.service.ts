import { Injectable } from "@angular/core";
import { GraphqlService } from "./graphql.service";
import { Observable } from "rxjs/Observable";
import { Usuario } from "./models/usuario.model";
import { Resposta } from "./models/resposta.model";
import { Mensagem } from "./models/mensagem.model";
import { Veiculo } from "./models/veiculo.model";
import { Modelo } from "./models/modelo.model";
import { Marca } from "./models/marca.model";
import { Cor } from "./models/cor.model";
import { AnexoVeiculo } from "./models/anexo-veiculo.model";

@Injectable()
export class VeiculosService {
  private inserir: string;
  private excluir: string;
  private alterar: string;
  private todosList: string;
  private porUsuario: string;
  constructor(private graphql: GraphqlService) {
    this.todosList = `{
      veiculos(situacao:"$1"){
        id
        modelo{
          descricao
          marca{
            descricao
          }
        }
        anoFabricacao
        anoModelo
        placa
        cor{
          descricao
        }
        valorAnuncio
        anexoPrincipal{
          url
        }
        dataVenda
      }
    }`;
    this.excluir = `mutation { 
        excluirVeiculo(id:$id)
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

  public recuperarTodosList(situacao: string = "todos"): Observable<Veiculo[]> {
    return this.graphql
      .request(this.todosList.replace("$1", situacao))
      .map((resposta: Resposta) =>
        resposta.dados["veiculos"].map(
          veiculo =>
            new Veiculo(
              veiculo.id,
              new Modelo(
                null,
                veiculo.modelo.descricao,
                new Marca(null, veiculo.modelo.marca.descricao)
              ),
              veiculo.anoFabricacao,
              veiculo.anoModelo,
              veiculo.placa,
              null,
              null,
              new Cor(null, veiculo.cor.descricao),
              null,
              null,
              null,
              veiculo.dataVenda,
              null,
              null,
              veiculo.valorAnuncio,
              null,
              null,
              null,
              new AnexoVeiculo(null, veiculo.anexoPrincipal.url)
            )
        )
      );
  }

  public excluirVeiculo(id: number): Observable<Mensagem[]> {
    return this.graphql
      .request(this.excluir.replace("$id", id.toString()))
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
