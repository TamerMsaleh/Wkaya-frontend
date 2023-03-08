import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule, NbAlertModule, NbButtonModule, NbCheckboxModule, NbContextMenuModule, NbIconModule, NbInputModule, NbLayoutModule,
  NbMenuModule,
  NbSearchModule, NbSelectModule, NbSidebarModule, NbThemeModule, NbUserModule
} from '@nebular/theme';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
  ],
  declarations: [
    // ... here goes our new components
    AuthComponent,
    LoginComponent,
  ],
})
export class AuthModule {}
