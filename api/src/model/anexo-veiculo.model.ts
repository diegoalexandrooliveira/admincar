export class AnexoVeiculo {
  private id: number;
  private tipoArquivo: number;
  private url: string;
  private principal: boolean;
  private veiculoId: number;
  private object_key: string;

  constructor(
    id?: number,
    tipoArquivo?: number,
    url?: string,
    principal?: boolean,
    veiculoId?: number,
    object_key?: string
  ) {
    this.id = id;
    this.tipoArquivo = tipoArquivo;
    this.url = url;
    this.principal = principal;
    this.veiculoId = veiculoId;
    this.object_key = object_key;
  }

  public get $id() {
    return this.id;
  }
  public set $id(id: number) {
    this.id = id;
  }

  public get $tipoArquivo() {
    return this.tipoArquivo;
  }
  public set $tipoArquivo(tipoArquivo: number) {
    this.tipoArquivo = tipoArquivo;
  }

  public get $url() {
    return this.url;
  }
  public set $url(url: string) {
    this.url = url;
  }

  public get $principal() {
    return this.principal;
  }
  public set $principal(principal: boolean) {
    this.principal = principal;
  }

  public get $veiculoId() {
    return this.veiculoId;
  }
  public set $veiculoId(veiculoId: number) {
    this.veiculoId = veiculoId;
  }

  public get $object_key() {
    return this.object_key;
  }
  public set $object_key(object_key: string) {
    this.object_key = object_key;
  }
}
