import { TipoVeiculo, Modelo } from ".";

export class Marca {
  private id: number;
  private descricao: string;
  private tipoVeiculo: TipoVeiculo;
  private modelos: Modelo[];

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

  public get $tipoVeiculo(): TipoVeiculo {
    return this.tipoVeiculo;
  }

  public set $tipoVeiculo(value: TipoVeiculo) {
    this.tipoVeiculo = value;
  }

  public get $modelos(): Modelo[] {
    return this.modelos;
  }

  public set $modelos(value: Modelo[]) {
    this.modelos = value;
  }
}
