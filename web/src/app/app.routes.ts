import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuardService } from "./guard/auth.guard.service";
import { AppLayoutComponent } from "./layouts/app.layout.component";
import { LoginLayoutComponent } from "./layouts/login.layout.component";

const appRoutes: Routes = [
  {
    path: "app",
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
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
