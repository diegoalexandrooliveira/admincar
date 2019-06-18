import { Injectable } from "@angular/core";
import { GraphqlService } from "./graphql.service";
import { Resposta } from "./models/resposta.model";
import { Mensagem } from "./models/mensagem.model";
import { Veiculo } from "./models/veiculo.model";
import { Modelo } from "./models/modelo.model";
import { Marca } from "./models/marca.model";
import { Cor } from "./models/cor.model";
import { AnexoVeiculo } from "./models/anexo-veiculo.model";
import { TipoVeiculo } from "./models/tipo-veiculo.model";
import { Combustivel } from "./models/combustivel.model";
import { Opcional } from "./models/opcional.model";

@Injectable()
export class VeiculosService {
  
  private todosList: string;
  private veiculoPorId: string;
  private todosPrincipal: string;
  
  constructor(
    private graphql: GraphqlService
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
    this.todosPrincipal = `{
      veiculos{
        id
        anoFabricacao
        anoModelo
        modelo{
          descricao
          marca{
            descricao
          }
        }
        valorAnuncio
        anexoPrincipal{
          url
        }
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
    

  }

  public recuperarTodosPrincipal(): Promise<Veiculo[]> {
    return this.graphql
      .request(this.todosPrincipal)
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
              veiculo.anoFabricacao,veiculo.anoModelo,null,veiculo.valorAnuncio,null,
              null,
              new AnexoVeiculo(null, veiculo.anexoPrincipal.url)
            )
        )
      )
      .toPromise();
  }

  // public recuperarVeiculoPorId(id: number): Promise<Veiculo> {
  //   return this.graphql
  //     .request(this.veiculoPorId.replace("$id", id.toString()))
  //     .map((resposta: Resposta) => {
  //       let veiculo = resposta.dados["veiculo"];
  //       let cidade = veiculo.cidade;
  //       let combustivel = veiculo.combustivel;
  //       let anexos: AnexoVeiculo[] = [];
  //       veiculo.anexos.forEach(anexo => {
  //         anexos.push(
  //           new AnexoVeiculo(
  //             anexo.id,
  //             anexo.url,
  //             Boolean(anexo.principal),
  //             anexo.tipoArquivo,
  //             veiculo.id
  //           )
  //         );
  //       });
  //       let opcionais: Opcional[] = veiculo.opcionais
  //         ? veiculo.opcionais.map(
  //             opcional => new Opcional(opcional.id, opcional.descricao)
  //           )
  //         : [];

  //       return new Veiculo(
  //         veiculo.id,
  //         new Modelo(
  //           veiculo.modelo.id,
  //           veiculo.modelo.descricao,
  //           new Marca(
  //             veiculo.modelo.marca.id,
  //             veiculo.modelo.marca.descricao,
  //             new TipoVeiculo(veiculo.modelo.marca.tipoVeiculo.id)
  //           )
  //         ),
  //         veiculo.anoFabricacao,
  //         veiculo.anoModelo,
  //         veiculo.placa,
  //         veiculo.renavam,
  //         veiculo.chassi,
  //         new Cor(veiculo.cor.id),
  //         new Cidade(
  //           cidade ? veiculo.cidade.id : null,
  //           null,
  //           new Estado(cidade ? veiculo.cidade.estado.id : null, null)
  //         ),
  //         veiculo.dataInclusao ? new Date(veiculo.dataInclusao) : null,
  //         veiculo.dataAquisicao ? new Date(veiculo.dataAquisicao) : null,
  //         veiculo.dataVenda ? new Date(veiculo.dataVenda) : null,
  //         veiculo.valorCompra,
  //         veiculo.valorVenda,
  //         veiculo.valorAnuncio,
  //         veiculo.observacoes,
  //         combustivel ? new Combustivel(veiculo.combustivel.id) : null,
  //         anexos,
  //         null,
  //         opcionais
  //       );
  //     })
  //     .toPromise();
  // }

 
}
