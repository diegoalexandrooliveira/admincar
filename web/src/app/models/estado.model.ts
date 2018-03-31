export class Estado {
  private id: number;
  private nome: string;
  private sigla: string;

  constructor(id?: number, nome?: string, sigla?: string) {
    this.id = id;
    this.nome = nome;
    this.sigla = sigla;
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

  public get $sigla() {
    return this.sigla;
  }
  public set $sigla(sigla: string) {
    this.sigla = sigla;
  }
}
