import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SiteComponent } from "./site.component";
import { Routes, RouterModule } from "@angular/router";

const rotas: Routes = [
  { path: "", pathMatch: "full", component: SiteComponent }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(rotas)],
  declarations: [SiteComponent]
})
export class SiteModule {}
