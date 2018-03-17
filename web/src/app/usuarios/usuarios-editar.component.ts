import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { UsuarioService } from "./usuario.service";
import { Mensagem } from "../models/mensagem.model";
import { Usuario } from "../models/usuario.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import {
  DataShared,
  DataShareService,
  DataOrigin
} from "../data-share.service";

@Component({
  selector: "app-usuarios-editar",
  templateUrl: "./usuarios-editar.component.html",
  styleUrls: ["./usuarios-editar.component.css"]
})
export class UsuariosEditarComponent
  implements AfterViewInit, OnInit, OnDestroy {
  public mensagens: Mensagem[];
  public titulo: string;
  private usuario: Usuario = new Usuario();
  private edicao: boolean = false;
  @ViewChild("fieldUsuario") private fieldUsuario: ElementRef;
  @ViewChild("fieldSenha") private fieldSenha: ElementRef;
  private sub: Subscription;
  constructor(
    private service: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private mensagensShare: DataShareService
  ) {}

  ngAfterViewInit() {
    this.fieldSenha.nativeElement.removeAttribute("readonly");
    if (!this.edicao) {
      setTimeout(() => {
        this.fieldUsuario.nativeElement.removeAttribute("readonly");
      }, 700);
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      let nomeUsuario = params["usuario"];
      if (nomeUsuario) {
        this.edicao = true;
        this.titulo = `Editar ${nomeUsuario}`;
        this.usuario.nome = nomeUsuario;
        this.usuario.senha = "";
      } else {
        this.titulo = "Adicionar usuário";
        this.edicao = false;
        this.usuario.nome = "";
        this.usuario.senha = "";
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public salvar(): void {
    let acao: Function;
    if (this.edicao) {
      acao = this.service.alterarUsuario.bind(this.service);
    } else {
      acao = this.service.incluirUsuario.bind(this.service);
    }

    acao(this.usuario).subscribe(observable => {
      if (observable["error"]) {
        this.mensagens = observable["error"];
      } else {
        if (this.edicao) {
          this.mensagens = Array.of(
            new Mensagem(
              `Usuário ${this.usuario.nome} alterado com sucesso.`,
              "success"
            )
          );
          this.usuario.senha = "";
        } else {
          let mensagem: DataShared = {
            origin: DataOrigin.USUARIOS_EDITAR,
            data: Array.of(
              new Mensagem(
                `Usuário ${this.usuario.nome} incluído com sucesso.`,
                "success"
              )
            )
          };
          this.mensagensShare.shareData(mensagem);
          this.router.navigate(["/app/usuarios"]);
        }
      }
    });
  }
}
