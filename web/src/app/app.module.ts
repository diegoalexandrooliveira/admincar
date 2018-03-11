import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { routing } from "./app.routes";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { MensagensComponent } from "./mensagens/mensagens.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginService } from "./login/login.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/of";
import { AuthGuardService } from "./guard/auth.guard.service";
import { LoginLayoutComponent } from "./layouts/login.layout.component";
import { AppLayoutComponent } from "./layouts/app.layout.component";
import { MenuComponent } from "./menu/menu.component";
import { ChartsModule } from "ng2-charts";
import { DashboardService } from "./dashboard/dashboard.service";
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GraphqlService } from './graphql.service';
import { UsuarioService } from './usuarios/usuario.service';
import { BotaoExcluirComponent } from './botao-excluir/botao-excluir.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MensagensComponent,
    DashboardComponent,
    LoginLayoutComponent,
    AppLayoutComponent,
    MenuComponent,
    UsuariosComponent,
    BotaoExcluirComponent
  ],
  imports: [BrowserModule, routing, HttpModule, FormsModule, ChartsModule],
  bootstrap: [AppComponent],
  providers: [LoginService, AuthGuardService, DashboardService, GraphqlService, UsuarioService]
})
export class AppModule {}
