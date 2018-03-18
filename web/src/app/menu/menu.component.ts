import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { LoginService } from "../login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit, AfterViewInit {
  public usuario: string;
  @ViewChild("menuCollapse") menu: ElementRef;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.usuario = this.loginService.pegarUsuario();
  }
  ngAfterViewInit(): void {
    if (
      window
        .getComputedStyle(document.getElementById("btnCollapse"))
        .getPropertyValue("display") == "none"
    ) {
      this.menu.nativeElement.removeAttribute("id");
    }
  }

  public logout(): void {
    this.loginService.excluirToken();
  }
}
