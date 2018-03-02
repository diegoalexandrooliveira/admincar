import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const appRoutes: Routes = [
  { path: "app/login", component: LoginComponent },
  { path: "app/dashboard", component: DashboardComponent },
  { path: "**", redirectTo: "app/login" }
];

export const routing = RouterModule.forRoot(appRoutes);
