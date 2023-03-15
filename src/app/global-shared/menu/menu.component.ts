import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { NbLayoutDirection, NbLayoutDirectionService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { tap } from 'rxjs';
import { TokenService } from '../token.service';
import { MenuService } from './menu.service';

@Component({
  selector: 'wky-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  lang = false;
  /**
   *
   */
  constructor(
    private translate: TranslateService,
    private direction: NbLayoutDirectionService,
    private router: Router,
    public menu: MenuService,
    public token: TokenService
  ) {}
  ngOnInit(): void {
    const userLang = this.token.getUserLanguage();
    switch (userLang) {
      case 'ar': {
        this.direction.setDirection(NbLayoutDirection.RTL);
        this.translate.use('ar');
        this.lang = true;
        break;
      }
      case 'en': {
        this.direction.setDirection(NbLayoutDirection.LTR);
        this.translate.use('en');
        this.lang = false;
        break;
      }
    }
    this.items = [
      {
        label: 'Home Page',
        routerLink: '/auth/landing',
        visible: !window.location.href.includes('/landing'),
      },
      {
        label: 'Login',
        routerLink: '/auth/login',
      },
      {
        label: 'Register',
        routerLink: '/auth/register',
      },
    ];
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/landing')) {
          this.items = [
            {
              label: 'Login',
              routerLink: '/auth/login',
            },
            {
              label: 'Register',
              routerLink: '/auth/signup',
            },
          ];
        } else {
          this.items = [
            {
              label: 'Home Page',
              routerLink: '/auth/landing',
            },
            {
              label: 'Login',
              routerLink: '/auth/login',
            },
            {
              label: 'Register',
              routerLink: '/auth/signup',
            },
          ];
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }
  setLang() {
    if (this.lang) {
      this.direction.setDirection(NbLayoutDirection.RTL);
      this.translate.use('ar');
    } else {
      this.direction.setDirection(NbLayoutDirection.LTR);
      this.translate.use('en');
    }
  }
}
