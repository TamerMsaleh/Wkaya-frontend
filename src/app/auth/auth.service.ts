import { Injectable } from '@angular/core';
import { HttpService } from '../global-shared/http.service';
import { TokenService } from '../global-shared/token.service';

declare let CrossStorageClient: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService, private tokenService: TokenService) {}

  login(userInfo) {
    return this.http.post(userInfo, 'login');
  }

  signup(userInfo){
    return this.http.post(userInfo,'signUp');
  }

  profile(userProfile){
    return this.http.post(userProfile,'profile');
  }

  isAuthenticated() {
    return !!this.tokenService.getToken();
  }
  logOut() {
    this.tokenService.logout();
  }
}
