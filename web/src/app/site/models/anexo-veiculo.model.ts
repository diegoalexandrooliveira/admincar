import { configs } from "../../config/configs";

export class AnexoVeiculo {
  private id: number;
  private url: string;
  private principal: boolean;
  private veiculoId: number;

  constructor(
    id?: number,
    url?: string,
    principal?: boolean,
    veiculoId?: number
  ) {
    this.id = id;
    if (!url) {
      this.url = configs.url + "/public/images/veiculoSemImagem.jpg";
    }else {
    this.url = url;
    }
    this.principal = principal;
    this.veiculoId = veiculoId;
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



  public get $veiculoId() {
    return this.veiculoId;
  }
  public set $veiculoId(veiculoId: number) {
    this.veiculoId = veiculoId;
  }
}
