import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { routing } from "./app.routes";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, routing, HttpModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
