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
import { HttpService } from "./http.service";
import { Progress } from "angular-progress-http";
import { Opcional } from "./models/opcional.model";

@Injectable()
export class VeiculosService {
  private inserir: string;
  private excluir: string;
  private alterar: string;
  private todosList: string;
  private veiculoPorId: string;
  private tipoVeiculo: string;
  private marcas: string;
  private modelos: string;
  private cores: string;
  private combustiveis: string;
  private estados: string;
  private cidades: string;
  private opcionais: string;
  private atualizarAnexos: string;
  private excluirAnexos: string;
  constructor(
    private graphql: GraphqlService,
    private httpService: HttpService
  ) {
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
    this.veiculoPorId = `{
      veiculo(id:$id){
        id
        modelo{
          id
          descricao
          marca{
            id
            descricao
            tipoVeiculo{
              id
            }
          }
        }
        anoFabricacao
        anoModelo
        placa
        renavam
        chassi
        cor{
          id
        }
        cidade{
          id
          estado{
            id
          }
        }
        dataInclusao
        dataAquisicao
        dataVenda
        valorCompra
        valorVenda
        valorAnuncio
        observacoes
        combustivel{
          id
        }
        anexos{
          id
          tipoArquivo
          url
          principal
        }
        opcionais{
          id
          descricao
        }
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
    this.opcionais = `{
            opcionais{
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
    this.inserir = `mutation{
      inserirVeiculo(veiculo:{
        modelo: $modelo
        anoFabricacao: $anoFabricacao
        anoModelo: $anoModelo
        placa: $placa
        renavam: $renavam
        chassi: $chassi
        cor: $cor
        cidade: $cidade
        dataAquisicao: $dataAquisicao
        dataVenda: $dataVenda
        valorAnuncio: $valorAnuncio
        valorCompra: $valorCompra
        valorVenda: $valorVenda
        observacoes: $observacoes
        combustivel: $combustivel
        opcionais: [$opcionais]
      })
    }`;
    this.alterar = `mutation{
      atualizarVeiculo(veiculo:{
        modelo: $modelo
        anoFabricacao: $anoFabricacao
        anoModelo: $anoModelo
        placa: $placa
        renavam: $renavam
        chassi: $chassi
        cor: $cor
        cidade: $cidade
        dataAquisicao: $dataAquisicao
        dataVenda: $dataVenda
        valorAnuncio: $valorAnuncio
        valorCompra: $valorCompra
        valorVenda: $valorVenda
        observacoes: $observacoes
        combustivel: $combustivel
        id: $id
        opcionais: [$opcionais]
      })
    }`;
    this.atualizarAnexos = `update$id: atualizarAnexo(anexo: {id: $id, tipoArquivo: $tipoArquivo, principal: $principal})
    `;
    this.excluirAnexos = `delete$id: excluirAnexo(id: $id)`;
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

  public recuperarVeiculoPorId(id: number): Promise<Veiculo> {
    return this.graphql
      .request(this.veiculoPorId.replace("$id", id.toString()))
      .map((resposta: Resposta) => {
        let veiculo = resposta.dados["veiculo"];
        let cidade = veiculo.cidade;
        let combustivel = veiculo.combustivel;
        let anexos: AnexoVeiculo[] = [];
        veiculo.anexos.forEach(anexo => {
          anexos.push(
            new AnexoVeiculo(
              anexo.id,
              anexo.url,
              Boolean(anexo.principal),
              anexo.tipoArquivo,
              veiculo.id
            )
          );
        });
        let opcionais: Opcional[] = veiculo.opcionais
          ? veiculo.opcionais.map(
              opcional => new Opcional(opcional.id, opcional.descricao)
            )
          : [];

        return new Veiculo(
          veiculo.id,
          new Modelo(
            veiculo.modelo.id,
            veiculo.modelo.descricao,
            new Marca(
              veiculo.modelo.marca.id,
              veiculo.modelo.marca.descricao,
              new TipoVeiculo(veiculo.modelo.marca.tipoVeiculo.id)
            )
          ),
          veiculo.anoFabricacao,
          veiculo.anoModelo,
          veiculo.placa,
          veiculo.renavam,
          veiculo.chassi,
          new Cor(veiculo.cor.id),
          new Cidade(
            cidade ? veiculo.cidade.id : null,
            null,
            new Estado(cidade ? veiculo.cidade.estado.id : null, null)
          ),
          veiculo.dataInclusao ? new Date(veiculo.dataInclusao) : null,
          veiculo.dataAquisicao ? new Date(veiculo.dataAquisicao) : null,
          veiculo.dataVenda ? new Date(veiculo.dataVenda) : null,
          veiculo.valorCompra,
          veiculo.valorVenda,
          veiculo.valorAnuncio,
          veiculo.observacoes,
          combustivel ? new Combustivel(veiculo.combustivel.id) : null,
          anexos,
          null,
          opcionais
        );
      })
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

  public buscarOpcionais(): Promise<Opcional[]> {
    return this.graphql
      .request(this.opcionais)
      .map((resposta: Resposta) =>
        resposta.dados["opcionais"].map(
          opcional => new Opcional(opcional.id, opcional.descricao)
        )
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
    if (!estadoId) {
      return null;
    }
    return this.graphql
      .request(this.cidades.replace("$estadoId", estadoId.toString()))
      .map((resposta: Resposta) =>
        resposta.dados["cidades"].map(
          cidade => new Cidade(cidade.id, cidade.nome)
        )
      )
      .toPromise();
  }

  public incluirVeiculo(
    veiculo: Veiculo
  ): Promise<{ id: number; erros: Mensagem[] }> {
    veiculo.$opcionais = !veiculo.$opcionais ? [] : veiculo.$opcionais;
    let opcionais = veiculo.$opcionais
      .map(opcional => opcional.$id.toString())
      .reduce((prev: string, curr: string) => {
        if (prev) {
          prev += ",";
        }
        return prev + `{id: ${curr}}`;
      }, "");
    return this.graphql
      .request(
        this.inserir
          .replace(
            "$modelo",
            veiculo.$modelo.$id ? veiculo.$modelo.$id.toString() : "null"
          )
          .replace(
            "$anoFabricacao",
            veiculo.$anoFabricacao ? veiculo.$anoFabricacao.toString() : "null"
          )
          .replace(
            "$anoModelo",
            veiculo.$anoModelo ? veiculo.$anoModelo.toString() : "null"
          )
          .replace("$placa", veiculo.$placa ? `"${veiculo.$placa}"` : "null")
          .replace(
            "$renavam",
            veiculo.$renavam ? `"${veiculo.$renavam}"` : "null"
          )
          .replace("$chassi", veiculo.$chassi ? `"${veiculo.$chassi}"` : "null")
          .replace(
            "$cor",
            veiculo.$cor.$id ? veiculo.$cor.$id.toString() : "null"
          )
          .replace(
            "$cidade",
            veiculo.$cidade.$id ? veiculo.$cidade.$id.toString() : "null"
          )
          .replace(
            "$dataAquisicao",
            veiculo.$dataAquisicao
              ? `"${veiculo.$dataAquisicao.toJSON()}"`
              : "null"
          )
          .replace(
            "$dataVenda",
            veiculo.$dataVenda ? `"${veiculo.$dataVenda.toJSON()}"` : "null"
          )
          .replace(
            "$valorAnuncio",
            veiculo.$valorAnuncio ? veiculo.$valorAnuncio.toString() : "null"
          )
          .replace(
            "$valorCompra",
            veiculo.$valorCompra ? veiculo.$valorCompra.toString() : "null"
          )
          .replace(
            "$valorVenda",
            veiculo.$valorVenda ? veiculo.$valorVenda.toString() : "null"
          )
          .replace(
            "$observacoes",
            veiculo.$observacoes ? `"${veiculo.$observacoes}"` : "null"
          )
          .replace(
            "$combustivel",
            veiculo.$combustivel && veiculo.$combustivel.$id
              ? veiculo.$combustivel.$id.toString()
              : "null"
          )
          .replace("$opcionais", opcionais)
      )
      .map((resposta: Resposta) => {
        if (resposta.erro) {
          let erros = JSON.parse(resposta.erro[0].message).map(
            mensagem => new Mensagem(mensagem.message, mensagem.level)
          );
          return { id: null, erros: erros };
        }
        return { id: resposta.dados["inserirVeiculo"], erros: null };
      })
      .toPromise();
  }

  public atualizarVeiculo(
    veiculo: Veiculo
  ): Promise<{ rows: number; erros: Mensagem[] }> {
    veiculo.$opcionais = !veiculo.$opcionais ? [] : veiculo.$opcionais;
    let opcionais = veiculo.$opcionais
      .map(opcional => opcional.$id.toString())
      .reduce((prev: string, curr: string) => {
        if (prev) {
          prev += ",";
        }
        return prev + `{id: ${curr}}`;
      }, "");
    return this.graphql
      .request(
        this.alterar
          .replace(
            "$modelo",
            veiculo.$modelo.$id ? veiculo.$modelo.$id.toString() : "null"
          )
          .replace(
            "$anoFabricacao",
            veiculo.$anoFabricacao ? veiculo.$anoFabricacao.toString() : "null"
          )
          .replace(
            "$anoModelo",
            veiculo.$anoModelo ? veiculo.$anoModelo.toString() : "null"
          )
          .replace("$placa", veiculo.$placa ? `"${veiculo.$placa}"` : "null")
          .replace(
            "$renavam",
            veiculo.$renavam ? `"${veiculo.$renavam}"` : "null"
          )
          .replace("$chassi", veiculo.$chassi ? `"${veiculo.$chassi}"` : "null")
          .replace(
            "$cor",
            veiculo.$cor.$id ? veiculo.$cor.$id.toString() : "null"
          )
          .replace(
            "$cidade",
            veiculo.$cidade.$id ? veiculo.$cidade.$id.toString() : "null"
          )
          .replace(
            "$dataAquisicao",
            veiculo.$dataAquisicao
              ? `"${veiculo.$dataAquisicao.toJSON()}"`
              : "null"
          )
          .replace(
            "$dataVenda",
            veiculo.$dataVenda ? `"${veiculo.$dataVenda.toJSON()}"` : "null"
          )
          .replace(
            "$valorAnuncio",
            veiculo.$valorAnuncio ? veiculo.$valorAnuncio.toString() : "null"
          )
          .replace(
            "$valorCompra",
            veiculo.$valorCompra ? veiculo.$valorCompra.toString() : "null"
          )
          .replace(
            "$valorVenda",
            veiculo.$valorVenda ? veiculo.$valorVenda.toString() : "null"
          )
          .replace(
            "$observacoes",
            veiculo.$observacoes ? `"${veiculo.$observacoes}"` : "null"
          )
          .replace(
            "$combustivel",
            veiculo.$combustivel && veiculo.$combustivel.$id
              ? veiculo.$combustivel.$id.toString()
              : "null"
          )
          .replace("$id", veiculo.$id ? veiculo.$id.toString() : "null")
          .replace("$opcionais", opcionais)
      )
      .map((resposta: Resposta) => {
        if (resposta.erro) {
          let erros = JSON.parse(resposta.erro[0].message).map(
            mensagem => new Mensagem(mensagem.message, mensagem.level)
          );
          return { rows: null, erros: erros };
        }
        return { rows: resposta.dados["atualizarVeiculo"], erros: null };
      })
      .toPromise();
  }

  public subirAnexo(anexo: AnexoVeiculo): Promise<AnexoVeiculo> {
    let body = new FormData();
    body.append("imagem", anexo.$file);
    body.append("veiculoId", anexo.$veiculoId.toString());
    body.append("tipoArquivo", anexo.$tipoArquivo.toString());
    body.append("principal", String(anexo.$principal));
    return this.httpService
      .postMultiPart("uploadFile", body, (progress: Progress) => {
        anexo.$progressUpload = progress.percentage;
      })
      .map((resposta: Resposta) => {
        if (resposta.erro[0]) {
          let erro: Mensagem[] = resposta.erro.map(
            mensagem => new Mensagem(mensagem.message, mensagem.level)
          );
          throw erro;
        }
        let retorno: AnexoVeiculo = resposta.dados[0];
        return retorno;
      })
      .toPromise();
  }

  public atualizarAnexo(anexos: AnexoVeiculo[]): Promise<Mensagem[]> {
    if (anexos.length) {
      let payload = "";
      anexos.forEach(anexo => {
        payload +=
          `
        ` +
          this.atualizarAnexos
            .replace("$id", anexo.$id.toString())
            .replace("$id", anexo.$id.toString())
            .replace("$tipoArquivo", anexo.$tipoArquivo.toString())
            .replace("$principal", String(anexo.$principal));
      });
      payload = `mutation {${payload}}`;
      return this.graphql
        .request(payload)
        .map((resposta: Resposta) => {
          return null;
        })
        .toPromise();
    } else {
      return Promise.resolve(null);
    }
  }

  public excluirAnexo(anexos: AnexoVeiculo[]): Promise<Mensagem[]> {
    if (anexos.length) {
      let payload = "";
      anexos.forEach(anexo => {
        payload +=
          `
        ` +
          this.excluirAnexos
            .replace("$id", anexo.$id.toString())
            .replace("$id", anexo.$id.toString());
      });
      payload = `mutation {${payload}}`;
      return this.graphql
        .request(payload)
        .map((resposta: Resposta) => {
          return null;
        })
        .toPromise();
    } else {
      return Promise.resolve(null);
    }
  }
}
