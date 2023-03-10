import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
export class LoginComponent extends NbLoginComponent{
  loginForm: FormGroup;
  minlength = 8;
  maxlength = 16
  constructor(
    service: NbAuthService,
    cd: ChangeDetectorRef,
    router: Router,
    private authService: AuthService,
    private directionService: NbLayoutDirectionService,
    private tokenService: TokenService,
    private fb: FormBuilder
  ) {
    super(service, {}, cd, router);

    this.loginForm = this.fb.group({
      email: this.fb.control('',[Validators.email,Validators.required]),
      password: this.fb.control('',[Validators.required, Validators.minLength(this.minlength), Validators.maxLength(this.maxlength)])

    })
  }

   override login() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .pipe(
          tap({
            next: (resp: any) => {
              this.tokenService.setToken(resp.data.token);
              this.tokenService.setUserInfo(JSON.stringify(resp.data.user));
              this.setUserPerferences(resp.data.user.id);
              this.tokenService.setUserLanguage(
                this.directionService.getDirection() === 'ltr' ? 'en' : 'ar'
              );
            },
            error: (err: any) => {},
          })
        )
        .subscribe();
    }else {
      this.loginForm.errors;
      this.loginForm.dirty;
    }
  }

  setUserPerferences(id) {}
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
