import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  public usuario: string;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.usuario = this.loginService.pegarUsuario();
  }

  public logout(): void {
    this.loginService.excluirToken();
  }
}
