import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [PagesComponent],
  imports: [
   SharedModule
  ],
})
export class PagesModule {}
