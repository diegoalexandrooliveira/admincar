import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuardService } from "./auth.guard.service";
import { AppLayoutComponent } from "./layouts/app.layout.component";
import { LoginLayoutComponent } from "./layouts/login.layout.component";
import { UsuariosListaComponent } from "./usuarios/usuarios-lista.component";
import { UsuariosEditarComponent } from "./usuarios/usuarios-editar.component";
import { VeiculosListaComponent } from "./veiculos/veiculos-lista.component";
import { VeiculoEditarComponent } from "./veiculos/veiculo-editar.component";

export const aplicativoRotas: Routes = [
  {
    path: "login",
    component: LoginLayoutComponent,
    children: [
      {
        path: "**",
        component: LoginComponent
      }
    ]
  },
  {
    path: "",
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "usuarios",
        component: UsuariosListaComponent
      },
      {
        path: "usuarios/editar/:usuario",
        component: UsuariosEditarComponent
      },
      {
        path: "usuarios/adicionar",
        component: UsuariosEditarComponent
      },
      {
        path: "veiculos",
        component: VeiculosListaComponent
      },
      {
        path: "veiculos/adicionar",
        component: VeiculoEditarComponent
      },
      {
        path: "veiculos/editar/:id",
        component: VeiculoEditarComponent
      },
      { path: "**", component: DashboardComponent }
    ]
  }
];
