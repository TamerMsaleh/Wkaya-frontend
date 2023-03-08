import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterPosition, ToasterService } from '@avl/shared/toaster.service';
import { TokenService } from '@avl/shared/token.service';
import { environment } from '@avl_env/environment';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
	providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private credentials: TokenService,
		private authService: AuthService,
		private router: Router,
		private toastrService: ToasterService
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token = this.credentials.getToken()
			? this.credentials.getToken()
			: '';

		if (
			token &&
			token.length &&
			request.url.search(environment.settings.apiHost) > -1
		) {
			request = request.clone({
				headers: request.headers
					.set('Authorization', `Bearer ${token}`)
					.set('Accept-Language', 'en')
					.set('Content-Type', 'application/json; charset=utf-8')
					.set('Accept', 'application/json')
					.set('Access-Control-Allow-Origin', '*'),
			});
		} else {
			request = request.clone({
				headers: request.headers
					// .set('Accept-Language', 'en')
					.set('Access-Control-Allow-Origin', '*')
					.set('Content-Type', 'application/json; charset=utf-8')
					.set('Accept', 'application/json'),
			});
		}
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				// let errorMsg = '';
				// if (error.error instanceof ErrorEvent) {
				//   console.log('this is client side error');
				//   errorMsg = `Error: ${error.error.message}`;
				// }
				// else {
				//   console.log('this is server side error');
				//   errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
				// }
				if (error.error instanceof ErrorEvent) {
					// console.log('this is client side error');
				} else if (error.status == 401) {
					this.authService.removeCrossToken();
				} else if (error.status == 500) {
					// this.router.navigate(['errors'], {
					// 	state: { status: 500 },
					// });
					this.toastrService.makeToast(
						'error',
						'Error',
						'Something went wrong',
						{
							positionClass: ToasterPosition.topRight,
							toastClass: 'oneLine',
							closeButton: true,
						}
					);
				} else if (error.status === 0) {
					// this.router.navigate(['errors'], {
					// 	state: { status: 'offline' },
					// });
					this.toastrService.makeToast(
						'error',
						'Error',
						'Something went wrong',
						{
							positionClass: ToasterPosition.topRight,
							toastClass: 'oneLine',
							closeButton: true,
						}
					);
				} else {
					// console.log('something went wrong');
				}
				return throwError(error);
			})
		);
	}

	// return next.handle(request);
}
