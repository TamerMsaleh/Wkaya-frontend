import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./components/pages/pages.module').then((m) => m.PagesModule),
    // canMatch: [() => inject(AuthGuard).canLoad()],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // canLoad: [() => inject(LoginGuard).canLoad()],
  },
];
const config: ExtraOptions = {
	useHash: false,
};
@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
