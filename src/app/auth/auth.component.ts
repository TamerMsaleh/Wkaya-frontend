import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../global-shared/token.service';
@Component({
	selector: 'bur-auth',
	template: '<router-outlet></router-outlet>',
})
export class AuthComponent {
	constructor(private router: Router, private tokenService: TokenService) {
		if (this.tokenService.getToken()) {
			this.router.navigateByUrl('/login');
		}
	}
}
