import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginGuard } from './login.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'signup',
        component: SignUpComponent,
        canActivate: [() => inject(LoginGuard).canActivate()],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [() => inject(AuthGuard).canActivate()],

      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [() => inject(LoginGuard).canActivate()],

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
