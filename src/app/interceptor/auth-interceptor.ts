import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../service/loading.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const loadingService = inject(LoadingService);

  loadingService.show();

  const token = cookieService.get('auth_token');
  const requestToSend = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(requestToSend).pipe(
    finalize(() => loadingService.hide())
  );
};
