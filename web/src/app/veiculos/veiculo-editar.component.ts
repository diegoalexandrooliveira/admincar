import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Veiculo } from "../models/veiculo.model";
import { Mensagem } from "../models/mensagem.model";
import { VeiculosService } from "../veiculos.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  DataShareService,
  DataShared,
  DataOrigin
} from "../data-share.service";
import { TipoVeiculo } from "../models/tipo-veiculo.model";
import { Modelo } from "../models/modelo.model";
import { Marca } from "../models/marca.model";
import {
  NgbTypeahead,
  NgbDatepickerI18n,
  NgbDateAdapter,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Cor } from "../models/cor.model";
import { Combustivel } from "../models/combustivel.model";
import { Estado } from "../models/estado.model";
import { Cidade } from "../models/cidade.model";
import { I18n } from "../utils/i18n";
import { DatePickeri18n } from "../utils/DatePickeri18n";
import { DateAdapter, DateFormatter } from "../utils/DateAdapter";
import { AnexoVeiculo } from "../models/anexo-veiculo.model";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-veiculo-editar",
  templateUrl: "./veiculo-editar.component.html",
  styleUrls: ["./veiculo-editar.component.css"],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: DatePickeri18n },
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbDateParserFormatter, useClass: DateFormatter }
  ]
})
export class VeiculoEditarComponent implements OnInit {
  public veiculo: Veiculo;
  public mensagens: Mensagem[];
  public carregando: boolean = false;
  public edicao: boolean;
  public titulo: string;
  public tiposVeiculo: TipoVeiculo[];
  public marcas: Marca[] = [];
  public modelos: Modelo[] = [];
  public cores: Cor[] = [];
  public combustiveis: Combustivel[] = [];
  public estados: Estado[] = [];
  public cidades: Cidade[] = [];
  @ViewChild("anexoInput") anexosInput: ElementRef;
  public anexosVeiculo: AnexoVeiculo[];
  public uploadEmAndamento: boolean = false;
  constructor(
    private service: VeiculosService,
    private route: ActivatedRoute,
    private dataShareService: DataShareService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.anexosInput.nativeElement.addEventListener(
      "change",
      this.escolheuArquivo.bind(this)
    );
    this.carregando = true;
    this.veiculo = new Veiculo();
    this.veiculo.$modelo = new Modelo();
    this.veiculo.$modelo.$marca = new Marca();
    this.veiculo.$modelo.$marca.$tipoVeiculo = new TipoVeiculo();
    this.veiculo.$cor = new Cor();
    this.veiculo.$combustivel = new Combustivel();
    this.veiculo.$cidade = new Cidade();
    this.veiculo.$cidade.$estado = new Estado();
    this.route.params.subscribe((params: Params) => {
      let idVeiculo = params["id"];
      let promises: Array<Promise<any>> = [];
      promises.push(this.service.buscarTiposVeiculo());
      promises.push(this.service.buscarCores());
      promises.push(this.service.buscarCombustiveis());
      promises.push(this.service.buscarEstados());
      if (idVeiculo) {
        this.edicao = true;
        promises.push(this.service.recuperarVeiculoPorId(idVeiculo));
      } else {
        this.titulo = "Adicionar um veículo";
        this.edicao = false;
        this.anexosVeiculo = [];
      }
      Promise.all(promises)
        .then(value => {
          this.tiposVeiculo = value[0];
          this.cores = value[1];
          this.combustiveis = value[2];
          this.estados = value[3];
          if (this.edicao) {
            let veiculoRecuperado = value[4];
            promises = [];
            promises.push(
              this.service.buscarMarcasPorTipoVeiculo(
                veiculoRecuperado["modelo"]["marca"]["tipoVeiculo"]["id"]
              )
            );
            promises.push(
              this.service.buscarModelosPorMarca(
                veiculoRecuperado["modelo"]["marca"]["id"]
              )
            );
            promises.push(
              this.service.buscarCidades(
                veiculoRecuperado["cidade"]["estado"]["id"]
              )
            );
            this.titulo = `Editar ${veiculoRecuperado.modelo.marca.descricao}/${
              veiculoRecuperado.modelo.descricao
            } ${veiculoRecuperado.anoFabricacao.toString()}/${veiculoRecuperado.anoModelo.toString()}`;
            Promise.all(promises)
              .then(value2 => {
                this.marcas = value2[0];
                this.modelos = value2[1];
                this.cidades = value2[2];
                this.veiculo = veiculoRecuperado;
                this.anexosVeiculo = this.veiculo.$anexos;
                if (!this.veiculo.$cidade) {
                  this.veiculo.$cidade = new Cidade();
                  this.veiculo.$cidade.$estado = new Estado();
                }
                if (!this.veiculo.$combustivel) {
                  this.veiculo.$combustivel = new Combustivel();
                }
                this.carregando = false;
              })
              .catch(this.erroBackEnd.bind(this));
          } else {
            this.carregando = false;
          }
        })
        .catch(this.erroBackEnd.bind(this));
    });
  }

  public selecionouTipoVeiculo() {
    this.marcas = [];
    this.modelos = [];
    this.carregando = true;
    this.service
      .buscarMarcasPorTipoVeiculo(this.veiculo.$modelo.$marca.$tipoVeiculo.$id)
      .then((marcas: Marca[]) => {
        this.veiculo.$modelo = new Modelo(
          null,
          null,
          new Marca(
            null,
            null,
            new TipoVeiculo(this.veiculo.$modelo.$marca.$tipoVeiculo.$id)
          )
        );
        this.marcas = marcas;
        this.carregando = false;
      })
      .catch(this.erroBackEnd.bind(this));
  }

