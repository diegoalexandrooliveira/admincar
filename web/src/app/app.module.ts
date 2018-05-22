import { BrowserModule } from "@angular/platform-browser";
import { routing } from "./app.routes";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, routing, BrowserAnimationsModule],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
