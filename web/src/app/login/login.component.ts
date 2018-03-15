import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "../models/usuario.model";
import { LoginService } from "./login.service";
import { Mensagem } from "../models/mensagem.model";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Input() usuario: Usuario;
  public mensagens: Mensagem[];

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.usuario = new Usuario();
    this.loginService.estaAutenticado().subscribe(
      autenticado => {
        if (autenticado) {
          this.router.navigate(["/app/dashboard"]);
        }
      },
      erro => {}
    );
  }

  public autenticar(event: Event): void {
    event.preventDefault();
    this.mensagens = [];
    this.loginService
      .autenticar(this.usuario)
      .subscribe(
        () => this.router.navigate(["/app/dashboard"]),
        (erros: Mensagem[]) => (this.mensagens = erros)
      );
  }
}
