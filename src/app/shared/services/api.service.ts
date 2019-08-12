import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(path: string): Observable<any> {

    return this.http.get(
        `${environment.api_url}${path}`
      ).pipe(
        catchError( err => {
          return throwError(err);
        }),
        map((res: Response) => {
          return res;
        }),
        timeout(3000),
        retry(3)
      );
  }

  postData(path: string, model: object = {}, multipart = false): Observable<any> {
    const options =  {}
    let body = model
    if(multipart){
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', "multipart/form-data");
      Object.assign(options, {headers})

      body = this.prepareFormData(model)
    }

    return this.http.post(
      environment.api_url + path,
      body,
      options
    ).pipe(
      catchError( err => {
        return throwError(err);
      }),
      map((res: Response) => {
        return res;
      }),
      timeout(3000),
      retry(3)
    );
  }

  private prepareFormData(data) {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return formData;
  }

}
