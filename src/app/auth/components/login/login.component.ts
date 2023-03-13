import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthService, NbLoginComponent } from '@nebular/auth';
import { NbLayoutDirectionService } from '@nebular/theme';
import { tap } from 'rxjs';
import { ToasterPosition, ToasterService } from 'src/app/global-shared/toaster.service';
import { TokenService } from 'src/app/global-shared/token.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'bur-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent{
  loginForm: FormGroup;
  minlength = 6;
  maxlength = 12;
  constructor(
    service: NbAuthService,
    cd: ChangeDetectorRef,
    router: Router,
    private authService: AuthService,
    private directionService: NbLayoutDirectionService,
    private tokenService: TokenService,
    private toasterService: ToasterService,
    private fb: FormBuilder,
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
              console.log(resp)
              this.tokenService.setToken(resp.token);
              this.tokenService.setUserInfo(JSON.stringify(resp.profileCompleted));
              this.tokenService.setUserLanguage(
                this.directionService.getDirection() === 'ltr' ? 'en' : 'ar'
              );
              this.toasterService.makeToast(
                'success',
                'Login',
                'You have logged in successfully',
                {
                  positionClass: ToasterPosition.topRight,
                  toastClass: 'oneLine',
                  closeButton: true,
                }
              );
              if(resp.profileCompleted){
                this.router.navigate(['/pages/dashboard'])
              }else {
                this.router.navigate(['/profile'])

              }
            },
            error: (err: any) => {
              if (err.error.error.key == 'login.failed') {

              this.toasterService.makeToast(
                'error',
                'Login',
                'Please check your email or password',
                {
                  positionClass: ToasterPosition.topRight,
                  toastClass: 'oneLine',
                  closeButton: true,
                  timeOut: 100000
                }
              );
              }
            },
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
