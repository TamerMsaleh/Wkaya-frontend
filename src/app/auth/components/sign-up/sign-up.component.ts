import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'wky-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
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
            next: (response) => {},
          })
        )
        .subscribe();
    }
  }
}
