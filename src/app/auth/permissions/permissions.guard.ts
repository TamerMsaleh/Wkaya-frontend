import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Router,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from 'src/app/global-shared/token.service';
import { PermissionsService } from './permissions.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuard {
  constructor(
    private router: Router,
    private permissionService: PermissionsService,
    private tokenService: TokenService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const hasPermission = this.permissionService.hasPermission(
      next.data.permission
    ) as Observable<boolean>;
    return hasPermission.pipe(
      tap((allowed) => {
        if (allowed) {
          return true;
        } else {
          this.tokenService.logout();
          // this.toaster.makeToast('danger', '401', 'Login has been expired');
          this.router.navigateByUrl('/auth/login');
          return false;
        }
      })
    );
  }
}
