import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NbLayoutDirection, NbLayoutDirectionService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from './global-shared/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'wakya-frontend';
  constructor(
    private router: Router,
    public token: TokenService,
    private translateService: TranslateService,
    private direction: NbLayoutDirectionService
  ) {}
  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((model: any) => {
      this.translateService.use(model.lang);
      this.token.setUserLanguage(model.lang);
    });
    const userLang = this.token.getUserLanguage();
    switch(userLang){
      case 'ar':{
        this.direction.setDirection(NbLayoutDirection.RTL);
        this.translateService.use('ar')
        break;
      }
      case 'en':{
        this.direction.setDirection(NbLayoutDirection.LTR);
        this.translateService.use('en')
        break;
      }
    }
  }
}
