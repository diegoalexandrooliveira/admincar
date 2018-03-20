import { configs } from "../config/configs";

export class AnexoVeiculo {
  private id: number;
  private url: string;

  constructor(id?: number, url?: string) {
    this.id = id;
    this.url = url;
    if (!url) {
      this.url = configs.url + "/public/images/veiculoSemImagem.jpg";
    }
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
}
