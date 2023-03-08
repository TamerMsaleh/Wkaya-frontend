import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./components/pages/pages.module').then((m) => m.PagesModule),
    canMatch: [() => inject(AuthGuard).canLoad()],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canLoad: [() => inject(LoginGuard).canLoad()],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
