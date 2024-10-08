import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';
import { URL_AUTH_LOGIN, URL_AUTH_REFRESH } from '../services/urls';
import { RefreshTokenManagerService } from '../services/refresh-token-manager.service';
import { Router } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';
import { DataService } from '../services/data.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (req.url === URL_AUTH_LOGIN) {
    return next(req);
  }

  if (req.url === URL_AUTH_REFRESH) {
    return next(req);
  }

  if (authService.isRefreshing) {
    return EMPTY;
  }

  const accessToken = authService.getAccessToken();
  const refreshToken = authService.getRefreshToken();
  if (accessToken === null || refreshToken === null) {
    router.navigateByUrl('/auth');
    return EMPTY;
  }

  const requestClone = authService.addTokenHeader(req);

  return next(requestClone);
};
