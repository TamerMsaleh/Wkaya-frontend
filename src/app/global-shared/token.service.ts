import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
interface UserData {
  Email: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token: string;
  private accessToken = 'accessToken';
  private expiresIn = 'expiresIn';
  private user = 'user';
  private tokenInfo = 'tokentInfo'
  isUserAuth: boolean;
  constructor(private router: Router) {}

  /**
   * @param {string} token  The target to process
   * @returns Just save the token into cookies or session
   */
  setToken(token: string): void {
    // const tokenDecode: any = jwt_decode(token);
    localStorage.setItem(this.accessToken, token);
    // localStorage.setItem(this.tokenInfo, JSON.stringify(token));
  }

  /**
   * @param {string} user  The target to process
   * @returns Just save the user info into cookies or session
   */
  setUserInfo(user: any): void {
    localStorage.setItem(this.user, user);
  }

  setUserLanguage(lang: string) {
    localStorage.setItem('lang', lang);
  }

  getUserLanguage() {
    const lang = localStorage.getItem('lang');
    return lang;
  }

  /**
   * @returns the saved token
   */
  getUserInfo(): any {
    const user = localStorage.getItem(this.user);
    return user;
  }
  /**
   * @returns the saved token
   */
  getToken(): string {
    this.token = localStorage.getItem(this.accessToken);
    return this.token;
  }

  /**
   * @param {number} token  token expiration seconds
   */
  setTokenExpiration(tokenExpiration: number): void {
    localStorage.setItem(this.expiresIn, tokenExpiration.toString());
  }

  /**
   * @param {number} token  token expiration seconds
   * @returns if the token has been expired
   */
  checkIfTokenExpired(tokenExpiration: number): boolean {
    const today = new Date();
    const expiryDate = new Date(today.getTime() + tokenExpiration * 1000);
    if (today > expiryDate) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @returns clear all saved info
   */
  clear(): void {
    this.token = null;
    localStorage.removeItem(this.accessToken);
    localStorage.removeItem(this.expiresIn);
    localStorage.removeItem(this.user);
  }

  /**
   * @returns logout the user from the system
   */
  logout(): void {
    this.clear();
    this.router.navigateByUrl('/auth/login');
  }

  /**
   * @returns check the user is authenticated or not
   */
  isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    if (token != undefined || token != null) {
      this.isUserAuth = true;

      return true;
    } else {
      this.isUserAuth = false;

      return false;
    }
  }
}
