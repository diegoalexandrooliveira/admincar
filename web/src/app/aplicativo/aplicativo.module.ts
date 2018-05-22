import { NgModule } from "@angular/core";
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
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
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
import { VeiculosListaComponent } from "./veiculos/veiculos-lista.component";
import { VeiculoEditarComponent } from "./veiculos/veiculo-editar.component";
import { VeiculosPipe } from "./veiculos/veiculos.pipe";
import { VeiculosService } from "./veiculos.service";
import { CurrencyMaskModule } from "ng2-currency-mask";
import localePt from "@angular/common/locales/pt";
import { registerLocaleData, CommonModule } from "@angular/common";
import { LoadingComponent } from "./loading/loading.component";
import { DropdownTypeaheadComponent } from "./dropdown-typeahead/dropdown-typeahead.component";
import { HttpService } from "./http.service";
import { ProgressHttpModule } from "angular-progress-http";
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { aplicativoRotas } from "./aplicativo.routes";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(aplicativoRotas),
    HttpModule,
    FormsModule,
    ChartsModule,
    CurrencyMaskModule,
    NgbModule.forRoot(),
    ProgressHttpModule,
    TagInputModule
    // ,
    // BrowserAnimationsModule
  ],
  declarations: [
    LoginComponent,
    MensagensComponent,
    DashboardComponent,
    LoginLayoutComponent,
    AppLayoutComponent,
    MenuComponent,
    UsuariosListaComponent,
    UsuariosEditarComponent,
    BotaoExcluirComponent,
    VeiculosListaComponent,
    VeiculoEditarComponent,
    VeiculosPipe,
    LoadingComponent,
    DropdownTypeaheadComponent
  ],
  providers: [
    LoginService,
    AuthGuardService,
    DashboardService,
    GraphqlService,
    UsuarioService,
    DataShareService,
    VeiculosService,
    HttpService
  ]
})
export class AplicativoModule {}

registerLocaleData(localePt);
