import { TipoVeiculo, Modelo } from ".";

export class Marca {
  private id: number;
  private descricao: string;
  private tipo_veiculo_id: number;

  constructor(id?: number, descricao?: string, tipo_veiculo_id?: number) {
    this.id = id;
    this.descricao = descricao;
    this.tipo_veiculo_id = tipo_veiculo_id;
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

  public get $tipo_veiculo_id(): number {
    return this.tipo_veiculo_id;
  }

  public set $tipo_veiculo_id(value: number) {
    this.tipo_veiculo_id = value;
  }
}
