import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsuarioService } from "../usuario.service";
import { Mensagem } from "../models/mensagem.model";
import { Usuario } from "../models/usuario.model";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import {
  DataShared,
  DataShareService,
  DataOrigin
} from "../data-share.service";

@Component({
  selector: "app-usuarios-lista",
  templateUrl: "./usuarios-lista.component.html",
  styleUrls: ["./usuarios-lista.component.css"]
})
export class UsuariosListaComponent implements OnInit, OnDestroy {
  public usuarios: Usuario[];
  public mensagens: Mensagem[];
  public carregando: boolean = false;
  private ngUnsub: Subscription = new Subscription();
  constructor(
    private service: UsuarioService,
    private route: ActivatedRoute,
    private dataShareService: DataShareService
  ) {}

  ngOnInit() {
    this.recuperarUsuarios();
  }

  ngOnDestroy() {
    this.ngUnsub.unsubscribe();
  }

  private recuperarUsuarios() {
    this.carregando = true;
    this.service.recuperarTodos().subscribe(
      (valores: Usuario[]) => {
        this.usuarios = valores;
        this.ngUnsub.add(
          this.dataShareService.dataObservable.subscribe(
            (mensagem: DataShared) => {
              if (mensagem && mensagem.origin === DataOrigin.USUARIOS_EDITAR) {
                this.mensagens = mensagem.data;
                this.dataShareService.limparMensagens();
              }
            }
          )
        );
        this.carregando = false;
      },
      error => {
        console.log(error);
        this.carregando = false;
        this.mensagens = Array.of(
          new Mensagem(
            "Problemas ao recuperar os dados. Tente novamente mais tarde.",
            "erro"
          )
        );
      }
    );
  }
  public excluirUsuario(nome: string) {
    this.carregando = true;
    this.ngUnsub.add(
      this.service.excluirUsuario(nome).subscribe(mensagensErro => {
        if (mensagensErro) {
          this.mensagens = mensagensErro;
        } else {
          this.mensagens = Array.of(
            new Mensagem(`Usuário ${nome} excluído com sucesso.`, "success")
          );
        }
        this.carregando = false;
        this.recuperarUsuarios();
      })
    );
  }
}
