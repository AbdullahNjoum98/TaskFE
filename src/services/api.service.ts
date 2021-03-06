import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    get<T>(path:string, host:string) {
      path=host+path;
      return this.http.get<T>(path);
    }

    post<T>(path:string, host:string, object:any) {
      path=host+path;
      // const body=JSON.stringify(object);
      // return this.http.post<T>(path , body);
      const body = JSON.stringify(object);
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8;",
    });
    const options = {
      headers,
    };
    return this.http
      .post(path, body, options)
      .pipe(map((res: any) => res));
    }
    put<T>(path:string, host:string,object:any){
      path=host+path;
      // const body=JSON.stringify(object);
      // return this.http.put<T>(path , body);
      const body = JSON.stringify(object);
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8;",
    });
    const options = {
      headers,
    };
    return this.http
      .put(path, body, options)
      .pipe(map((res: any) => res));
    }
    delete<T>(path:string, host:string){
      path=host+path;
      const headers= new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8;",
      });
      const options={
        headers,
      };
      return this.http.delete(path,options).pipe(map((res:any)=>res));
    }
  }

