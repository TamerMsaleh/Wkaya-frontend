import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
	providedIn: 'root',
})
export class AuthGuard  {
	constructor(private authService: AuthService) {}
	canLoad():
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
    return true;
	}
}
