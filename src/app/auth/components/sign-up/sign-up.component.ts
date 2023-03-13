import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import {
  ToasterPosition,
  ToasterService,
} from 'src/app/global-shared/toaster.service';
import { AuthService } from '../../auth.service';
import {ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
@Component({
  selector: 'wky-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(ToasterService)private toasterService: ToasterService,
    private toastrService : ToastrService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }
  signup() {
    if (this.signUpForm.valid) {
      this.authService
        .signup(this.signUpForm.value)
        .pipe(
          tap({
            next: (response) => {
              this.toasterService.makeToast(
                'success',
                'Sign up',
                'Completed Successfully',
                {
                  positionClass: ToasterPosition.topRight,
                  toastClass: 'oneLine',
                  closeButton: true,
                }
              );
              this.router.navigate(['/login'])
            },
            error: (err) => {
              console.log(err)
              if (err.error.error.key == 'email.exists') {
                this.toastrService.error('Email is already exitst',"Duplicate",{
                  positionClass: ToasterPosition.topRight,
                  toastClass: 'oneLine',
                  closeButton: true,
                })
              }
            },
          })
        )
        .subscribe();
    }
  }
}
