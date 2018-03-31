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
import { TipoVeiculo } from "./models/tipo-veiculo.model";
import { Combustivel } from "./models/combustivel.model";
import { Estado } from "./models/estado.model";
import { Cidade } from "./models/cidade.model";

@Injectable()
export class VeiculosService {
  private inserir: string;
  private excluir: string;
  private alterar: string;
  private todosList: string;
  private porUsuario: string;
  private tipoVeiculo: string;
  private marcas: string;
  private modelos: string;
  private cores: string;
  private combustiveis: string;
  private estados: string;
  private cidades: string;
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

    this.tipoVeiculo = `{
        tiposVeiculo{
          id
          descricao
        }
      }`;

    this.marcas = `
      {
        marcas(tipoVeiculoId:$tipoVeiculoId){
          id
          descricao
        }
      }`;

    this.modelos = `{
        modelos(marcaId:$marcaId){
          id
          descricao
        }
      }`;
    this.cores = `{
        cores{
          id
          descricao
        }
      }`;
    this.combustiveis = `{
        combustiveis{
          id
          descricao
        }
      }`;
    this.estados = `{
      estados{
        id
        nome
        sigla
      }
    }`;
    this.cidades = `{
      cidades(estadoId:$estadoId){
        id
        nome
      }
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

  public recuperarTodosList(situacao: string = "todos"): Promise<Veiculo[]> {
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
      )
      .toPromise();
  }

  public excluirVeiculo(id: number): Promise<Mensagem[]> {
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
      })
      .toPromise();
  }

  public buscarTiposVeiculo(): Promise<TipoVeiculo[]> {
    return this.graphql
      .request(this.tipoVeiculo)
      .map((resposta: Resposta) =>
        resposta.dados["tiposVeiculo"].map(
          tipoVeiculo => new TipoVeiculo(tipoVeiculo.id, tipoVeiculo.descricao)
        )
      )
      .toPromise();
  }

  public buscarMarcasPorTipoVeiculo(tipoVeiculoId: number): Promise<Marca[]> {
    return this.graphql
      .request(this.marcas.replace("$tipoVeiculoId", tipoVeiculoId.toString()))
      .map((resposta: Resposta) =>
        resposta.dados["marcas"].map(
          marca => new Marca(marca.id, marca.descricao)
        )
      )
      .toPromise();
  }

  public buscarModelosPorMarca(marcaId: number): Promise<Modelo[]> {
    return this.graphql
      .request(this.modelos.replace("$marcaId", marcaId.toString()))
      .map((resposta: Resposta) =>
        resposta.dados["modelos"].map(
          modelo => new Modelo(modelo.id, modelo.descricao)
        )
      )
      .toPromise();
  }

  public buscarCores(): Promise<Cor[]> {
    return this.graphql
      .request(this.cores)
      .map((resposta: Resposta) =>
        resposta.dados["cores"].map(cor => new Cor(cor.id, cor.descricao))
      )
      .toPromise();
  }

  public buscarCombustiveis(): Promise<Combustivel[]> {
    return this.graphql
      .request(this.combustiveis)
      .map((resposta: Resposta) =>
        resposta.dados["combustiveis"].map(
          combustivel => new Combustivel(combustivel.id, combustivel.descricao)
        )
      )
      .toPromise();
  }

  public buscarEstados(): Promise<Estado[]> {
    return this.graphql
      .request(this.estados)
      .map((resposta: Resposta) =>
        resposta.dados["estados"].map(
          estado => new Estado(estado.id, estado.nome, estado.sigla)
        )
      )
      .toPromise();
  }

  public buscarCidades(estadoId: number): Promise<Cidade[]> {
    return this.graphql
      .request(this.cidades.replace("$estadoId", estadoId.toString()))
      .map((resposta: Resposta) =>
        resposta.dados["cidades"].map(
          cidade => new Cidade(cidade.id, cidade.nome)
        )
      )
      .toPromise();
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
