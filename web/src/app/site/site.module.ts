import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SiteComponent } from "./site.component";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { VeiculosComponent } from "./veiculos/veiculos.component";
import { VeiculosVisualizarComponent } from "./veiculos/visualizar/veiculos.visualizar.component";
import { ContatoComponent } from "./contato/contato.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GraphqlService } from "./graphql.service";
import { VeiculosService } from "./veiculos.service";
import { HttpModule } from "@angular/http";
import "rxjs/add/operator/map";
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from "@angular/forms";
import { AgmCoreModule } from '@agm/core';

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
        component: InicioComponent
      }
    ]
  }
];
@NgModule({
  imports: [CommonModule,
    HttpModule,
    RouterModule.forChild(rotas),
    NgbModule.forRoot(), FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIkb1YDEpA9iAWHN0wfrFtyjAny0whyyA'
    })],
  declarations: [
    SiteComponent,
    InicioComponent,
    VeiculosComponent,
    ContatoComponent,
    VeiculosVisualizarComponent,
    HeaderComponent
  ],
  bootstrap: [SiteComponent],
  providers: [
    GraphqlService,
    VeiculosService
  ]
})
export class SiteModule { }
