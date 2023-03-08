import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbLoginComponent } from '@nebular/auth';
import { NbLayoutDirectionService } from '@nebular/theme';
import { tap } from 'rxjs';
import { TokenService } from 'src/app/global-shared/token.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'bur-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent {
  constructor(
    service: NbAuthService,
    cd: ChangeDetectorRef,
    router: Router,
    private authService: AuthService,
    private directionService: NbLayoutDirectionService,
    private tokenService: TokenService
  ) {
    super(service, {}, cd, router);
  }

  override login() {
    // console.log(this.user);
    // console.log(this.http.fullRequestURL('login'));
    this.authService
      .login(this.user)
      .pipe(
        tap({
          next: (resp: any) => {
            // console.log(resp.data);
            this.tokenService.setToken(resp.data.token);
            this.tokenService.setUserInfo(JSON.stringify(resp.data.user));
            // this.setUserPermissions(resp.data.user.id);
            this.setUserPerferences(resp.data.user.id);
            this.tokenService.setUserLanguage(
              this.directionService.getDirection() === 'ltr' ? 'en' : 'ar'
            );
          },
          error: (err: any) => {},
        })
      )
      .subscribe();
  }

  setUserPerferences(id) {
  }
  setUserPermissions(id) {
    // this.authService.getUserPermissions(id).subscribe(
    // 	(res: any) => {
    // 		this.permissionService.setPermissions(res.data);
    // 		this.router.navigateByUrl('/pages/monitoring');
    // 	},
    // 	(err) => {
    // 		this.toaster.makeToast('warning', 'Unauthorized', err.error.message);
    // 	}
    // );
  }
}
