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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MensagensComponent,
    DashboardComponent
  ],
  imports: [BrowserModule, routing, HttpModule, FormsModule],
  bootstrap: [AppComponent],
  providers: [LoginService]
})
export class AppModule {}
