import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule,
} from '@nebular/theme';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { GlobalSharedModule } from '../global-shared/global-shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbInputModule,
    AuthRoutingModule,
    NbActionsModule,
    NbLayoutModule,
    NbMenuModule,
    NbSearchModule,
    NbSidebarModule,
    NbUserModule,
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbThemeModule,
    NbCheckboxModule,
    CardModule,
    CalendarModule,
    RadioButtonModule,
    DropdownModule,
    StepsModule,
    GlobalSharedModule
  ],
  declarations: [
    // ... here goes our new components
    AuthComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    LandingPageComponent,
  ],
})
export class AuthModule {}
