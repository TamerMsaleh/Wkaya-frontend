import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  canLoad() {
    return true;
  }
}
