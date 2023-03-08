import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/assets/environments/environment.prod';
import { HttpService } from '../global-shared/http.service';
import { TokenService } from '../global-shared/token.service';

declare let CrossStorageClient: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService, private tokenService: TokenService) {}

  login(userInfo) {
    return this.http.post(userInfo, 'auth/login');
  }

  isAuthenticated() {
    return !!this.tokenService.getToken();
  }
  logOut() {
    this.tokenService.logout();
  }
}
