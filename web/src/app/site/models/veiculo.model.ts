import { Modelo } from "./modelo.model";
import { Cor } from "./cor.model";
import { AnexoVeiculo } from "./anexo-veiculo.model";
import { Combustivel } from "./combustivel.model";
import { Opcional } from "./opcional.model";

export class Veiculo {
  constructor(
    id?: number,
    modelo?: Modelo,
    anoFabricacao?: number,
    anoModelo?: number,
    cor?: Cor,
    valorAnuncio?: number,
    combustivel?: Combustivel,
    anexos?: AnexoVeiculo[],
    anexoPrincipal?: AnexoVeiculo,
    opcionais?: Opcional[]
  ) {
    this.id = id;
    this.modelo = modelo;
    this.anoFabricacao = anoFabricacao;
    this.anoModelo = anoModelo;
    this.cor = cor;
    this.valorAnuncio = valorAnuncio;
    this.combustivel = combustivel;
    this.anexos = anexos;
    this.anexoPrincipal = anexoPrincipal;
    this.opcionais = opcionais;
  }
  private id: number;
  private modelo: Modelo;
  private anoFabricacao: number;
  private anoModelo: number;
  private cor: Cor;
  private valorAnuncio: number;
  private combustivel: Combustivel;
  private anexos: AnexoVeiculo[];
  private anexoPrincipal: AnexoVeiculo;
  private opcionais: Opcional[];

  public get $id(): number {
    return this.id;
  }

  public set $id(value: number) {
    this.id = value;
  }

  public get $anoFabricacao(): number {
    return this.anoFabricacao;
  }

  public set $anoFabricacao(value: number) {
    this.anoFabricacao = value;
  }

  public get $anoModelo(): number {
    return this.anoModelo;
  }

  public set $anoModelo(value: number) {
    this.anoModelo = value;
  }

  

  public get $valorAnuncio(): number {
    return this.valorAnuncio;
  }

  public set $valorAnuncio(value: number) {
    this.valorAnuncio = value;
  }

  
  public get $modelo(): Modelo {
    return this.modelo;
  }

  public set $modelo(value: Modelo) {
    this.modelo = value;
  }

  public get $cor(): Cor {
    return this.cor;
  }

  public set $cor(value: Cor) {
    this.cor = value;
  }

   public get $combustivel(): Combustivel {
    return this.combustivel;
  }

  public set $combustivel(value: Combustivel) {
    this.combustivel = value;
  }

  public get $anexos() {
    return this.anexos;
  }
  public set $anexos(anexos: AnexoVeiculo[]) {
    this.anexos = anexos;
  }

  public get $anexoPrincipal() {
    return this.anexoPrincipal;
  }
  public set $anexoPrincipal(anexoPrincipal: AnexoVeiculo) {
    this.anexoPrincipal = anexoPrincipal;
  }

  public get $opcionais() {
    return this.opcionais;
  }
  public set $opcionais(opcionais: Opcional[]) {
    this.opcionais = opcionais;
  }
}
