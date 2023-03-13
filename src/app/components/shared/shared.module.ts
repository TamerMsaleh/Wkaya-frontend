import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { ToastrModule } from 'ngx-toastr';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { GlobalSharedModule } from 'src/app/global-shared/global-shared.module';
const NB_MODULES = [
  NbLayoutModule,
  NbInputModule,
  NbAlertModule,
  NbActionsModule,
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
];
const PRIME_MODULES = [
  DropdownModule,
  CalendarModule,
  CardModule,
  RadioButtonModule,
];
const CORE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ToastrModule,
  RouterModule
];

@NgModule({
  declarations: [],
  imports: [...CORE_MODULES, ...PRIME_MODULES, ...NB_MODULES],
  exports: [...CORE_MODULES, ...PRIME_MODULES, ...NB_MODULES],
})
export class SharedModule {}
