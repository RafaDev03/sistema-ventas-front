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

  getAccessToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
}
