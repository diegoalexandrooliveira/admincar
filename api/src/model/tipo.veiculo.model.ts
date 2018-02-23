import { Marca } from ".";

export class TipoVeiculo {
  private id: number;
  private descricao: string;
  private marcas: Marca[];

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

  public get $marcas(): Marca[] {
    return this.marcas;
  }

  public set $marcas(value: Marca[]) {
    this.marcas = value;
  }
}
