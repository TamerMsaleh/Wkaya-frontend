import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LogoComponent } from './logo/logo.component';
import { MenuComponent } from './menu/menu.component';
import { SectionComponent } from './components/section/section.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    LandingHeaderComponent,
    LogoComponent,
    MenuComponent,
    SectionComponent
  ],
  imports: [CommonModule, ToastrModule, ButtonModule, RouterModule],
  exports: [
    HeaderComponent,
    LandingHeaderComponent,
    LogoComponent,
    MenuComponent,
    SectionComponent,
    ToastrModule,
  ],
})
export class GlobalSharedModule {}
