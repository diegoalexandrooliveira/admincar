import { Component, OnInit } from "@angular/core";
import { Veiculo } from "../models/veiculo.model";
import { Mensagem } from "../models/mensagem.model";
import { Subscription } from "rxjs/Subscription";
import { VeiculosService } from "../veiculos.service";
import { ActivatedRoute } from "@angular/router";
import {
  DataShareService,
  DataShared,
  DataOrigin
} from "../data-share.service";

@Component({
  selector: "app-veiculos-lista",
  templateUrl: "./veiculos-lista.component.html",
  styleUrls: ["./veiculos-lista.component.css"]
})
export class VeiculosListaComponent implements OnInit {
  public veiculos: Veiculo[];
  public mensagens: Mensagem[];
  private situacaoVendidos: string = "vendidos";
  private situacaoDisponiveis: string = "disponiveis";
  private situacaoTodos: string = "todos";
  private situacaoEscolhida: string;
  public carregando: boolean = false;
  private ngUnsub: Subscription = new Subscription();
  private onInit: Boolean = false;
  public textoProcurar: string;
  constructor(
    private service: VeiculosService,
    private route: ActivatedRoute,
    private dataShareService: DataShareService
  ) {}

  ngOnInit() {
    this.onInit = true;
    this.recuperarVeiculos(this.situacaoDisponiveis);
  }

  ngOnDestroy() {
    this.ngUnsub.unsubscribe();
  }

  public vendidos() {
    this.recuperarVeiculos(this.situacaoVendidos);
  }

  public todos() {
    this.recuperarVeiculos(this.situacaoTodos);
  }

  public disponiveis() {
    this.recuperarVeiculos(this.situacaoDisponiveis);
  }

  private recuperarVeiculos(situacao: string) {
    this.situacaoEscolhida = situacao;
    this.carregando = true;
    this.service
      .recuperarTodosList(situacao)
      .then((valores: Veiculo[]) => {
        this.veiculos = valores;
        if (this.onInit) {
          this.onInit = false;
          this.ngUnsub.add(
            this.dataShareService.dataObservable.subscribe(
              (mensagem: DataShared) => {
                if (
                  mensagem &&
                  mensagem.origin === DataOrigin.VEICULOS_EDITAR
                ) {
                  this.mensagens = mensagem.data;
                  this.dataShareService.limparMensagens();
                }
              }
            )
          );
        }
        this.carregando = false;
      })
      .catch(error => {
        console.log(error);
        this.carregando = false;
        this.mensagens = Array.of(
          new Mensagem(
            "Problemas ao recuperar os dados. Tente novamente mais tarde.",
            "erro"
          )
        );
      });
  }
  public excluirVeiculo(id: number) {
    this.carregando = true;
    this.service
      .excluirVeiculo(id)
      .then(mensagensErro => {
        if (mensagensErro) {
          this.mensagens = mensagensErro;
        } else {
          this.mensagens = Array.of(
            new Mensagem(`Veículo ${id} excluído com sucesso.`, "success")
          );
        }
        this.carregando = false;
        this.recuperarVeiculos(this.situacaoEscolhida);
      })
      .catch(error => {
        console.log(error);
        this.carregando = false;
        this.mensagens = Array.of(
          new Mensagem(
            "Problemas ao excluir o veículo. Tente novamente mais tarde.",
            "erro"
          )
        );
      });
  }
}
