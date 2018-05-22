import { configs } from "../../config/configs";

export class AnexoVeiculo {
  private id: number;
  private url: string;
  private principal: boolean;
  private tipoArquivo: number;
  private veiculoId: number;
  private file: any;
  private progressUpload: number;
  private excluir: boolean;

  constructor(
    id?: number,
    url?: string,
    principal?: boolean,
    tipoArquivo?: number,
    veiculoId?: number,
    file?: any
  ) {
    this.id = id;
    this.url = url;
    if (!url) {
      this.url = configs.url + "/public/images/veiculoSemImagem.jpg";
    }
    this.principal = principal;
    this.tipoArquivo = tipoArquivo;
    this.veiculoId = veiculoId;
    this.file = file;
    this.excluir = false;
  }

  public get $id() {
    return this.id;
  }
  public set $id(id: number) {
    this.id = id;
  }

  public get $url() {
    return this.url;
  }
  public set $url(url: string) {
    this.url = url;
  }

  public get $principal() {
    return this.principal;
  }
  public set $principal(principal: boolean) {
    this.principal = principal;
  }

  public get $tipoArquivo() {
    return this.tipoArquivo;
  }
  public set $tipoArquivo(tipoArquivo: number) {
    this.tipoArquivo = tipoArquivo;
  }

  public get $veiculoId() {
    return this.veiculoId;
  }
  public set $veiculoId(veiculoId: number) {
    this.veiculoId = veiculoId;
  }

  public get $file() {
    return this.file;
  }
  public set $file(file: any) {
    this.file = file;
  }

  public set $progressUpload(progressUpload: number) {
    this.progressUpload = progressUpload;
  }
  public get $progressUpload() {
    return this.progressUpload;
  }

  public get $excluir() {
    return this.excluir;
  }
  public set $excluir(excluir: boolean) {
    this.excluir = excluir;
  }
}
