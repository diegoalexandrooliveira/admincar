import { Modelo } from "./modelo.model";
import { Cor } from "./cor.model";
import { AnexoVeiculo } from "./anexo-veiculo.model";
import { Combustivel } from "./combustivel.model";
import { Cidade } from "./cidade.model";
import { Opcional } from "./opcional.model";

export class Veiculo {
  constructor(
    id?: number,
    modelo?: Modelo,
    anoFabricacao?: number,
    anoModelo?: number,
    placa?: string,
    renavam?: string,
    chassi?: string,
    cor?: Cor,
    cidade?: Cidade,
    dataInclusao?: Date,
    dataAquisicao?: Date,
    dataVenda?: Date,
    valorCompra?: number,
    valorVenda?: number,
    valorAnuncio?: number,
    observacoes?: string,
    combustivel?: Combustivel,
    anexos?: AnexoVeiculo[],
    anexoPrincipal?: AnexoVeiculo,
    opcionais?: Opcional[]
  ) {
    this.id = id;
    this.modelo = modelo;
    this.anoFabricacao = anoFabricacao;
    this.anoModelo = anoModelo;
    this.placa = placa;
    this.renavam = renavam;
    this.chassi = chassi;
    this.cor = cor;
    this.cidade = cidade;
    this.dataInclusao = dataInclusao;
    this.dataAquisicao = dataAquisicao;
    this.dataVenda = dataVenda;
    this.valorCompra = valorCompra;
    this.valorVenda = valorVenda;
    this.valorAnuncio = valorAnuncio;
    this.observacoes = observacoes;
    this.combustivel = combustivel;
    this.anexos = anexos;
    this.anexoPrincipal = anexoPrincipal;
    this.opcionais = opcionais;
  }
  private id: number;
  private modelo: Modelo;
  private anoFabricacao: number;
  private anoModelo: number;
  private placa: string;
  private renavam: string;
  private chassi: string;
  private cor: Cor;
  private cidade: Cidade;
  private dataInclusao: Date;
  private dataAquisicao: Date;
  private dataVenda: Date;
  private valorCompra: number;
  private valorVenda: number;
  private valorAnuncio: number;
  private observacoes: string;
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

  public get $placa(): string {
    return this.placa;
  }

  public set $placa(value: string) {
    this.placa = value;
  }

  public get $renavam(): string {
    return this.renavam;
  }

  public set $renavam(value: string) {
    this.renavam = value;
  }

  public get $chassi(): string {
    return this.chassi;
  }

  public set $chassi(value: string) {
    this.chassi = value;
  }

  public get $dataInclusao(): Date {
    return this.dataInclusao;
  }

  public set $dataInclusao(value: Date) {
    this.dataInclusao = value;
  }

  public get $dataAquisicao(): Date {
    return this.dataAquisicao;
  }

  public set $dataAquisicao(value: Date) {
    this.dataAquisicao = value;
  }

  public get $dataVenda(): Date {
    return this.dataVenda;
  }

  public set $dataVenda(value: Date) {
    this.dataVenda = value;
  }

  public get $valorCompra(): number {
    return this.valorCompra;
  }

  public set $valorCompra(value: number) {
    this.valorCompra = value;
  }

  public get $valorVenda(): number {
    return this.valorVenda;
  }

  public set $valorVenda(value: number) {
    this.valorVenda = value;
  }

  public get $valorAnuncio(): number {
    return this.valorAnuncio;
  }

  public set $valorAnuncio(value: number) {
    this.valorAnuncio = value;
  }

  public get $observacoes(): string {
    return this.observacoes;
  }

  public set $observacoes(value: string) {
    this.observacoes = value;
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

  public get $cidade(): Cidade {
    return this.cidade;
  }

  public set $cidade(value: Cidade) {
    this.cidade = value;
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
