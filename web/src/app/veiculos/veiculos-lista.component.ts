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
  private ngUnsub: Subscription = new Subscription();
  constructor(
    private service: VeiculosService,
    private route: ActivatedRoute,
    private dataShareService: DataShareService
  ) {}

  ngOnInit() {
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
    this.service.recuperarTodosList(situacao).subscribe(
      (valores: Veiculo[]) => {
        this.veiculos = valores;
        this.ngUnsub.add(
          this.dataShareService.dataObservable.subscribe(
            (mensagem: DataShared) => {
              if (mensagem && mensagem.origin === DataOrigin.VEICULOS_EDITAR) {
                this.mensagens = mensagem.data;
                this.dataShareService.limparMensagens();
              }
            }
          )
        );
      },
      error => {
        console.log(error);
      }
    );
  }
  // public excluirUsuario(nome: string) {
  //   this.ngUnsub.add(
  //     this.service.excluirUsuario(nome).subscribe(mensagensErro => {
  //       if (mensagensErro) {
  //         this.mensagens = mensagensErro;
  //       } else {
  //         this.mensagens = Array.of(
  //           new Mensagem(`Usuário ${nome} excluído com sucesso.`, "success")
  //         );
  //       }
  //       this.recuperarVeiculos();
  //     })
  //   );
  // }
}
