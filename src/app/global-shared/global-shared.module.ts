import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import {ToastrModule} from 'ngx-toastr'


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ToastrModule

  ],
  exports:[
    HeaderComponent,
    ToastrModule
  ]
})
export class GlobalSharedModule { }
