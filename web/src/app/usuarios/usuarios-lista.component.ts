import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  AfterContentInit,
  AfterViewChecked
} from "@angular/core";
import { UsuarioService } from "./usuario.service";
import { Mensagem } from "../models/mensagem.model";
import { Usuario } from "../models/usuario.model";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-usuarios-lista",
  templateUrl: "./usuarios-lista.component.html",
  styleUrls: ["./usuarios-lista.component.css"]
})
export class UsuariosListaComponent implements OnInit, OnDestroy {
  public usuarios: Usuario[];
  public mensagens: Mensagem[];
  private sub: Subscription;
  constructor(private service: UsuarioService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.recuperarUsuarios();
    setTimeout(() => {
      this.sub = this.route.queryParams.subscribe(params => {
        if (params["inserido"])
          this.mensagens = Array.of(
            new Mensagem(
              `Usuário ${params["inserido"]} incluído com sucesso.`,
              "success"
            )
          );
      });
    }, 500);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  private recuperarUsuarios() {
    this.service.recuperarTodos().subscribe(
      (valores: Usuario[]) => {
        this.usuarios = valores;
      },
      error => {
        console.log(error);
      }
    );
  }
  public excluirUsuario(nome: string) {
    this.service.excluirUsuario(nome).subscribe(observable => {
      if (observable["error"]) {
        this.mensagens = observable["error"];
      } else {
        this.mensagens = Array.of(
          new Mensagem(`Usuário ${nome} excluído com sucesso.`, "success")
        );
      }
      this.recuperarUsuarios();
    });
  }
}
