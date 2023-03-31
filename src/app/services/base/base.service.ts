import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../config/app-config';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfigService } from '../general/config.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class BaseService {
  headers: HttpHeaders;
  userSession: any;
  accessToken: string = localStorage.getItem("accessToken")?.toString()!;
  cookieValue: any;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    public _cookiesService: CookieService,
  ) {
    this.http = http;
    this.cookieValue = this._cookiesService.get('lang');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': '*/*',
      'Authorization': this.accessToken
    });
    this.headers = headers;
    this.configService.User.subscribe((user: any) => {
      this.user = user;
    })

  }
  user: any = JSON.parse(localStorage.getItem('user') || "0");

  addQueryParams(url: string): string {
    let data = {
      'sessionid': this.accessToken
    };
    let param = "";
    return url + param;
  }

  get<T>(url: string, request: any, contentType?: string): Observable<T> {
    this.headers = contentType ? new HttpHeaders({
      'Content-Type': 'text/plain; charset=utf-8',
      'Accept': 'text/html',
    }) :
      new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': '*/*',
        'Accept-Language': this.cookieValue,
        'Authorization': this.accessToken
      });
    let param = "";
    for (const key in request) {
      if (typeof request[key] === 'function') continue;
      if (typeof request[key] === 'undefined') continue;
      if (typeof request[key] === 'object') {
        let data = JSON.stringify(request[key]);
        if (data !== 'undefined') {
          if (param?.length == 0) {
            param += `?${key}=${encodeURI(JSON.stringify(request[key]))}`;
          } else {
            param += `&${key}=${encodeURI(JSON.stringify(request[key]))}`;
          }
        }
      } else {
        if (param.length == 0) {
          param += `?${key}=${encodeURI(request[key])}`;
        } else {
          param += `&${key}=${encodeURI(request[key])}`;
        }
      }
    }
    return this.http.get<T>(this.addQueryParams(AppSettings.BASE_URL + url + param), { headers: this.headers });
  }

  post<T>(url: string, request: any): Observable<T> {

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': '*/*',
      'Accept-Language': this.cookieValue,
      'Authorization': this.accessToken ?? ''
    });



    return this.http.post<T>(this.addQueryParams(AppSettings.BASE_URL + url), request, { headers: this.headers });

  }

  put<T>(url: string, request: any): Observable<T> {

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': '*/*',
      'Accept-Language': this.cookieValue,
      'Authorization': this.accessToken
    });
    let data = this.http.put<T>(this.addQueryParams(AppSettings.BASE_URL + url), request, { headers: this.headers });
    return data;
  }

  delete<T>(url: string, request: any): Observable<T> {

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': '*/*',
      'Accept-Language': this.cookieValue,
      'Authorization': this.accessToken
    });
    let data = this.http.delete<T>(this.addQueryParams(AppSettings.BASE_URL + url), { headers: this.headers });
    return data;
  }

}
