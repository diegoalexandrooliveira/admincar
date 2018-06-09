import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SiteComponent } from "./site.component";
import { Routes, RouterModule } from "@angular/router";
import { PrincipalComponent } from "./principal/principal.component";
import { VeiculosComponent } from "./veiculos/veiculos.component";
import { ContatoComponent } from "./contato/contato.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

const rotas: Routes = [
  {
    path: "",
    component: SiteComponent,
    children: [
      {
        path: "veiculos",
        component: VeiculosComponent
      },
      {
        path: "contato",
        component: ContatoComponent
      },
      {
        path: "**",
        component: PrincipalComponent
      }
    ]
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(rotas), NgbModule.forRoot()],
  declarations: [
    SiteComponent,
    PrincipalComponent,
    VeiculosComponent,
    ContatoComponent
  ],
  bootstrap: [SiteComponent]
})
export class SiteModule {}
