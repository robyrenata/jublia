import { Injectable } from '@angular/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { CacheService } from './cache.service';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Response } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiVersion = "v1/";

  constructor(
    private jwtHelper: JwtHelperService,
    private cache: CacheService,
    private gs: GlobalService,
    private api: ApiService,
  ) {
    this.checkToken()
  }

  checkToken() {
    this.cache.getToken().then(token => {
      if (token) {
        const decoded = this.jwtHelper.decodeToken(token);
        const isExpired = this.jwtHelper.isTokenExpired(token);

        // hide check condition expired token (temp)
        // if (!isExpired) {
          this.cache.setCurrentUser(decoded, token)
          this.gs.log("not expired")
        // }else{
        //   this.cache.removeToken()
        //   this.gs.log("expired")
        // }
      }
    })

  }

  login (credentials: any): Observable<Response> {
    // temporary token
    credentials.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyYWRtaW4iLCJ1c2VyX3R5cGUiOiJBZG1pbiIsInJvbGVfaWQiOjEsInJvbGUiOiJTdXBlcmFkbWluIiwidXNlcl9pZCI6MSwiaWF0IjoxNTYxMzUyNzk4LCJleHAiOjE1NjE0MzkxOTh9.giKYpbgmi2XNjA8vXI1rD1ZhzsrdfQFI3uBlwJqv-Ag'
    return this.api.postData(`${this.apiVersion}auth-user`, {result: credentials})
      .pipe(
        tap(res =>{
          const response = res.result
          const token = response.token
          const decoded = this.jwtHelper.decodeToken(token);
          this.cache.setCurrentUser(decoded, token)

          this.gs.log(`post login`)
        }),
      );
  }

  isAuthenticated() {
    return new Observable<boolean>(observer=>{
      this.cache.getToken().then(token => {
        if (token) {
          const decoded = this.jwtHelper.decodeToken(token)
          const isExpired = this.jwtHelper.isTokenExpired(token)

          // hide check condition expired token (temp)
          // if (!isExpired) {
            this.cache.setCurrentUser(decoded, token)
            observer.next(true)
          // }else{
          //   this.cache.removeCurrentUser()
          //   observer.next(false)
          // }

        }else{
          observer.next(false)
        }
      })
    });
  }

}
