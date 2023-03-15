import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  /**
   *
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/pages/dashboard']);
      return false;
    }
    return true;
  }
}
