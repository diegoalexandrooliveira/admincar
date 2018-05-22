export class Cor {
  private id: number;
  private descricao: string;

  constructor(id?: number, descricao?: string) {
    this.id = id;
    this.descricao = descricao;
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
}
