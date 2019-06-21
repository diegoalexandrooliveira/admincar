import { Injectable } from "@angular/core";
import { GraphqlService } from "./graphql.service";
import { Resposta } from "./models/resposta.model";
import { Veiculo } from "./models/veiculo.model";
import { Modelo } from "./models/modelo.model";
import { Marca } from "./models/marca.model";
import { Cor } from "./models/cor.model";
import { AnexoVeiculo } from "./models/anexo-veiculo.model";
import { Combustivel } from "./models/combustivel.model";
import { Opcional } from "./models/opcional.model";

@Injectable()
export class VeiculosService {

  private todosVeiculos: string;
  private veiculoPorId: string;
  private todosAleatoriosLimitado: string;

  constructor(
    private graphql: GraphqlService
  ) {
    this.todosVeiculos = `{
      veiculo $1 {
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
    this.todosAleatoriosLimitado = `{
      veiculo(aleatorios: true){
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
      veiculo(id: $id) {
        id
        anoFabricacao
        anoModelo
        modelo {
          descricao
          marca {
            descricao
          }
        }
        cor {
          descricao
        }
        combustivel {
          descricao
        }
        opcionais {
          descricao
        }
        valorAnuncio
        anexos {
          url
        }
      }
    }
    `;


  }

  public recuperarAleatoriosLimitado(): Promise<Veiculo[]> {
    return this.graphql
      .request(this.todosAleatoriosLimitado)
      .map((resposta: Resposta) =>
        resposta.dados["veiculo"].map(
          veiculo =>
            new Veiculo(
              veiculo.id,
              new Modelo(
                null,
                veiculo.modelo.descricao,
                new Marca(null, veiculo.modelo.marca.descricao)
              ),
              veiculo.anoFabricacao, veiculo.anoModelo, null, veiculo.valorAnuncio, null,
              null,
              new AnexoVeiculo(null, veiculo.anexoPrincipal.url)
            )
        )
      )
      .toPromise();
  }

  public recuperarTodosVeiculos(procurar?: String): Promise<Veiculo[]> {
    let payload: string = this.todosVeiculos.replace("$1", procurar? `(procurar: "${procurar}")` : "");
    return this.graphql
      .request(payload)
      .map((resposta: Resposta) =>
        resposta.dados["veiculo"].map(
          veiculo =>
            new Veiculo(
              veiculo.id,
              new Modelo(
                null,
                veiculo.modelo.descricao,
                new Marca(null, veiculo.modelo.marca.descricao)
              ),
              veiculo.anoFabricacao, veiculo.anoModelo, null, veiculo.valorAnuncio, null,
              null,
              new AnexoVeiculo(null, veiculo.anexoPrincipal.url)
            )
        )
      )
      .toPromise();
  }

  public recuperarVeiculo(id: number): Promise<Veiculo> {
    return this.graphql
      .request(this.veiculoPorId.replace("$id", id.toString()))
      .map((resposta: Resposta) => {
        let dado = resposta.dados["veiculo"] ? resposta.dados["veiculo"][0] : null;
        if (dado) {
          return new Veiculo(
            dado.id,
            new Modelo(
              null,
              dado.modelo.descricao,
              new Marca(null, dado.modelo.marca.descricao)
            ),
            dado.anoFabricacao, dado.anoModelo, new Cor(null, dado.cor.descricao),
            dado.valorAnuncio, new Combustivel(null, dado.combustivel? dado.combustivel.descricao : ""),
            dado.anexos.length? dado.anexos.map(anexo => new AnexoVeiculo(null, anexo.url)): Array.of(new AnexoVeiculo(null,null)), null,
            dado.opcionais? dado.opcionais.map(opcional => new Opcional(null, opcional.descricao)):null
          );
        } else {
          return new Veiculo();
        }
      })
      .toPromise();
  }
}
