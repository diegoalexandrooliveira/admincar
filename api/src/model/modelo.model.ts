import { Marca } from "./marca.model";

export class Modelo {
  private id: number;
  private descricao: string;
  private marca: Marca;

  public get $id(): number {
    return this.id;
  }

  public set $id(value: number) {
    this.id = value;
  }

  public get $descricao(): string {
    return this.descricao;
  }

  public set $descricao(value: string) {
    this.descricao = value;
  }

  public get $marca(): Marca {
    return this.marca;
  }

  public set $marca(value: Marca) {
    this.marca = value;
  }
}
