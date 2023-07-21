import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authService.getToken();
    const isLoggedIn = this.authService.isAuthenticated();
   
    if (isLoggedIn && jwt != null) {
      req = req.clone({
        withCredentials: true,
        setHeaders: { Authorization: "Bearer "+JSON.parse(jwt) }
      });

    } else{
      req = req.clone({
        withCredentials: true,
      });
    }  
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];