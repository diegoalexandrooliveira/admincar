import { Mensagem, Cidade, Cor, Modelo, Combustivel } from "./index";
import { CidadeDAO, ModeloDAO, CorDAO, CombustivelDAO } from "../dao";
export class Veiculo {
  constructor(
    id?: number,
    modelo_id?: number,
    anoFabricacao?: number,
    anoModelo?: number,
    placa?: string,
    renavam?: string,
    chassi?: string,
    cor_id?: number,
    cidade_id?: number,
    dataInclusao?: Date,
    dataAquisicao?: Date,
    dataVenda?: Date,
    valorCompra?: number,
    valorVenda?: number,
    valorAnuncio?: number,
    observacoes?: string,
    combustivel_id?: number
  ) {
    this.id = id;
    this.modelo_id = modelo_id;
    this.anoFabricacao = anoFabricacao;
    this.anoModelo = anoModelo;
    this.placa = placa;
    this.renavam = renavam;
    this.chassi = chassi;
    this.cor_id = cor_id;
    this.cidade_id = cidade_id;
    this.dataInclusao = dataInclusao;
    this.dataAquisicao = dataAquisicao;
    this.dataVenda = dataVenda;
    this.valorCompra = valorCompra;
    this.valorVenda = valorVenda;
    this.valorAnuncio = valorAnuncio;
    this.observacoes = observacoes;
    this.combustivel_id = combustivel_id;
  }
  private id: number;
  private modelo_id: number;
  private anoFabricacao: number;
  private anoModelo: number;
  private placa: string;
  private renavam: string;
  private chassi: string;
  private cor_id: number;
  private cidade_id: number;
  private dataInclusao: Date;
  private dataAquisicao: Date;
  private dataVenda: Date;
  private valorCompra: number;
  private valorVenda: number;
  private valorAnuncio: number;
  private observacoes: string;
  private combustivel_id: number;

  public get $id(): number {
    return this.id;
  }

  public set $id(value: number) {
    this.id = value;
  }

  public get $anoFabricacao(): number {
    return this.anoFabricacao;
  }

  public set $anoFabricacao(value: number) {
    this.anoFabricacao = value;
  }

  public get $anoModelo(): number {
    return this.anoModelo;
  }

  public set $anoModelo(value: number) {
    this.anoModelo = value;
  }

  public get $placa(): string {
    return this.placa;
  }

  public set $placa(value: string) {
    this.placa = value;
  }

  public get $renavam(): string {
    return this.renavam;
  }

  public set $renavam(value: string) {
    this.renavam = value;
  }

  public get $chassi(): string {
    return this.chassi;
  }

  public set $chassi(value: string) {
    this.chassi = value;
  }

  public get $dataInclusao(): Date {
    return this.dataInclusao;
  }

  public set $dataInclusao(value: Date) {
    this.dataInclusao = value;
  }

  public get $dataAquisicao(): Date {
    return this.dataAquisicao;
  }

  public set $dataAquisicao(value: Date) {
    this.dataAquisicao = value;
  }

  public get $dataVenda(): Date {
    return this.dataVenda;
  }

  public set $dataVenda(value: Date) {
    this.dataVenda = value;
  }

  public get $valorCompra(): number {
    return this.valorCompra;
  }

  public set $valorCompra(value: number) {
    this.valorCompra = value;
  }

  public get $valorVenda(): number {
    return this.valorVenda;
  }

  public set $valorVenda(value: number) {
    this.valorVenda = value;
  }

  public get $valorAnuncio(): number {
    return this.valorAnuncio;
  }

  public set $valorAnuncio(value: number) {
    this.valorAnuncio = value;
  }

  public get $observacoes(): string {
    return this.observacoes;
  }

  public set $observacoes(value: string) {
    this.observacoes = value;
  }

  public get $modelo_id(): number {
    return this.modelo_id;
  }

  public set $modelo_id(value: number) {
    this.modelo_id = value;
  }

  public get $cor_id(): number {
    return this.cor_id;
  }

  public set $cor_id(value: number) {
    this.cor_id = value;
  }

  public get $cidade_id(): number {
    return this.cidade_id;
  }

  public set $cidade_id(value: number) {
    this.cidade_id = value;
  }

  public get $combustivel_id(): number {
    return this.combustivel_id;
  }

  public set $combustivel_id(value: number) {
    this.combustivel_id = value;
  }

  // public async validarVeiculo(ehInsercao: boolean) {
  //   let erros: Mensagem[] = [];
  //     if (!ehInsercao && !this.$id) {
  //       erros.push(
  //         new Mensagem("Identificador do veículo não informado.", "erro")
  //       );
  //     }
  //     if (!this.$idModelo) {
  //       erros.push(new Mensagem("É obrigatório informar um modelo.", "erro"));
  //     } else {
  //       let modelo = await ModeloDAO.buscarModeloPorId(this.$idModelo);
  //       if (!modelo) {
  //         erros.push(new Mensagem("Modelo informado não cadastrado.", "erro"));
  //       }
  //     }
  //     if (!this.$anoFabricacao) {
  //       erros.push(
  //         new Mensagem("É obrigatório informar o ano de fabricação.", "erro")
  //       );
  //     }
  //     if (!this.$anoModelo) {
  //       erros.push(
  //         new Mensagem("É obrigatório informar o ano do modelo.", "erro")
  //       );
  //     }
  //     if (this.$idCidade) {
  //       let cidade: Cidade = await CidadeDAO.buscaCidadePorId(this.$idCidade);
  //       if (!cidade) {
  //         erros.push(
  //           new Mensagem(
  //             `Cidade informada (${this.$idCidade}) não cadastrada.`,
  //             "erro"
  //           )
  //         );
  //       }
  //     }
  //     if (!this.$valorAnuncio || this.$valorAnuncio <= 0) {
  //       erros.push(
  //         new Mensagem("É obrigatório informar um valor para anuncio.", "erro")
  //       );
  //     }
  //     if (this.$valorCompra && this.$valorCompra <= 0) {
  //       erros.push(new Mensagem("Valor de compra inválido.", "erro"));
  //     }
  //     if (this.$valorVenda && this.$valorVenda <= 0) {
  //       erros.push(new Mensagem("Valor de venda inválido.", "erro"));
  //     }
  //     if (!this.$idCor) {
  //       erros.push(new Mensagem("É obrigatório informar uma cor.", "erro"));
  //     } else {
  //       let cor: Cor = await CorDAO.buscaCorPorId(this.$idCor);
  //       if (!cor) {
  //         erros.push(
  //           new Mensagem(`Cor informada (${this.$idCor}) não cadastrada.`, "erro")
  //         );
  //       }
  //     }
  //     if (this.$idCombustivel) {
  //       let combustivel = await CombustivelDAO.buscaCombustivelPorId(
  //         this.$idCombustivel
  //       );
  //       if (!combustivel) {
  //         erros.push(
  //           new Mensagem(
  //             `Combustível informado (${this.$idCombustivel}) não cadastrado.`,
  //             "erro"
  //           )
  //         );
  //       }
  //     }
  //   return erros;
  // }
  // public async validarExclusao(): Promise<Mensagem[]> {
  //   let erros: Mensagem[] = [];
  //   if (!this.$id) {
  //     erros.push(
  //       new Mensagem("Identificador do veículo não informado.", "erro")
  //     );
  //   }
  //   return erros;
  // }
}
