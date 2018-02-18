import { Mensagem, Cidade, Cor } from "./index";
import { CidadeDAO, ModeloDAO, CorDAO, CombustivelDAO } from "../dao";
export class Veiculo {
  constructor() {}
  private id: number;
  private idModelo: number;
  private descricaoModelo: string;
  private idMarca: number;
  private descricaoMarca: string;
  private anoFabricacao: number;
  private anoModelo: number;
  private placa: string;
  private renavam: string;
  private chassi: string;
  private idCor: number;
  private descricaoCor: string;
  private idCidade: number;
  private nomeCidade: string;
  private idEstado: number;
  private nomeEstado: string;
  private siglaEstado: string;
  private dataInclusao: Date;
  private dataAquisicao: Date;
  private dataVenda: Date;
  private valorCompra: number;
  private valorVenda: number;
  private valorAnuncio: number;
  private observacoes: string;
  private idCombustivel: number;
  private descricaoCombustivel: string;

  public get $id(): number {
    return this.id;
  }

  public set $id(value: number) {
    this.id = value;
  }

  public get $idModelo(): number {
    return this.idModelo;
  }

  public set $idModelo(value: number) {
    this.idModelo = value;
  }

  public get $descricaoModelo(): string {
    return this.descricaoModelo;
  }

  public set $descricaoModelo(value: string) {
    this.descricaoModelo = value;
  }

  public get $idMarca(): number {
    return this.idMarca;
  }

  public set $idMarca(value: number) {
    this.idMarca = value;
  }

  public get $descricaoMarca(): string {
    return this.descricaoMarca;
  }

  public set $descricaoMarca(value: string) {
    this.descricaoMarca = value;
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

  public get $idCor(): number {
    return this.idCor;
  }

  public set $idCor(value: number) {
    this.idCor = value;
  }

  public get $descricaoCor(): string {
    return this.descricaoCor;
  }

  public set $descricaoCor(value: string) {
    this.descricaoCor = value;
  }

  public get $idCidade(): number {
    return this.idCidade;
  }

  public set $idCidade(value: number) {
    this.idCidade = value;
  }

  public get $nomeCidade(): string {
    return this.nomeCidade;
  }

  public set $nomeCidade(value: string) {
    this.nomeCidade = value;
  }

  public get $idEstado(): number {
    return this.idEstado;
  }

  public set $idEstado(value: number) {
    this.idEstado = value;
  }

  public get $nomeEstado(): string {
    return this.nomeEstado;
  }

  public set $nomeEstado(value: string) {
    this.nomeEstado = value;
  }

  public get $siglaEstado(): string {
    return this.siglaEstado;
  }

  public set $siglaEstado(value: string) {
    this.siglaEstado = value;
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

  public get $idCombustivel(): number {
    return this.idCombustivel;
  }

  public set $idCombustivel(value: number) {
    this.idCombustivel = value;
  }

  public get $descricaoCombustivel(): string {
    return this.descricaoCombustivel;
  }

  public set $descricaoCombustivel(value: string) {
    this.descricaoCombustivel = value;
  }

  public async validarVeiculo(ehInsercao: boolean) {
    let erros: Mensagem[] = [];
    if (!ehInsercao && !this.$id) {
      erros.push(
        new Mensagem("Identificador do veículo não informado.", "erro")
      );
    }
    if (!this.$idModelo) {
      erros.push(new Mensagem("É obrigatório informar um modelo.", "erro"));
    } else {
      let modelo = await ModeloDAO.buscarModeloPorId(this.$idModelo);
      if (!modelo) {
        erros.push(new Mensagem("Modelo informado não cadastrado.", "erro"));
      }
    }

    if (!this.$anoFabricacao) {
      erros.push(
        new Mensagem("É obrigatório informar o ano de fabricação.", "erro")
      );
    }

    if (!this.$anoModelo) {
      erros.push(
        new Mensagem("É obrigatório informar o ano do modelo.", "erro")
      );
    }

    if (this.$idCidade) {
      let cidade: Cidade = await CidadeDAO.buscaCidadePorId(this.$idCidade);
      if (!cidade) {
        erros.push(
          new Mensagem(
            `Cidade informada (${this.$idCidade}) não cadastrada.`,
            "erro"
          )
        );
      }
    }

    if (!this.$valorAnuncio || this.$valorAnuncio <= 0) {
      erros.push(
        new Mensagem("É obrigatório informar um valor para anuncio.", "erro")
      );
    }

    if (this.$valorCompra && this.$valorCompra <= 0) {
      erros.push(new Mensagem("Valor de compra inválido.", "erro"));
    }

    if (this.$valorVenda && this.$valorVenda <= 0) {
      erros.push(new Mensagem("Valor de venda inválido.", "erro"));
    }

    if (!this.$idCor) {
      erros.push(new Mensagem("É obrigatório informar uma cor.", "erro"));
    } else {
      let cor: Cor = await CorDAO.buscaCorPorId(this.$idCor);
      if (!cor) {
        erros.push(
          new Mensagem(`Cor informada (${this.$idCor}) não cadastrada.`, "erro")
        );
      }
    }

    if (this.$idCombustivel) {
      let combustivel = await CombustivelDAO.buscaCombustivelPorId(
        this.$idCombustivel
      );
      if (!combustivel) {
        erros.push(
          new Mensagem(
            `Combustível informado (${this.$idCombustivel}) não cadastrado.`,
            "erro"
          )
        );
      }
    }
    return erros;
  }

  public bodyParaModel(body: Object): void {
    let instanciaObj = this;
    let atributos = Object.keys(body);
    atributos.forEach((atributo: string) => {
      if (typeof instanciaObj[atributo] !== "function") {
        instanciaObj[atributo] = body[atributo];
      }
    });
  }
}
