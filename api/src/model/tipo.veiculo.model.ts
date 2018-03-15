import { Marca } from ".";

export class TipoVeiculo {
  private id: number;
  private descricao: string;

  constructor(id?: number, descricao?: string) {
    this.id = id;
    this.descricao = descricao;
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
}
