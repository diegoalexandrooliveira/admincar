import { RouterModule, Routes } from "@angular/router";
import { SiteModule } from "./site/site.module";
import { AplicativoModule } from "./aplicativo/aplicativo.module";

const appRoutes: Routes = [
  {
    path: "app",
    loadChildren: "./aplicativo/aplicativo.module#AplicativoModule"
  },
  {
    path: "",
    pathMatch: "full",
    loadChildren: "./site/site.module#SiteModule"
  },
  { path: "**", redirectTo: "/" }
];

export const routing = RouterModule.forRoot(appRoutes);
