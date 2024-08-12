import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {
  catchError,
  concatMap,
  EMPTY,
  finalize,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { DataService } from '../services/data.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const dataService = inject(DataService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        authService.isRefreshing = true;

        return authService.refreshToken().pipe(
          concatMap((res: any) => {
            authService.updateTokens(res.jwt, res.refreshToken);
            const requestClone = authService.addTokenHeader(req);
            return next(requestClone);
          }),

          finalize(() => {
            authService.isRefreshing = false;
          }),
          catchError((refreshError) => {
            console.error(refreshError);
            router.navigateByUrl('/');
            return EMPTY;
          })
        );
      }
      return throwError(() => error);
    })
  );
};
