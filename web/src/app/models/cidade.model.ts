import { Estado } from "./estado.model";
export class Cidade {
  private id: number;
  private nome: string;
  private estado: Estado;

  constructor(id?: number, nome?: string, estado?: Estado) {
    this.id = id;
    this.nome = nome;
    this.estado = estado;
  }

  public get $id() {
    return this.id;
  }
  public set $id(id: number) {
    this.id = id;
  }

  public get $nome() {
    return this.nome;
  }
  public set $nome(nome: string) {
    this.nome = nome;
  }

  public get $estado() {
    return this.estado;
  }

  public set $estado(estado: Estado) {
    this.estado = estado;
  }
}
