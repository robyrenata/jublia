import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable, throwError, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CacheService } from '@shared/services';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private cache: CacheService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.cache.getToken()).pipe(
            mergeMap(token => {
  
                if (token) {
                    request = request.clone({
                        setHeaders: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                }
  
                if (!request.headers.has('Content-Type')) {
                    request = request.clone({
                        setHeaders: {
                            'content-type': 'application/json'
                        }
                    });
                }else{
                    if(request.headers.get('Content-Type') === 'multipart/form-data'){
                        request = request.clone({ headers: request.headers.delete('Content-Type','multipart/form-data') });
                    }
                }
  
                request = request.clone({
                    headers: request.headers.set('Accept', 'application/json')
                });
  
                return next.handle(request);
  
            })
          );
  
      }
}
