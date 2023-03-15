import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NbLayoutDirection, NbLayoutDirectionService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from './global-shared/menu/menu.service';
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
    private direction: NbLayoutDirectionService,
    private menu: MenuService
  ) {}
  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((model: any) => {
      this.translateService.use(model.lang);
      this.token.setUserLanguage(model.lang);
    });
  }
}
