import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { routing } from "./app.routes";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { MensagensComponent } from "./mensagens/mensagens.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginService } from "./login.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/of";
import "rxjs/add/observable/defer";
import { AuthGuardService } from "./auth.guard.service";
import { LoginLayoutComponent } from "./layouts/login.layout.component";
import { AppLayoutComponent } from "./layouts/app.layout.component";
import { MenuComponent } from "./menu/menu.component";
import { ChartsModule } from "ng2-charts";
import { DashboardService } from "./dashboard.service";
import { UsuariosListaComponent } from "./usuarios/usuarios-lista.component";
import { GraphqlService } from "./graphql.service";
import { UsuarioService } from "./usuario.service";
import { BotaoExcluirComponent } from "./botao-excluir/botao-excluir.component";
import { UsuariosEditarComponent } from "./usuarios/usuarios-editar.component";
import { RouterModule } from "@angular/router";
import { DataShareService } from "./data-share.service";
import { VeiculosComponent } from "./veiculos/veiculos.component";
import { VeiculosService } from "./veiculos.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MensagensComponent,
    DashboardComponent,
    LoginLayoutComponent,
    AppLayoutComponent,
    MenuComponent,
    UsuariosListaComponent,
    UsuariosEditarComponent,
    BotaoExcluirComponent,
    VeiculosComponent
  ],
  imports: [BrowserModule, routing, HttpModule, FormsModule, ChartsModule],
  bootstrap: [AppComponent],
  providers: [
    LoginService,
    AuthGuardService,
    DashboardService,
    GraphqlService,
    UsuarioService,
    DataShareService,
    VeiculosService
  ]
})
export class AppModule {}