  public selecionouMarca() {
    this.carregando = true;
    this.modelos = [];
    this.service
      .buscarModelosPorMarca(this.veiculo.$modelo.$marca.$id)
      .then((modelos: Modelo[]) => {
        this.veiculo.$modelo = new Modelo(
          null,
          null,
          new Marca(
            this.veiculo.$modelo.$marca.$id,
            null,
            new TipoVeiculo(this.veiculo.$modelo.$marca.$tipoVeiculo.$id)
          )
        );
        this.modelos = modelos;
        this.carregando = false;
      })
      .catch(this.erroBackEnd.bind(this));
  }

  public selecionouEstado() {
    this.carregando = true;
    this.cidades = [];
    this.service
      .buscarCidades(this.veiculo.$cidade.$estado.$id)
      .then((cidades: Cidade[]) => {
        this.veiculo.$cidade = new Cidade(
          null,
          null,
          new Estado(this.veiculo.$cidade.$estado.$id)
        );
        this.cidades = cidades;
        this.carregando = false;
      })
      .catch(this.erroBackEnd.bind(this));
  }

  private erroBackEnd(error) {
    console.log(error);
    this.carregando = false;
    this.mensagens = Array.of(
      new Mensagem(
        "Problemas ao comunicar-se com o servidor. Tente novamente mais tarde.",
        "erro"
      )
    );
  }

  public salvar(): void {
    let acao: Function;
    if (this.edicao) {
      acao = this.service.atualizarVeiculo.bind(this.service);
    } else {
      acao = this.service.incluirVeiculo.bind(this.service);
    }

    this.carregando = true;
    let idVeiculo = this.veiculo.$id;
    let anexosAlterados: AnexoVeiculo[] = [];
    let anexosIncluidos: AnexoVeiculo[] = [];
    this.anexosVeiculo.forEach(anexo => {
      if (anexo.$file) {
        anexosIncluidos.push(anexo);
      } else {
        anexosAlterados.push(anexo);
      }
    });

    acao(this.veiculo)
      .then(retorno => {
        if (retorno["erros"]) {
          throw retorno["erros"];
        }
        return retorno["id"];
      })
      .then(retorno => {
        idVeiculo = retorno;

        if (this.edicao) {
          return this.service.atualizarAnexo(anexosAlterados);
        } else {
          anexosIncluidos = anexosIncluidos.map(anexo => {
            anexo.$veiculoId = idVeiculo;
            return anexo;
          });
        }
        return;
      })
      .then(() => this.subirImagens(anexosIncluidos))
      .then(anexos => {
        if (anexos.length) {
          this.uploadEmAndamento = false;
          this.anexosVeiculo = this.anexosVeiculo.filter(anexo => !anexo.$file);
          anexos.forEach(value => {
            this.anexosVeiculo.push(
              new AnexoVeiculo(
                value.id,
                value.url,
                value.principal,
                value.tipoArquivo,
                value.veiculoId
              )
            );
          });
        }
        return;
      })
      .then(() => {
        this.carregando = false;
        if (this.edicao) {
          this.mensagens = Array.of(
            new Mensagem(`Veículo alterado com sucesso.`, "success")
          );
        } else {
          let mensagem: DataShared = {
            origin: DataOrigin.VEICULOS_EDITAR,
            data: Array.of(
              new Mensagem(
                `Veículo ${idVeiculo} incluído com sucesso.`,
                "success"
              )
            )
          };
          this.dataShareService.shareData(mensagem);
          this.router.navigate(["/app/veiculos"]);
        }
      })
      .catch(erro => {
        this.mensagens = erro;
        this.carregando = false;
      });
  }

  private escolheuArquivo() {
    let imagens = this.anexosInput.nativeElement.files;
    for (let index = 0; index < imagens.length; index++) {
      this.anexosVeiculo.push(
        new AnexoVeiculo(
          Math.random(),
          window.URL.createObjectURL(imagens[index]),
          false,
          1,
          this.veiculo.$id,
          imagens[index]
        )
      );
    }
    imagens = [];
  }

  private subirImagens(anexos: AnexoVeiculo[]) {
    let promises: Promise<AnexoVeiculo>[] = [];
    promises = anexos.map((anexo: AnexoVeiculo) =>
      this.service.subirAnexo(anexo)
    );
    if (promises.length) {
      this.uploadEmAndamento = true;
    }
    return Promise.all(promises);
  }

  public sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public marcarComoPrincipal(id: number, principal: boolean) {
    if (principal) {
      return;
    }
    for (let index = 0; index < this.anexosVeiculo.length; index++) {
      this.anexosVeiculo[index].$principal =
        this.anexosVeiculo[index].$id == id;
    }
  }

  public alterarPrivacidade(id: number, tipoArquivo: number) {
    console.log(id);
    console.log(tipoArquivo);
    console.log(this.anexosVeiculo);

    tipoArquivo = tipoArquivo ? 0 : 1;
    let index = this.anexosVeiculo.findIndex(value => value.$id == id);
    this.anexosVeiculo[index].$tipoArquivo = tipoArquivo;
  }
}
