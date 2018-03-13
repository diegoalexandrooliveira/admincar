import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuardService } from "./guard/auth.guard.service";
import { AppLayoutComponent } from "./layouts/app.layout.component";
import { LoginLayoutComponent } from "./layouts/login.layout.component";
import { UsuariosListaComponent } from "./usuarios/usuarios-lista.component";
import { UsuariosEditarComponent } from "./usuarios/usuarios-editar.component";

const appRoutes: Routes = [
  {
    path: "app",
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
      }
    ]
  },
  {
    path: "app",
    component: LoginLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      }
    ]
  },
  { path: "**", redirectTo: "app/dashboard" }
];

export const routing = RouterModule.forRoot(appRoutes);
