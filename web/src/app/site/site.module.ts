import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SiteComponent } from "./site.component";
import { Routes, RouterModule } from "@angular/router";
import { PrincipalComponent } from "./principal/principal.component";
import { VeiculosComponent } from "./veiculos/veiculos.component";
import {VeiculosVisualizarComponent} from "./veiculos/visualizar/veiculos.visualizar.component";
import { ContatoComponent } from "./contato/contato.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {GraphqlService} from "./graphql.service";
import {VeiculosService} from "./veiculos.service";
import { HttpModule } from "@angular/http";
import "rxjs/add/operator/map";

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
        path: "veiculos/:id",
        component: VeiculosVisualizarComponent
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
  imports: [CommonModule, 
    HttpModule, 
    RouterModule.forChild(rotas), 
    NgbModule.forRoot()],
  declarations: [
    SiteComponent,
    PrincipalComponent,
    VeiculosComponent,
    ContatoComponent,
    VeiculosVisualizarComponent
  ],
  bootstrap: [SiteComponent],
  providers: [   
    GraphqlService,   
    VeiculosService
  ]
})
export class SiteModule {}
