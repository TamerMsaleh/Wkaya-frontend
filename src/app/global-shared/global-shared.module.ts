import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { HeaderComponent } from './components/header/header.component';
import { SectionComponent } from './components/section/section.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LogoComponent } from './logo/logo.component';
import { MenuComponent } from './menu/menu.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    HeaderComponent,
    LandingHeaderComponent,
    LogoComponent,
    MenuComponent,
    SectionComponent,
  ],
  imports: [
    CommonModule,
    ToastrModule,
    ButtonModule,
    RouterModule,
    TieredMenuModule,
    ToggleButtonModule,
    FormsModule,
    TranslateModule,
  ],
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
