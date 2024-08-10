import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenManagerService {
  private _isRefreshing = false;

  get isRefreshing() {
    return this._isRefreshing;
  }

  set isRefreshing(value) {
    this._isRefreshing = value;
  }

  getAccessToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  constructor() {}
}
