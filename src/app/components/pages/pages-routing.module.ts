import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canMatch: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/pages/dashboard',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/pages/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
