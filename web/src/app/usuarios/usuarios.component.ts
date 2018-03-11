import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "./usuario.service";
import { Mensagem } from "../models/mensagem.model";
import { Usuario } from "../models/usuario.model";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  public usuarios: Usuario[];
  public mensagens: Mensagem[];
  constructor(private service: UsuarioService) {}

  ngOnInit() {
    this.recuperarUsuarios();
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
