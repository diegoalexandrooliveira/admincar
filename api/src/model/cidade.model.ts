import { Estado } from ".";

export class Cidade {
  private id: number;
  private nome: string;
  private estado_id: number;

  public get $id(): number {
    return this.id;
  }
  public set $id(id: number) {
    this.id = id;
  }

  public get $nome(): string {
    return this.nome;
  }
  public set $nome(nome: string) {
    this.nome = nome;
  }

  public get $estado_id(): number {
    return this.estado_id;
  }

  public set $estado_id(value: number) {
    this.estado_id = value;
  }
}
