import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToasterPosition } from '../global-shared/toaster.service';
import { TokenService } from '../global-shared/token.service';
/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private credentials: TokenService,
    private toastrService: ToastrService
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
          .set('authorization', `Bearer ${token}`)
          .set('Accept-Language', 'en')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Access-Control-Allow-Origin', '*').set('User_id','123')
      });
    } else {
      request = request.clone({
        headers: request.headers
          // .set('Accept-Language', 'en')
          .set('Access-Control-Allow-Origin', '*')
          .set('Content-Type', 'application/json ')
          .set('Accept', 'application/json'),
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('this is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
        } else if (error.status == 401) {
        } else if (error.status == 500) {
          this.toastrService.error('Error', 'Something went wrong', {
            positionClass: ToasterPosition.topRight,
            toastClass: 'oneLine',
            closeButton: true,
          });
        } else if (error.status === 0) {
          this.toastrService.error('Error', 'Something went wrong', {
            positionClass: ToasterPosition.topRight,
            toastClass: 'oneLine',
            closeButton: true,
          });
        } else {
          console.log('something went wrong');
        }
        return throwError(() => new Error('something went wrong'));
      })
    );

  }
}
