import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../login/login.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}
  canActivate(): Observable<boolean> {
    return this.loginService.estaAutenticado().map((retorno: boolean) => {
      if (!retorno) {
        this.router.navigate(["app/login"]);
      }
      return retorno;
    });
  }
}
