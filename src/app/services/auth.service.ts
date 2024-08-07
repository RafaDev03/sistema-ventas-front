import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginInterface } from '../interfaces/login.interface';
import { Observable, tap } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(LoginForm: LoginInterface): Observable<any> {
    return this.http.post(`${base_url}/auth/login`, LoginForm).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.jwt);
        localStorage.setItem('refreshToken', resp.refreshToken);
      })
    );
  }

  refreshToken() {
    console.log('Llamando al metodo refresh token');
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${base_url}/auth/refresh`, { refreshToken });
  }

  getAccessToken() {
    return localStorage.getItem('token');
  }
  setAccessToken(accessToken: string) {
    return localStorage.setItem('token', accessToken);
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  setRefreshToken(refreshToken: string) {
    return localStorage.setItem('refreshToken', refreshToken);
  }
}
