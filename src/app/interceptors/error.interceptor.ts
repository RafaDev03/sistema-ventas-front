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
  throwError,
} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        console.log('****INICIANDO REFRESH TOKEN****');
        authService.isRefreshing = true;

        return authService.refreshToken().pipe(
          concatMap((res: any) => {
            authService.updateTokens(res.jwt, res.refreshToken);
            console.log('****TOKEN ACTUALIZADO****');

            const requestClone = authService.addTokenHeader(req);
            return next(requestClone);
          }),
          finalize(() => {
            (authService.isRefreshing = false),
              console.log('****FINALIZANDO REFRESH TOKEN****');
          }),
          catchError((refreshError) => {
            console.log('*******ERROR EN EL REFRESH TOKEN********');
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
