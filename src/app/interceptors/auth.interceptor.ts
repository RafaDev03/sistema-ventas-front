import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getAccessToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return next(authReq);
};
