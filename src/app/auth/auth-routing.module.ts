import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'landing',
        component: LandingPageComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
        // canActivate: [LoginGuard]
      },
      {
        path:'',
        pathMatch:"full",
        redirectTo:"/landing"
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
