import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getAccessToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return next(authReq).pipe(
    catchError((err: any) => {
      console.log('Entro catch error');
      return authService.refreshToken().pipe(
        switchMap((res: any) => {
          console.log('llamamos a metodo refersh');
          authService.setAccessToken(res.jwt);
          authService.setRefreshToken(res.refreshToken);
          const newReq = req.clone({
            setHeaders: {
              Authorization: token ? `Bearer ${res.jwt}` : '',
            },
          });
          return next(newReq);
        }),
        catchError((refreshError) => {
          console.log('Entró en el error final');
          const finalError = new Error(refreshError);
          authService.deleteAllTokens();
          return throwError(() => finalError);
        })
      );
    })
  );
};
