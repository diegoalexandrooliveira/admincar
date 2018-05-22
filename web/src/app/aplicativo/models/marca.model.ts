import { TipoVeiculo } from "./tipo-veiculo.model";

export class Marca {
  private id: number;
  private descricao: string;
  private tipoVeiculo: TipoVeiculo;

  constructor(id?: number, descricao?: string, tipoVeiculo?: TipoVeiculo) {
    this.id = id;
    this.descricao = descricao;
    this.tipoVeiculo = tipoVeiculo;
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

  public get $tipoVeiculo() {
    return this.tipoVeiculo;
  }
  public set $tipoVeiculo(tipoVeiculo: TipoVeiculo) {
    this.tipoVeiculo = tipoVeiculo;
  }
}
