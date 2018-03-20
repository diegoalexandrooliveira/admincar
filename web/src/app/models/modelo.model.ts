import { Marca } from "./marca.model";

export class Modelo {
  private id: number;
  private descricao: string;
  private marca: Marca;

  constructor(id?: number, descricao?: string, marca?: Marca) {
    this.id = id;
    this.descricao = descricao;
    this.marca = marca;
  }

  public get $id() {
    return this.id;
  }
  public set $id(id: number) {
    this.id = id;
  }

  public get $descricao() {
    return this.descricao;
  }
  public set $descricao(descricao: string) {
    this.descricao = descricao;
  }

  public get $marca() {
    return this.marca;
  }
  public set $marca(marca: Marca) {
    this.marca = marca;
  }
}
