import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SiteComponent } from "./site.component";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { VeiculosComponent } from "./veiculos/veiculos.component";
import { VeiculosVisualizarComponent } from "./veiculos/visualizar/veiculos.visualizar.component";
import { InformacoesComponent } from "./informacoes/informacoes.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GraphqlService } from "./graphql.service";
import { VeiculosService } from "./veiculos.service";
import { HttpModule } from "@angular/http";
import "rxjs/add/operator/map";
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from "@angular/forms";
import { AgmCoreModule } from '@agm/core';
import {configs} from "../config/configs";

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
        path: "informacoes",
        component: InformacoesComponent
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
      apiKey: configs.apiMaps
    })],
  declarations: [
    SiteComponent,
    InicioComponent,
    VeiculosComponent,
    InformacoesComponent,
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
