import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "app",
    loadChildren: "./aplicativo/aplicativo.module#AplicativoModule"
  },
  {
    path: "",
    loadChildren: "./site/site.module#SiteModule"
  }
];

export const routing = RouterModule.forRoot(appRoutes);
