import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  NbAuthModule,
  NbAuthService,
  NbTokenService,
  NbTokenStorage,
} from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbLayoutModule,
  NbSidebarModule,
  NbSidebarService,
  NbThemeModule,
} from '@nebular/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/assets/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './components/pages/pages.module';
import { GlobalSharedModule } from './global-shared/global-shared.module';
import { HttpService } from './global-shared/http.service';
import { Global } from './global-shared/models/global';
import { Settings } from './global-shared/models/settings';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbEvaIconsModule,
    NbAuthModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    GlobalSharedModule,
    AuthModule,
    PagesModule,
    RouterModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    NbSidebarService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    HttpService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    Global.Settings = environment.settings as Settings;
  }
}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
