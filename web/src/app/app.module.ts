import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { routing } from "./app.routes";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, routing],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
