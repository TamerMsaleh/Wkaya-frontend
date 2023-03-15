import { inject, NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LandingPageComponent } from './auth/components/landing-page/landing-page.component';
import { LoginGuard } from './auth/login.guard';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./components/pages/pages.module').then((m) => m.PagesModule),
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // canLoad: [() => inject(LoginGuard).canLoad()],
  },
  {
    path: 'landing',
    component: LandingPageComponent,
    canActivate: [() => inject(LoginGuard).canActivate()],

  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/pages/dashboard',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing',
  },

];
const config: ExtraOptions = {
  useHash: false,
};
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
