import { Marca } from "./marca.model";

export class Modelo {
  private id: number;
  private descricao: string;
  private marca_id: number;

  constructor(id?: number, descricao?: string, marca_id?: number) {
    this.id = id;
    this.descricao = descricao;
    this.marca_id = marca_id;
  }

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

  public get $marca_id(): number {
    return this.marca_id;
  }

  public set $marca_id(value: number) {
    this.marca_id = value;
  }
}
