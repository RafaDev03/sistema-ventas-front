import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginInterface } from '../interfaces/login.interface';
import {
  BehaviorSubject,
  catchError,
  delay,
  finalize,
  map,
  Observable,
  of,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { URL_AUTH_LOGIN, URL_AUTH_REFRESH } from './urls';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isRefreshing = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(LoginForm: LoginInterface) {
    return this.http.post(URL_AUTH_LOGIN, LoginForm).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.jwt);
        localStorage.setItem('refreshToken', resp.refreshToken);
      })
    );
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    console.log('Token de refresco obtenido:', refreshToken);

    return this.http.post(URL_AUTH_REFRESH, { refreshToken });
  }

  getAccessToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  deleteAllTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  addTokenHeader(request: HttpRequest<unknown>) {
    const accessToken = this.getAccessToken();

    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
    });
  }

  updateTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  get isRefreshing() {
    return this._isRefreshing;
  }

  set isRefreshing(value) {
    this._isRefreshing = value;
  }
  get isLoggedIn() {
    return this.getAccessToken() && this.getRefreshToken();
  }
}
