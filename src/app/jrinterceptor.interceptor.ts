import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class JRInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (
      request.url.endsWith("carga-masiva")
    ) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('tokenJR')
        }
      });
    } else {
      if(request.url.endsWith("token")){

      } else {
        request = request.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('tokenJR'),
            'Content-Type': 'application/json'
          }
        });
      }
    }

    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
        }
      })
    );
  }
}
